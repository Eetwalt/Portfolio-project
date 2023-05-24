import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const indexGsapConfig = {
  gsap: gsap,

  animateElements: function() {
    gsap.from('.u-border', {
      duration: 3,
      width: 0,
      ease: 'power3.inOut',
    });

    gsap.to('.marquee-row-1', {
      x: -1500,
      ease: 'power1.in',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: true,
      },
    });

    gsap.to('.marquee-row-2', {
      x: 1500,
      ease: 'power1.in',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: true,
      },
    });

    gsap.to('.marquee-row-3', {
      x: -1500,
      ease: 'power1.in',
      scrollTrigger: {
        start: 'top top',
        end: 'max',
        scrub: true,
      },
    });

    gsap.from('.letter', {
      duration: 1,
      scale: 0.0,
      y: 100,
      ease: 'power2.inOut',
      stagger: {
        grid: [0, 5],
        from: 'start',
        axis: 'x',
        amount: 1,
      },
    });

    let tagWrappers: any = gsap.utils.toArray(".work-item-tags");

    tagWrappers.forEach((tagWrapper: any) => {
      let tags = tagWrapper.querySelectorAll(".work-item-tag");
      gsap.from(tags, {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power1.in',
        stagger: 0.25,
        scrollTrigger: {
          trigger: tagWrapper,
          start: 'top bottom-=200px'
        }
      });
    });

    gsap.from('.icon-2', {
      duration: 1,
      scale: 0.0,
      y: 20,
      ease: 'power2.inOut',
      stagger: {
        grid: [0, 13],
        from: 'start',
        axis: 'x',
        amount: 1,
      },
    });
  }
};
