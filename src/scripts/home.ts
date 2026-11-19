import { gsap, ScrollTrigger } from '../utils/smooth';

/* ==========================================================================
   Home page — reveals, in the style of the aluminium homepage.
   Elements opt in with data-hm="<section>-<part>" (see src/components/hm). Each reveal plays every time its section
   scrolls into view and winds back as it scrolls away. The stacking (the pinned hero receding while the next section
   slides over it) is initStack().
   Nothing here runs under prefers-reduced-motion; the page is fully visible without it.
   ========================================================================== */

const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, ctx: ParentNode = document) => Array.from(ctx.querySelectorAll<T>(sel));
const hm = (name: string, ctx: ParentNode = document) => $$(`[data-hm="${name}"]`, ctx);

const EASE_OUT = 'expo.out';
const EASE_SOFT = 'power3.out';

function reveal(trigger: HTMLElement | null, build: (tl: gsap.core.Timeline) => void, start = 'top 68%', end = 'bottom 12%') {
  if (!trigger) return;
  const tl = gsap.timeline({ paused: true, defaults: { ease: EASE_OUT } });
  build(tl);
  // in: play at normal speed; out: wind back quickly so the next pass starts from the hidden state
  ScrollTrigger.create({
    trigger,
    start,
    end,
    onEnter: () => tl.timeScale(1).play(),
    onLeave: () => tl.timeScale(2.6).reverse(),
    onEnterBack: () => tl.timeScale(1).play(),
    onLeaveBack: () => tl.timeScale(2.6).reverse(),
  });
}

/** The hero stays docked; as the next section slides over it, it recedes (scales back and dims). Desktop layout only. */
function initStack() {
  gsap.matchMedia().add('(min-width: 1024px) and (min-height: 760px)', () => {
    $$('[data-panel]').forEach((panel) => {
      const next = panel.nextElementSibling as HTMLElement | null;
      if (!next) return;
      gsap.fromTo(
        panel,
        { scale: 1, filter: 'brightness(1)' },
        {
          scale: 0.94,
          filter: 'brightness(0.82)',
          transformOrigin: '50% 0%',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
        }
      );
    });
  });
}

