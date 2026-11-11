import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));
const mobile = () => window.innerWidth <= 820;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function getLenis(): Promise<any | null> {
  for (let i = 0; i < 60; i++) {
    if ((window as any).__lenis) return (window as any).__lenis;
    await new Promise((r) => setTimeout(r, 50));
  }
  return null;
}

/** Raises a mist element from below the stage until it fully covers it. */
function mistRise(stage: HTMLElement) {
  return { y: () => -stage.offsetHeight * 1.9, ease: 'none' as const };
}

/* ───────────────────────── 1 · intro ───────────────────────── */
function intro() {
  const root = $('#intro');
  const mist = $('[data-mist="intro"]');

  if (!reduced) {
    gsap.from('[data-intro-title] .line > span', { yPercent: 115, duration: 1.4, ease: 'power4.out', stagger: 0.12, delay: 0.15 });
    gsap.from('[data-intro-fade]', { opacity: 0, y: 14, duration: 1.1, ease: 'power3.out', delay: 0.75, stagger: 0.12 });
    gsap.from('[data-intro-img] img', { scale: 1.16, duration: 2.4, ease: 'power3.out' });
  }

  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: '+=115%', pin: true, scrub: true, invalidateOnRefresh: true },
      defaults: { ease: 'none' },
    })
    .to('[data-intro-img]', { scale: 1.1, duration: 1 }, 0)
    .to('[data-intro-content]', { opacity: 0, y: -50, duration: 0.55 }, 0.1)
    .to(mist, { ...mistRise(root), duration: 1 }, 0);
}

