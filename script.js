'use strict';

//---------Sticky navigation--------

const homePage = document.querySelector('.home-page');

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      // console.log(ent);
      document.body.classList.add('sticky');
    }
    if (ent.isIntersecting) {
      // console.log(ent);
      document.body.classList.remove('sticky');
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: '-60px',
  }
);
observer.observe(homePage);

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

//--------------Home------------------

document
  .querySelector('.left-nav')
  .addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

//---------------Explore---------------

fetch('https://countriesnow.space/api/v0.1/countries/capital')
  .then(data => data.json())
  .then(res => fillDropDown(res.data));

function fillDropDown(countriesData) {
  const dropCountries = document.querySelector('#countries-dropdown');
  let nameCountries = countriesData.map((x, i) => {
    return { name: x.name, value: i + 1 };
  });
  nameCountries.forEach(country => {
    let option = document.createElement('option');
    option.value = country.value;
    option.textContent = country.name;
    dropCountries.appendChild(option);
  });
}

const dropCountries = document.querySelector('#countries-dropdown');
const exploreButton = document.querySelector('.explore-button');

dropCountries.addEventListener('click', function (e) {
  e.preventDefault();

  for (let i = 0; i < dropCountries.length; i++) {
    const option = dropCountries.children[i];
    if (option.value == dropCountries.value && i !== 0) {
      // console.log(option.text);
      document.querySelector(
        '.explore-span-text'
      ).textContent = `about ${option.text}`;
      document.querySelector('.explore-span').style.opacity = 100;
    }
  }
});

const exploreName = document.querySelector('.explore-input-name');
const exploreEmail = document.querySelector('#explore-email');

exploreButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    dropCountries.value !== 0 &&
    exploreName.value.length > 0 &&
    exploreEmail.value.length > 0
  ) {
    document.querySelector('.explore-subs-green').style.opacity = 100;
    document.querySelector('.explore-subs-red').style.opacity = 0;
  } else {
    document.querySelector('.explore-subs-red').style.opacity = 100;
    document.querySelector('.explore-subs-green').style.opacity = 0;
  }
});

// var selectHtml = document.querySelector('select');
// for (let i = 0; i < selectHtml.children.length; i++) {
//   const option = selectHtml.children[i];
//   if (option.value == selectHtml.value) {
//     console.log(`Achei o ${option.text} no item ${i}`);
//     break;
//   }

//   console.log('Eu continuo procurando!');
// }

//--------------tabbed-----------------

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
