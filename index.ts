import particlesJson from "./assets/particles.json";
import { indexGsapConfig } from "./utils/gsapConfig";

declare const particlesJS: any;

document.addEventListener('DOMContentLoaded', function() {
  particlesJS('particles-js', particlesJson);

  indexGsapConfig.animateElements(); // Call the animateElements function
});