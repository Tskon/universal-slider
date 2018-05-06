'use strict';

/**
 * @param {string} selector - css selector from slider wrapper
 * @param {object} options - {colors:{background:'#fff', text:'#000'}, opacity: 0.8}
 * @constructor
 * @author TsKon
 */

function Slider(selector = 'body', slidesArr = [],
                options = {colors: {background: '#fff', text: '#000', imgDir: './img'}, opacity: 0.8}) {

  let currentSlide = 1;

  const render = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'tskon-slider';

    const html = `
        <div class="tskon-slider__content-row">
          <div class="tskon-slider__left-array"><span></span></div>
          <div class="tskon-slider__content"></div>
          <div class="tskon-slider__right-array"><span></span></div>
        </div>
        <div class="tskon-slider__controls"></div>
    `;

    wrapper.innerHTML = html;
    selector = document.querySelector(selector);
    selector.appendChild(wrapper);

    document.querySelector('.tskon-slider__right-array').addEventListener('click', () => {
      nextSlide()
    });

    document.querySelector('.tskon-slider__left-array').addEventListener('click', () => {
      prevSlide()
    });

    wrapper.cssText = `
      background-color = ${options.colors.background};
      color = ${options.colors.text};
    `;
  };

  const getSlide = (num = 1) => {
    num = (isNum(num)) ? num - 1 : 0;
    const slideWrap = document.querySelector('.tskon-slider__content');
    if (typeof slidesArr[num] === 'string'){
      slideWrap.innerHTML = `<img src=${slidesArr[num]}/>`
    } else {
      const obj = slidesArr[num];
      const wrapper = document.createElement('div');
      if(obj.title) {
        const slideTitle = document.createElement('h2');
        slideTitle.innerHTML = obj.title;
        wrapper.appendChild(slideTitle);
      }
      if(obj.body) {
        const slideBody = document.createElement('div');
        slideBody.innerHTML = obj.body;
        wrapper.appendChild(slideBody);
      }
      slideWrap.innerHTML = '';
      slideWrap.appendChild(wrapper);
    }
  };

  const nextSlide = () => {
    if (slidesArr.length === currentSlide) currentSlide = 0;
    getSlide(++currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 1) currentSlide = slidesArr.length + 1;
    getSlide(--currentSlide);
  };

  function isNum(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  render();
  getSlide();
}
