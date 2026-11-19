import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../utils/smooth';

/**
 * Smooth scrolling for the whole site — Lenis, the same engine the Prominance aluminium site uses.
 * Idempotent. Skipped under prefers-reduced-motion (the page keeps the browser's native scroll).
 * Exposes the instance as window.__lenis so menus and anchors can pause or drive it.
 */
let lenis: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (lenis) return lenis;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  lenis = new Lenis({
    duration: 1.25,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  (window as any).__lenis = lenis;
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis!.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
