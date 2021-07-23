import gsap from 'gsap';

/*------------------------------

Smooth Scroll App

------------------------------*/

const body = document.querySelector('body');
const scrollable = document.getElementById('scrollable');
const mainWrapper = document.getElementById('main-wrapper');

/*------------------------------
Scroll Object
------------------------------*/

const scroll = {
  current: 0,
  target: 0,
  last: 0,
  limit: 0,
  ease: 0.2,
};

/*------------------------------
Lerp Function
------------------------------*/

const lerp = (start, end, time) => {
  return start * (1 - time) + end * time;
};

/*------------------------------
Handle Scroll Containers
------------------------------*/

const handleScrollContainersStyles = () => {
  mainWrapper.style.width = '100%';
  mainWrapper.style.height = '100vh';
  mainWrapper.style.top = '0';
  mainWrapper.style.left = '0';
  mainWrapper.style.position = 'fixed';

  scrollable.style.width = '100%';
  scrollable.style.top = '0';
  scrollable.style.left = '0';
  scrollable.style.position = 'absolute';
  scrollable.style.willChange = 'transform';
};

/*------------------------------
Handle Body Settings
------------------------------*/

const handleDocumentBodySettings = () => {
  if (scrollable) {
    const scrollableBounds = scrollable.getBoundingClientRect();
    const documentHeight = `${scrollableBounds.height}px`;

    body.style.width = '100%';
    body.style.height = '100vh';
    body.style.overscrollBehavior = 'none';

    body.style.height = documentHeight;
  }
};

/*------------------------------
Handle Resize
------------------------------*/

const handleWindowResize = () => {
  window.addEventListener('resize', handleDocumentBodySettings);
};

/*------------------------------
Handle Smooth Scroll
------------------------------*/

const smoothScroller = () => {
  scroll.target = window.scrollY;
  if (scrollable) {
    scroll.limit = scrollable.clientHeight - window.innerHeight;
  }

  scroll.target = gsap.utils.clamp(0, scroll.limit, scroll.target);
  scroll.current = lerp(scroll.current, scroll.target, scroll.ease);

  if (scroll.current < 0.01) {
    scroll.current = 0;
  }

  if (scrollable) {
    scrollable.style.transform = `translateY(${-scroll.current}px)`;
  }

  window.requestAnimationFrame(smoothScroller);
};

/*------------------------------
Init Smooth Scroll
------------------------------*/

const initSmoothScroll = () => {
  handleScrollContainersStyles();
  handleDocumentBodySettings();
  handleWindowResize();
  smoothScroller();
};

/*------------------------------
onPage Load
------------------------------*/

window.addEventListener('load', () => {
  initSmoothScroll();
});