/* ───────────────────────── 2 · story ───────────────────────── */
function story(lenis: any) {
  const root = $('#story');
  const morph = $('[data-morph]');
  const ui = $('[data-morph-ui]');
  const slides = $$('[data-slide]');
  const tilts = $$('[data-tilt]');
  const pops = $$('[data-pop]');
  const title = $('[data-story-title]');
  const slot = $('[data-slot]');
  const words = $$('.about__text .w > span');
  const fades = $$('[data-about-fade]');
  const rule = $('[data-about-rule]');

  // where the zoomed image finally lands: the inline thumbnail in the headline
  const slotRect = () => {
    const s = slot.getBoundingClientRect();
    const r = root.getBoundingClientRect();
    return { left: s.left - r.left, top: s.top - r.top, w: s.width, h: s.height };
  };

  gsap.set(words, { yPercent: 115 });
  gsap.set(fades, { opacity: 0 });
  gsap.set(rule, { scaleX: 0 });
  gsap.set(slides, { xPercent: (i: number) => (i === 0 ? 0 : 100) });

  // frames pop into place when the scene arrives
  gsap.set(pops, { scale: 0, opacity: 0 });
  gsap.set(title, { opacity: 0, y: 24 });
  // One short pinned moment (~2.5 screens): the frames fall away, the current slide
  // zooms open, then settles into the About headline.
  const tl = gsap.timeline({
    scrollTrigger: { trigger: root, start: 'top top', end: '+=260%', pin: true, scrub: 1, invalidateOnRefresh: true },
    defaults: { ease: 'none' },
  });

  // pop-in runs once, and never fights the scroll timeline if the visitor lands past the gallery
  let popped = false;
  const pop = () => {
    if (popped) return;
    popped = true;
    if (tl.scrollTrigger!.progress < 0.05) gsap.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
    gsap.to(pops, { scale: 1, opacity: 1, duration: 0.95, ease: 'back.out(1.8)', stagger: { each: 0.13, from: 'random' }, delay: 0.1 });
  };
  const popTrigger = ScrollTrigger.create({ trigger: root, start: 'top 80%', onEnter: pop });
  if (popTrigger.progress > 0 || popTrigger.isActive) pop();

  // 1 · the scattered frames leave, the current slide zooms open to nearly full-bleed
  const exits: Array<[number, number]> = [[-46, -4], [0, -40], [46, -6], [-36, 8], [4, 38], [44, 14]];
  tl.to({}, { duration: 0.15 }, 0);
  tilts.forEach((t, i) =>
    tl.to(t, { x: () => window.innerWidth * (exits[i][0] / 100), y: () => window.innerHeight * (exits[i][1] / 100), opacity: 0, scale: 0.92, duration: 0.9, ease: 'power2.in' }, 0.15),
  );
  tl.fromTo(title, { opacity: 1, y: 0 }, { opacity: 0, y: -30, duration: 0.6, immediateRender: false }, 0.15);
  tl.to(
    morph,
    {
      left: () => (mobile() ? window.innerWidth * 0.04 : window.innerWidth * 0.07),
      top: () => (mobile() ? window.innerHeight * 0.11 : window.innerHeight * 0.07),
      width: () => (mobile() ? window.innerWidth * 0.92 : window.innerWidth * 0.86),
      height: () => (mobile() ? window.innerHeight * 0.78 : window.innerHeight * 0.86),
      borderRadius: 24,
      duration: 1.4,
      ease: 'power2.inOut',
    },
    0.3,
  );
  tl.to(slides, { scale: 1.06, duration: 1.4 }, 0.3);
  tl.to(slides, { scale: 1, duration: 1.1 }, 2.0);

  // 2 · it settles into the headline as the inline thumbnail while the words rise in
  tl.to(ui, { opacity: 0, duration: 0.3 }, 1.7);
  tl.to(
    morph,
    {
      left: () => slotRect().left,
      top: () => slotRect().top,
      width: () => slotRect().w,
      height: () => slotRect().h,
      borderRadius: 8,
      duration: 1.1,
      ease: 'power2.inOut',
    },
    2.0,
  );
  tl.to(fades[0], { opacity: 1, duration: 0.4 }, 2.4);
  tl.to(words, { yPercent: 0, duration: 0.8, stagger: 0.04, ease: 'power3.out' }, 2.45);
  tl.to(rule, { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 3.1);
  tl.to(fades[1], { opacity: 1, duration: 0.5 }, 3.3);
  tl.to({}, { duration: 0.5 }, 3.8);

  // ── carousel: slides slide sideways inside the frame, every 3 seconds ──
  let cur = 0;
  let busy = false;
  const goTo = (n: number, dir = 1) => {
    n = (n + slides.length) % slides.length;
    if (n === cur || busy) return;
    busy = true;
    const from = slides[cur];
    const to = slides[n];
    gsap.set(to, { xPercent: 100 * dir });
    gsap.to(from, { xPercent: -100 * dir, duration: 1.15, ease: 'power3.inOut' });
    gsap.to(to, { xPercent: 0, duration: 1.15, ease: 'power3.inOut', onComplete: () => (busy = false) });
    const im = $('img', to);
    gsap.fromTo(im, { scale: 1.18 }, { scale: 1, duration: 1.9, ease: 'power3.out' });
    cur = n;
  };

  let visible = false;
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.3 }).observe(root);
  let timer = window.setInterval(tick, 3000);
  function tick() {
    // only auto-play while the gallery is on screen and hasn't started zooming
    if (visible && !document.hidden && tl.scrollTrigger!.progress < 0.04) goTo(cur + 1);
  }
  const restart = () => {
    window.clearInterval(timer);
    timer = window.setInterval(tick, 3000);
  };
  $('[data-next]').addEventListener('click', () => { goTo(cur + 1, 1); restart(); });
  $('[data-prev]').addEventListener('click', () => { goTo(cur - 1, -1); restart(); });
}

/* ───────────────────────── 3 · marquee ───────────────────────── */
function marquee() {
  const root = $('#marquee');
  const wrap = $('[data-mq-wrap]');
  const track = $('[data-mq-track]');
  const box = $('[data-mq-box]');
  const hint = $('.mq__hint');
  gsap.set(track, { yPercent: -52 });
  gsap.set(box, { xPercent: -50, yPercent: -50 });

  // the word loops endlessly towards the left (track holds two identical halves)
  if (!reduced) gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });

  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: '+=230%', pin: true, scrub: 1, invalidateOnRefresh: true },
      defaults: { ease: 'none' },
    })
    .to(hint, { opacity: 0, duration: 0.4 }, 0.2)
    .to(box, { width: () => window.innerWidth * (mobile() ? 0.5 : 0.28), height: () => window.innerHeight * (mobile() ? 0.3 : 0.44), duration: 0.8 }, 0.3)
    .to(box, { width: () => window.innerWidth * (mobile() ? 0.94 : 0.83), height: () => window.innerHeight * (mobile() ? 0.8 : 0.86), borderRadius: 4, duration: 1.8, ease: 'power2.inOut' }, 1.1)
    .to(wrap, { opacity: 0.25, duration: 1.2 }, 1.6)
    // the photo stays; a short hold, then the page simply moves on
    .to({}, { duration: 0.6 }, 2.9);
}

