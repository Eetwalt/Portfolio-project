import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const globalGsapConfig = {
  gsap: gsap,

  animateElements: function() {

    // CTA Parallax effect
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