import { gsap, ScrollTrigger, initSmooth, scrollToTarget, reducedMotion } from './smooth';

let started = false;

/**
 * Sitewide motion: GSAP ScrollSmoother, a header that tucks away on the way down,
 * reveal-on-scroll (`.reveal`, `.img-reveal`, optional `data-stagger` parents),
 * count-up numbers (`data-count-to`), SVG line-draw (`data-draw`),
 * sticky columns (`data-pin`) and the footer curtain (`data-footer-reveal`).
 * Everything degrades to the static layout under reduced motion.
 */
export function initMotion() {
  if (started) return;
  started = true;

  initSmooth();

  initStagger();
  initRevealObserver();
  initCountUp();
  initProgress();
  initDraw();
  initAnchors();
  initHeader();
  initPins();
  initFooterReveal();
}

/** Smooth in-page anchors (works with or without ScrollSmoother). */
function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target, a.hasAttribute('data-flush') ? 0 : -84);
    history.replaceState(null, '', url.hash);
  });
}

export function scrollToEl(el: HTMLElement, offset = -84) {
  scrollToTarget(el, offset);
}

/** Children of [data-stagger] get cascading reveal delays. */
function initStagger() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((parent) => {
    const step = parseInt(parent.dataset.stagger || '80', 10);
    parent.querySelectorAll<HTMLElement>(':scope > .reveal').forEach((child, i) => {
      if (!child.dataset.revealDelay) child.dataset.revealDelay = String(i * step);
    });
  });
}

function initRevealObserver() {
  const els = document.querySelectorAll<HTMLElement>('.reveal, .img-reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        const delay = target.dataset.revealDelay;
        if (delay) target.style.transitionDelay = `${delay}ms`;
        target.classList.add('is-visible');
        if (delay) setTimeout(() => (target.style.transitionDelay = ''), 1600 + Number(delay));
        observer.unobserve(target);
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((el) => observer.observe(el));
}

function initCountUp() {
  const els = document.querySelectorAll<HTMLElement>('[data-count-to]');
  if (!els.length) return;

  els.forEach((el) => {
    const to = parseFloat(el.dataset.countTo ?? '0');
    const suffix = el.dataset.countSuffix ?? '';
    const decimals = el.dataset.countDecimals ? parseInt(el.dataset.countDecimals) : 0;
    const fmt = (v: number) => (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')) + suffix;

    if (reducedMotion()) {
      el.textContent = fmt(to);
      return;
    }
    const state = { v: 0 };
    el.textContent = fmt(0);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: to,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => (el.textContent = fmt(state.v)),
          onComplete: () => (el.textContent = fmt(to)),
        }),
    });
  });
}

/** Hairline progress bar along the very top of the viewport. */
function initProgress() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => (bar.style.transform = `scaleX(${self.progress.toFixed(4)})`),
  });
}

/** SVG paths with [data-draw] animate their stroke when scrolled into view. */
function initDraw() {
  const paths = document.querySelectorAll<SVGGeometryElement>('[data-draw]');
  if (!paths.length) return;
  paths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = reducedMotion() ? '0' : `${len}`;
  });
  if (reducedMotion()) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const p = e.target as SVGGeometryElement;
        p.style.transition = `stroke-dashoffset ${p.dataset.draw || '2200'}ms cubic-bezier(0.22,1,0.36,1)`;
        p.style.strokeDashoffset = '0';
        io.unobserve(p);
      }),
    { threshold: 0.4 }
  );
  paths.forEach((p) => io.observe(p));
}

/** Header: tucks away while reading downwards, returns on the way back up, frosts once scrolled. */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const y = self.scroll();
      header.classList.toggle('is-scrolled', y > 40);
      const open = document.querySelector('[data-menu].open');
      const hide = self.direction === 1 && y > 420 && !open;
      if (self.direction === -1 || y < 420) header.classList.remove('is-hidden');
      else if (hide) header.classList.add('is-hidden');
    },
  });
}

/**
 * `position: sticky` cannot work inside ScrollSmoother's transformed content, so sticky
 * columns use `data-pin` instead: pinned from `data-pin-top` px until their parent ends.
 */
function initPins() {
  document.querySelectorAll<HTMLElement>('[data-pin]').forEach((el) => {
    const top = parseInt(el.dataset.pinTop || '112', 10);
    const mq = el.dataset.pinMin ? `(min-width: ${el.dataset.pinMin}px)` : '(min-width: 1024px)';
    gsap.matchMedia().add(mq, () => {
      ScrollTrigger.create({
        trigger: el,
        start: `top top+=${top}`,
        endTrigger: el.parentElement!,
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
      });
    });
  });
}

/** The footer is drawn up from beneath the last section, like a curtain being raised. */
function initFooterReveal() {
  const footer = document.querySelector<HTMLElement>('[data-footer-reveal]');
  if (!footer || reducedMotion()) return;
  gsap.matchMedia().add('(min-width: 900px)', () => {
    gsap.fromTo(
      footer.firstElementChild,
      { yPercent: -22 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: footer, start: 'top bottom', end: 'top 25%', scrub: true },
      }
    );
  });
}