/* ───────────────────────── 4 · structure ───────────────────────── */
function structure() {
  const root = $('#structure');
  const mist = $('[data-mist="structure"]');
  gsap.set(['[data-st-b-img]', '[data-st-b]'], { yPercent: 101 });

  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: '+=420%', pin: true, scrub: 1, invalidateOnRefresh: true },
      defaults: { ease: 'none' },
    })
    .to('[data-st-b-img]', { yPercent: 0, duration: 1.3, ease: 'power2.inOut' }, 0.9)
    .to('[data-st-b]', { yPercent: 0, duration: 1.3, ease: 'power2.inOut' }, 1.05)
    .to({}, { duration: 1.2 }, 2.35)
    .to(mist, { ...mistRise(root), duration: 1.7 }, 3.5)
    .to({}, { duration: 0.1 }, 5.2);
}

/* ───────────────────────── 5 · statement ───────────────────────── */
function statement() {
  const root = $('#statement');
  const box = $('[data-sm-box]');
  const intro = $('[data-sm-intro]');
  const words = $$('[data-sm-h] .w > span');
  const shade = $('[data-sm-shade]');
  const over = $('[data-sm-over]');
  gsap.set(box, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.88 });
  gsap.set(over, { y: 40 });

  gsap.from(words, {
    yPercent: 115, duration: 1.1, ease: 'power3.out', stagger: 0.07,
    scrollTrigger: { trigger: root, start: 'top 70%', toggleActions: 'play none none reverse' },
  });

  gsap
    .timeline({
      scrollTrigger: { trigger: root, start: 'top top', end: '+=460%', pin: true, scrub: 1, invalidateOnRefresh: true },
      defaults: { ease: 'none' },
    })
    .to({}, { duration: 0.8 }, 0)
    .to(intro, { opacity: 0, y: -30, scale: 0.97, duration: 0.8 }, 0.9)
    .to(box, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 1.0)
    .to(box, { width: () => window.innerWidth, height: () => root.clientHeight, borderRadius: 0, duration: 2, ease: 'power2.inOut' }, 2.0)
    .to(shade, { opacity: 1, duration: 0.8 }, 3.4)
    .to(over, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 3.6)
    .to({}, { duration: 1.2 }, 4.5);
}

