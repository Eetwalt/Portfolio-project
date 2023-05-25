import particlesJson from "./assets/particles.json";
import { indexGsapConfig } from "./utils/gsapConfig";
import { lenisElement } from './utils/lenis';

lenisElement.setupLenis();


declare const particlesJS: any;

document.addEventListener('DOMContentLoaded', function() {
  
  indexGsapConfig.animateElements(); // Call the animateElements function
  lenisElement.setupLenis();
  lenisElement.setupScrollButtons();

  if (window.matchMedia('(min-width: 992px)').matches) {
    particlesJS('particles-js', particlesJson); {
        return false;
    }
} else {}
  
});