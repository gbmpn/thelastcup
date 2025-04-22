import '../../styles/index.scss'
import '../../styles/pages/index.scss'
import Lenis from 'lenis';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// import GL from '../components/GL.js';


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

    setTimeout(() => {
      document.querySelector('.intro-container').classList.add('is-visible');
    }, 1500);

    const split = new SplitText('#hero h2 strong', { type: "lines, words, chars" });
    const chars = split.chars;

    gsap.from(chars, {
      yPercent: 20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: "power4.out",
      delay: 1.5
    });


  }

  SmoothScroll() {
    setTimeout(() => {
    this.lenis = new Lenis();
    this.lenis.on('scroll', (e) => {

      ScrollTrigger.update();
      // console.log(e)
      const toslides = document.querySelectorAll('.toslide');


      toslides.forEach((el) => {  
        const rect_top = el.getBoundingClientRect().top;
        console.log(rect_top)
        if (rect_top < window.innerHeight / 1.5 ) {
          el.classList.add('is-visible');
        } else {
          el.classList.remove('is-visible');
        }

      })
    })
    const raf = (time) =>{
      this.lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // SplitText animation
    const headlines = document.querySelectorAll('.headline');

    headlines.forEach((headline) => { 
      const split = new SplitText(headline, { type: "lines" });
      const lines = split.lines;

      gsap.from(lines, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headline,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          markers: false // remove in prod
        }
      });

    });
    
    // this.gl = new GL();s
    // this.lenis.on('scroll', (e) => {
    //   this.gl.onScroll(e)
    // })
    const items = document.querySelectorAll('#list-section li, .two-columns ul li');
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