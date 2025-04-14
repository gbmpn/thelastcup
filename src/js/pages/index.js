import '../../styles/index.scss'
import '../../styles/pages/index.scss'
import Lenis from 'lenis';

// import GL from '../components/GL.js';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class Index {
  constructor(options) {
    this.SmoothScroll();
    this.Intro();
  }


  Intro() {
    document.body.scrollTo(0, 0);
    const intro = document.querySelector('.intro')
    intro.style.pointerEvents = 'auto';
    intro.classList.add('play-anim')

  }

  SmoothScroll() {
    setTimeout(() => {
    this.lenis = new Lenis();
    this.lenis.on('scroll', (e) => {
    })
    const raf = (time) =>{
      this.lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    // this.gl = new GL();s
    // this.lenis.on('scroll', (e) => {
    //   this.gl.onScroll(e)
    // })
    const items = document.querySelectorAll('#list-section li');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    });
    items.forEach(item => {
      observer.observe(item);
    });

    document.body.classList.add('loaded');
  }, 1000);
  }
  
}
window.addEventListener('load', () => {
  gsap.to("#logo-group", {
    scale: 1,
    transformOrigin: "center center",
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".intro",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onLeave: () => {
        document.querySelector('.intro').style.pointerEvents = 'none';
      }
    }
  });
  new Index();
});