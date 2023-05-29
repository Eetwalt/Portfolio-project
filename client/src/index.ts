import particlesJson from "../assets/particles.json";
import { indexGsapConfig } from "../utils/indexGsapConfig";
import { globalGsapConfig } from "../utils/globalGsapConfig";
import { lenisElement } from '../utils/lenis';

lenisElement.setupLenis();

declare const particlesJS: any;

document.addEventListener('DOMContentLoaded', function() {

  globalGsapConfig.animateElements();
  indexGsapConfig.animateElements();
  lenisElement.setupLenis();
  lenisElement.setupScrollButtons();

  if (window.matchMedia('(min-width: 992px)').matches) {
    particlesJS('particles-js', particlesJson); {
        return false;
    }
  } else {}
  
});