/* ───────────────────────── 6 · inside ───────────────────────── */
/** Splits an element's text into masked lines for a line-by-line reveal. */
function splitLines(el: HTMLElement) {
  const words = (el.textContent || '').trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="sw" style="display:inline-block">${w}</span>`).join(' ');
  const spans = Array.from(el.querySelectorAll<HTMLElement>('.sw'));
  const lines: string[][] = [];
  let top = -9999;
  spans.forEach((s) => {
    if (Math.abs(s.offsetTop - top) > 4) { lines.push([]); top = s.offsetTop; }
    lines[lines.length - 1].push(s.textContent || '');
  });
  el.innerHTML = lines.map((l) => `<span class="ln"><span>${l.join(' ')}</span></span>`).join('');
}

function inside(lenis: any) {
  const root = $('#inside');
  const cards = $$('[data-in-card]');
  const copies = $$('[data-in-copy]');
  const num = $('[data-in-num]');
  const lineEls = (c: HTMLElement) => $$('.ln > span', c);
  const singles = (c: HTMLElement) => $$('[data-ln]', c).filter((e) => e.tagName !== 'H3' && e.tagName !== 'P');

  copies.forEach((c) => $$('h3, p', c).forEach(splitLines));
  gsap.set(copies, { opacity: 1, pointerEvents: 'none' });
  copies.forEach((c) => {
    gsap.set(lineEls(c), { yPercent: 115 });
    gsap.set(singles(c), { opacity: 0 });
  });

  type R = { l: number; t: number; w: number; h: number; r: number; o: number };
  const V = (n: number) => (window.innerWidth * n) / 100;
  const H = (n: number) => (window.innerHeight * n) / 100;
  const rects = (): Record<'main' | 'prev' | 'next', R> =>
    mobile()
      ? {
          main: { l: V(4), t: H(10), w: V(92), h: H(52), r: 20, o: 1 },
          prev: { l: V(-30), t: H(20), w: V(20), h: H(14), r: 14, o: 0 },
          next: { l: V(110), t: H(40), w: V(20), h: H(14), r: 14, o: 0 },
        }
      : {
          main: { l: V(27), t: H(3), w: V(45), h: H(94), r: 24, o: 1 },
          prev: { l: V(16.6), t: H(3.3), w: V(8.6), h: H(18), r: 18, o: 1 },
          next: { l: V(74), t: H(78.4), w: V(8.6), h: H(18.6), r: 18, o: 1 },
        };

  let idx = -1;
  const layout = (instant = false) => {
    const R = rects();
    cards.forEach((c, k) => {
      const d = k - idx;
      const base = d === 0 ? R.main : d < 0 ? R.prev : R.next;
      const visible = d === 0 || Math.abs(d) === 1;
      gsap.to(c, {
        left: base.l, top: base.t, width: base.w, height: base.h, borderRadius: base.r,
        opacity: visible ? base.o : 0, duration: instant ? 0 : 1.25, ease: 'power3.inOut', overwrite: true,
      });
      gsap.set(c, { zIndex: d === 0 ? 3 : 2 });
      c.classList.toggle('is-link', Math.abs(d) === 1 && !mobile());
      const im = c.querySelector('img');
      if (im && !instant && d === 0) gsap.fromTo(im, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: 'power3.out' });
    });
  };

  const showCopy = (i: number) => {
    const c = copies[i];
    c.style.pointerEvents = 'auto';
    gsap.fromTo(lineEls(c), { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.12, delay: 0.45, overwrite: true });
    gsap.fromTo(singles(c), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: 0.4, overwrite: true });
  };
  const hideCopy = (i: number, dir: number) => {
    const c = copies[i];
    c.style.pointerEvents = 'none';
    gsap.to(lineEls(c), { yPercent: -115 * dir, duration: 0.55, ease: 'power2.in', stagger: 0.05, overwrite: true });
    gsap.to(singles(c), { opacity: 0, y: -10 * dir, duration: 0.4, overwrite: true });
  };

  const set = (i: number, instant = false) => {
    if (i === idx) return;
    const old = idx;
    idx = i;
    layout(instant);
    num.textContent = `0${i + 1}`;
    if (old >= 0) hideCopy(old, i > old ? 1 : -1);
    if (instant) {
      copies[i].style.pointerEvents = 'auto';
      gsap.set(lineEls(copies[i]), { yPercent: 0 });
      gsap.set(singles(copies[i]), { opacity: 1, y: 0 });
    } else showCopy(i);
  };
  set(0, true);

  const st = ScrollTrigger.create({
    trigger: root, start: 'top top', end: '+=420%', pin: true,
    onUpdate: (self) => set(Math.min(2, Math.floor(self.progress * 3))),
  });
  const go = (i: number) => {
    const y = st.start + ((i + 0.5) / 3) * (st.end - st.start);
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: 'smooth' });
  };
  cards.forEach((c, k) => c.addEventListener('click', () => { if (k !== idx) go(k); }));

  let rt: number;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(() => layout(true), 150);
  });
}

function cta() {
  gsap.from('.cta__h, .cta__row > *, .cta__grid > *', {
    opacity: 0, y: 40, duration: 1.1, ease: 'power3.out', stagger: 0.08,
    scrollTrigger: { trigger: '.cta', start: 'top 70%' },
  });
}

async function boot() {
  const lenis = await getLenis();
  if (lenis) lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.lagSmoothing(0);
  await (document as any).fonts?.ready;

  intro();
  story(lenis);
  marquee();
  structure();
  statement();
  inside(lenis);
  cta();

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
}

boot();
