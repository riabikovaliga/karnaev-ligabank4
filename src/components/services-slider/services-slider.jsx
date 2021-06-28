import React from "react";
import withSlider from "../../hocs/with-slider/with-slider";
import {Repeat} from "../../utils/common";
import ServicesSlide from "../services-slide/services-slide";
import {servicesSlides} from '../../mocks/mocks';
import PropTypes from "prop-types";

const ServicesSlider = (props) => {
  const {
    sliderRef,
    currentSlide,
    currentSlideNumber,
    slidesQuantity,

    onTabClick,
    onSwipeStart
  } = props;

  return (
    <section className="services-slider" ref={sliderRef}>
      <h2 className="services-slider__header visually-hidden">Наши сервисы</h2>
      <ul className="services-slider__tabs">
        <Repeat numTimes={servicesSlides.length}>
          {(i) => (
            <li
              key={i}
              className={`services-slider__tab services-slider__tab--${servicesSlides[i].name} ${currentSlide === servicesSlides[i] ? `services-slider__tab--current` : ``}`}
              onClick={() => {
                onTabClick(servicesSlides[i], i);
              }}
            >
              <span className={`services-slider__tab-label services-slider__tab-label--${servicesSlides[i].name}`}>{servicesSlides[i].tabName}</span>
            </li>
          )}
        </Repeat>
      </ul>
      <div
        className="services-slider__slides-container"
        style={{left: currentSlideNumber === 0 ? `0` : `-` + (currentSlideNumber) + `00%`}}
        onMouseDown={onSwipeStart}
        onTouchStart={onSwipeStart}
      >
        <Repeat numTimes={slidesQuantity}>
          {(i) => (
            <ServicesSlide key={i} currentSlide={servicesSlides[i]}/>
          )}
        </Repeat>
      </div>

      <ul className="services-slider__dots">
        <Repeat numTimes={slidesQuantity}>
          {(i) => (
            <li
              key={i}
              className={
                `services-slider__dot services-slider__dot--${currentSlide.name} ${
                  i === currentSlideNumber
                    ? `services-slider__dot--current`
                    : ``
                }`
              }
            >
            </li>
          )}
        </Repeat>
      </ul>
    </section>
  );
};

ServicesSlider.propTypes = {
  sliderRef: PropTypes.shape({}).isRequired,
  currentSlide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    tabName: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.string,
    link: PropTypes.string
  }).isRequired,

  currentSlideNumber: PropTypes.number.isRequired,
  slidesQuantity: PropTypes.number.isRequired,

  onTabClick: PropTypes.func.isRequired,
  onSwipeStart: PropTypes.func.isRequired
};

ServicesSlider.displayName = `ServicesSlider`;

export default withSlider(ServicesSlider);
