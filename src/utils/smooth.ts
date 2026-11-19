import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

let smoother: ScrollSmoother | null = null;
let created = false;

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Creates the one GSAP ScrollSmoother for the page (idempotent).
 * Must run before any pinned ScrollTrigger is created. Under reduced motion the page
 * keeps the browser's native scrolling and no smoother is made.
 */
export function initSmooth(): ScrollSmoother | null {
  if (created) return smoother;
  created = true;

  const wrapper = document.getElementById('smooth-wrapper');
  const content = document.getElementById('smooth-content');
  if (!wrapper || !content || reducedMotion()) return null;

  smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1.35,
    effects: true,
    smoothTouch: false, // touch devices keep their native momentum scrolling
    normalizeScroll: false,
  });
  document.documentElement.classList.add('has-smoother');
  (window as any).__smoother = smoother;
  return smoother;
}

export const getSmoother = () => smoother;

/** Smoothly scrolls to an element or a pixel offset, with or without ScrollSmoother. */
export function scrollToTarget(target: Element | number, offset = 0) {
  if (smoother) {
    if (typeof target === 'number') smoother.scrollTo(target + offset, true);
    else smoother.scrollTo(target, true, `top ${Math.max(0, -offset)}px`);
    return;
  }
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(top + offset, { duration: 1.5 });
    return;
  }
  window.scrollTo({ top: top + offset, behavior: reducedMotion() ? 'auto' : 'smooth' });
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };
