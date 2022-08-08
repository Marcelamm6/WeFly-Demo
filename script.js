'use strict';

//-------smooth scrolling----------

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');
    // console.log(href);

    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

//--------------accordion-----------------

const dropComp = document.querySelectorAll('.pack-content');
const dropEl = document.querySelector('.pack');
const dropTitle = document.querySelectorAll('.pack-title');

dropEl.addEventListener('click', function (e) {
  const clicked = e.target.closest('.pack-title');
  console.log(clicked);

  if (!clicked) return;

  dropTitle.forEach(t => t.classList.remove('btnactive'));
  clicked.classList.add('btnactive');

  const textContent = document.querySelectorAll('.pack-txts');

  textContent.forEach(c => c.classList.remove('txt-active'));

  document
    .querySelector(`.click${clicked.dataset.tab}`)
    .classList.add('txt-active');
});
