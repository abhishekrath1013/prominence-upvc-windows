let started = false;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Sitewide motion: Lenis smooth scroll, scroll-progress bar, reveal-on-scroll
 * (`.reveal`, `.img-reveal`, optional `data-stagger` parents), count-up numbers,
 * parallax (`data-parallax="0.12"`), SVG line-draw (`data-draw`) and card tilt
 * (`data-tilt`). Everything degrades to the static layout under reduced motion.
 */
export function initMotion() {
  if (started) return;
  started = true;

  if (!reduced()) initLenis();

  initStagger();
  initRevealObserver();
  initCountUp();
  initScrollEffects();
  initDraw();
  initTilt();
  initAnchors();
}

async function initLenis() {
  const { default: Lenis } = await import('lenis');
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  (window as any).__lenis = lenis;
  document.documentElement.classList.add('lenis');

  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/** Smooth in-page anchors (works with or without Lenis). */
function initAnchors() {
  document.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === '#') return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
    history.replaceState(null, '', url.hash);
  });
}

export function scrollToEl(el: HTMLElement, offset = -84) {
  const lenis = (window as any).__lenis;
  if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
  else el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
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
        // Drop the delay once finished so hover transitions stay snappy.
        if (delay) setTimeout(() => (target.style.transitionDelay = ''), 1400 + Number(delay));
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

  const animate = (el: HTMLElement) => {
    const to = parseFloat(el.dataset.countTo ?? '0');
    const suffix = el.dataset.countSuffix ?? '';
    const decimals = el.dataset.countDecimals ? parseInt(el.dataset.countDecimals) : 0;
    const fmt = (v: number) =>
      (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')) + suffix;

    if (reduced()) {
      el.textContent = fmt(to);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = fmt(to * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          animate(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => observer.observe(el));
}

/** Scroll progress bar + parallax layers, driven by one rAF-throttled scroll listener. */
function initScrollEffects() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const visible = new Set<HTMLElement>();
  const doParallax = !reduced() && layers.length > 0;

  if (doParallax) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          e.isIntersecting ? visible.add(el) : visible.delete(el);
        }),
      { rootMargin: '20% 0px 20% 0px' }
    );
    layers.forEach((l) => io.observe(l));
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`;

    if (doParallax) {
      const vh = window.innerHeight;
      visible.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const rect = el.parentElement!.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      });
    }
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/** SVG paths with [data-draw] animate their stroke when scrolled into view. */
function initDraw() {
  const paths = document.querySelectorAll<SVGGeometryElement>('[data-draw]');
  if (!paths.length) return;
  paths.forEach((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = reduced() ? '0' : `${len}`;
  });
  if (reduced()) return;
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

/** Gentle 3D tilt that follows the pointer (fine pointers only). */
function initTilt() {
  if (reduced() || !window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = parseFloat(el.dataset.tilt || '6');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
    });
    el.addEventListener('pointerleave', () => (el.style.transform = ''));
  });
}
