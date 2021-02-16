'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


/* Old Smooth Scrolling */
/*const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',e=>{
  const s1coords = section1.getBoundingClientRect();
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll (x/y)',window.pageXOffset,window.pageYOffset);
 
 /* Older way */
 /*  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior:'smooth',
  }) */

  /* New way */
 /* section1.scrollIntoView({behavior: 'smooth'});

}) */


/* Event delegation way of implementing page navigation */
const container = document.querySelector('.nav__links');

container.addEventListener('click',e=>{
  e.preventDefault();

  /* Gaurd Clause */
  if(!e.target.classList.contains('nav__link')) return;

  const href = e.target.getAttribute('href');
  document.querySelector(href).scrollIntoView({ behavior:'smooth'} );
});



/* Smooth scrolling for navbar */
const logo = document.querySelector('.nav__logo');
const container = document.querySelector('.nav__links');

container.addEventListener('click', e => {
  e.preventDefault();
/* Guard clause */
if(!e.target.classList.contains('nav__link')) return;

const href = e.target.getAttribute('href');
console.log(href);
document.querySelector(href).scrollIntoView({behavior:'smooth'});
});


/* Building a tabbed component */
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const containerContent = document.querySelectorAll('.operations__content');
console.log(containerContent);

tabContainer.addEventListener('click',(e)=>{
    const clicked = e.target.closest('.operations__tab');
    /* Gaurd Clause  */
    if(!clicked) return;

    tabs.forEach(tab =>tab.classList.remove('operations__tab--active'));
    containerContent.forEach(container => container.classList.remove('operations__content--active'));
  
    //Activate tab
    clicked.classList.add('operations__tab--active');

    // Activate content section
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
  })

  //Implementing a Sticky Navigation: The Scroll Event
  const navBar = document.querySelector('.nav');
  
  const heightHeader = document.querySelector('.header').getBoundingClientRect().height;
  document.addEventListener('scroll', ()=>{
    if(window.pageYOffset > heightHeader){
      navBar.classList.add('sticky');
    } else{
      navBar.classList.remove('sticky');
    }
  }); 

/* ------- Revealing Section ------- */
const allSections = document.querySelectorAll('.section');

const showSection = (entries,observer) => {
  const [entry] = entries;

  //Guard clause
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(showSection,{
  root:null,
  threshold:0.15,
});

allSections.forEach(section =>{
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});