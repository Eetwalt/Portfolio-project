import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const indexGsapConfig = {
  gsap: gsap,

  
  animateElements: function() {

    // MORO appear on load
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

    // header MORO underline
    gsap.from('.u-border', {
      duration: 3,
      width: 0,
      ease: 'power3.inOut',
    });

    // Header tech stack appear on load
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

    // work-items appear/disappear
    ScrollTrigger.batch(".work-grid-item", {
      interval: 0.7,
      batchMax: 3,
      onEnter: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.25, overwrite: true}),
      onLeave: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
      onEnterBack: batch => gsap.to(batch, {autoAlpha: 1, stagger: 0.25, overwrite: true}),
      onLeaveBack: batch => gsap.set(batch, { autoAlpha: 0, overwrite: true })
    });

    // work-item tags appear on scroll
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
          start: 'top bottom-=75px',
        }
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#cta",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    tl.from('.cta-card', {
      duration: 0.4,
      opacity: 0.2,
      ease: 'power2.inOut',
    });

    if (window.matchMedia('(min-width: 992px)').matches) {
  
      gsap.utils.toArray(".cc-parallax").forEach((layer: any) => {
        const depth = layer.dataset.depth;
        const movement = -(layer.offsetHeight * depth)
        tl.to(layer, {y: movement, ease: "power2.inOut"}, 0)
      }); 

    } else {}
    
    // marquee move on scroll
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

  }
};