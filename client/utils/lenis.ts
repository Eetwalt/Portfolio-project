import Lenis from '@studio-freight/lenis';

const scrollButtons = document.querySelectorAll<HTMLElement>('[data-target]');

export const lenisElement = {
  Lenis: Lenis,
  lenis: new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  }),

  setupLenis() {
    this.lenis.on('scroll', (e: Event) => {
      console.log(e);
    });

    this.raf(0);
  },

  raf(time: number) {
    this.lenis.raf(time);
    requestAnimationFrame((t) => this.raf(t));
  },

  setupScrollButtons() {
    scrollButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('data-target');
        const $el = document.getElementById(target?.replace('#', '') || '');

        if ($el) {
          this.lenis.scrollTo($el, {
            offset: 0,
            immediate: false,
            duration: 2,
            easing: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
          });
        }
      });
    });
  },
};

lenisElement.setupLenis();
lenisElement.setupScrollButtons();