function init() {
  /* ---------------- start states, set before anything paints ---------------- */
  gsap.set(hm('hero-line'), { yPercent: 118 });
  gsap.set(hm('hero-fade'), { opacity: 0, y: 34 });
  gsap.set(hm('hero-proof'), { opacity: 0, y: 40 });
  gsap.set(hm('hero-bg'), { scale: 1.12 });
  gsap.set(hm('hero-arch'), { opacity: 0, scaleY: 0.82 });
  gsap.set(hm('hero-srk'), { opacity: 0, yPercent: 7, scale: 1.04 });
  gsap.set('.hh .pn-nav', { opacity: 0, y: -18 });

  gsap.set(hm('uq-line'), { yPercent: 118 });
  gsap.set(hm('uq-card'), { opacity: 0, y: 60, scale: 0.97 });
  gsap.set(hm('uq-bg'), { scale: 1.16 });

  gsap.set('.fr__stage', { opacity: 0, x: 70, scale: 0.96 });
  gsap.set('[data-reveal]', { opacity: 0, y: 30 });

  gsap.set(hm('hp-line'), { yPercent: 118 });
  gsap.set(hm('hp-fade'), { opacity: 0, y: 24 });
  gsap.set(hm('hp-factory'), { clipPath: 'inset(0% 0% 100% 0%)' });
  gsap.set("[data-hm='hp-factory'] img", { scale: 1.25, transformOrigin: '50% 60%' });

  gsap.set(hm('hw-n'), { opacity: 0, yPercent: 40 });
  gsap.set(hm('hw-dash'), { scaleX: 0, transformOrigin: '0% 50%' });
  gsap.set(hm('hw-unit'), { opacity: 0, xPercent: -10 });
  gsap.set(hm('hw-word'), { opacity: 0, letterSpacing: '1.1em' });
  gsap.set(hm('hw-copy'), { opacity: 0, y: 30 });

  gsap.set(hm('hl-line'), { yPercent: 118 });
  gsap.set(hm('hl-photo'), { opacity: 0, scale: 1.06, transformOrigin: '70% 40%' });
  gsap.set(hm('hl-fade'), { opacity: 0, y: 26 });
  gsap.set(hm('hl-rail'), { opacity: 0, y: 80 });

  gsap.set('.cta__copy > *', { opacity: 0, y: 30 });
  gsap.set('.cta-card', { opacity: 0, y: 60 });

  // now let the CSS stop hiding things; gsap owns the opacity from here
  root.classList.add('hm-ready');

  /* ---------------- hero: plays on load, and again whenever you scroll back up to it ---------------- */
  const heroEl = $$('.hh')[0];
  // wait for the webfont so the masked lines measure correctly
  (document.fonts?.ready ?? Promise.resolve()).then(() =>
    requestAnimationFrame(() => {
      reveal(
        heroEl,
        (tl) => {
          tl.to(hm('hero-bg'), { scale: 1, duration: 3, ease: 'power3.out' }, 0)
            .to('.hh .pn-nav', { opacity: 1, y: 0, duration: 1.4 }, 0.3)
            .to(hm('hero-arch'), { opacity: 1, scaleY: 1, duration: 1.8, ease: 'expo.out' }, 0.2)
            .to(hm('hero-srk'), { opacity: 1, yPercent: 0, scale: 1, duration: 2.2, ease: EASE_SOFT }, 0.5)
            .to(hm('hero-line'), { yPercent: 0, duration: 1.6, stagger: 0.14 }, 0.45)
            .to(hm('hero-fade'), { opacity: 1, y: 0, duration: 1.3, stagger: 0.14, ease: EASE_SOFT }, 0.9)
            .to(hm('hero-proof'), { opacity: 1, y: 0, duration: 1.4, ease: EASE_SOFT }, 1.4);
        },
        'top 60%',
        'bottom 8%'
      );
    })
  );

  /* ---------------- let life in ---------------- */
  reveal($$('.hc')[0], (tl) => {
    tl.to(hm('uq-bg'), { scale: 1, duration: 2.6, ease: 'power3.out' }, 0)
      .to(hm('uq-line'), { yPercent: 0, duration: 1.5, stagger: 0.13 }, 0.1)
      .to(hm('uq-card'), { opacity: 1, y: 0, scale: 1, duration: 1.4, stagger: 0.14, ease: EASE_SOFT }, 0.3);
  });

  /* ---------------- frames: the stage glides in; panel copy uses [data-reveal] ---------------- */
  reveal($$('.fr')[0], (tl) => {
    tl.to('.fr__stage', { opacity: 1, x: 0, scale: 1, duration: 1.8, ease: EASE_SOFT }, 0.2)
      .to('[data-reveal]', { opacity: 1, y: 0, duration: 1.2, stagger: 0.09, ease: EASE_SOFT }, 0);
  }, 'top 62%');

  /* ---------------- statement + factory ---------------- */
  reveal($$('.hp')[0], (tl) => {
    tl.to(hm('hp-line'), { yPercent: 0, duration: 1.5, stagger: 0.12 }, 0.1)
      .to(hm('hp-fade'), { opacity: 1, y: 0, duration: 1.2, ease: EASE_SOFT }, 0.7)
      .to(hm('hp-factory'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' }, 0.5)
      .to("[data-hm='hp-factory'] img", { scale: 1, duration: 2.8, ease: 'power3.out' }, 0.5);
  });

  /* ---------------- 20-year warranty ---------------- */
  reveal(
    $$('.hw')[0],
    (tl) => {
      tl.to(hm('hw-n'), { opacity: 1, yPercent: 0, duration: 1.7 }, 0.1)
        .to(hm('hw-dash'), { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.65)
        .to(hm('hw-unit'), { opacity: 1, xPercent: 0, duration: 1.7 }, 0.35)
        .to(hm('hw-word'), { opacity: 1, letterSpacing: '0.62em', duration: 2.2, ease: 'power3.out' }, 0.6)
        .to(hm('hw-copy'), { opacity: 1, y: 0, duration: 1.3, stagger: 0.14, ease: EASE_SOFT }, 0.75);
    },
    'top 62%'
  );

  /* ---------------- tested to the limit ---------------- */
  reveal($$('.hl')[0], (tl) => {
    tl.to(hm('hl-photo'), { opacity: 0.92, scale: 1, duration: 2.4, ease: 'power3.out' }, 0)
      .to(hm('hl-line'), { yPercent: 0, duration: 1.6, stagger: 0.16 }, 0.1)
      .to(hm('hl-fade'), { opacity: 1, y: 0, duration: 1.2, ease: EASE_SOFT }, 0.7)
      .to(hm('hl-rail'), { opacity: 1, y: 0, duration: 1.7, ease: EASE_SOFT }, 0.7);
  });

  /* ---------------- contact ---------------- */
  reveal(
    $$('.cta')[0],
    (tl) => {
      tl.to('.cta__copy > *', { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: EASE_SOFT }, 0)
        .to('.cta-card', { opacity: 1, y: 0, duration: 1.5, ease: EASE_SOFT }, 0.25);
    },
    'top 72%'
  );

  initStack();

  // the layout is fluid, but fonts and images can nudge things: re-measure once everything has loaded
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}

if (reduce) {
  root.classList.add('hm-ready');
} else {
  init();
  // failsafe: never leave anything hidden if something above throws
  setTimeout(() => root.classList.add('hm-ready'), 3500);
}
