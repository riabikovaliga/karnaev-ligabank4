import React from "react";
import withSlider from "../../hocs/with-slider/with-slider";
import {Repeat} from "../../utils/common";
import MainSlide from "../main-slide/main-slide";
import {mainSlides} from '../../mocks/mocks';
import PropTypes from "prop-types";

const MainSlider = (props) => {
  const {
    sliderRef,
    currentSlide,
    currentSlideNumber,
    slidesQuantity,
    onSwipeStart
  } = props;

  return (
    <section className="main-slider" ref={sliderRef}>
      <div
        className="main-slider__slides-container"
        style={{left: currentSlideNumber === 0 ? `0` : `-` + (currentSlideNumber) + `00%`}}
        onMouseDown={onSwipeStart}
        onTouchStart={onSwipeStart}
      >
        <Repeat numTimes={slidesQuantity}>
          {(i) => (
            <MainSlide key={i} currentSlide={mainSlides[i]}/>
          )}
        </Repeat>
      </div>

      <ul className="main-slider__dots">
        <Repeat numTimes={slidesQuantity}>
          {(i) => (
            <li
              key={i}
              className={
                `main-slider__dot main-slider__dot--${currentSlide.name} ${
                  i === currentSlideNumber
                    ? `main-slider__dot--current`
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

MainSlider.propTypes = {
  sliderRef: PropTypes.shape({}).isRequired,
  currentSlide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    link: PropTypes.string
  }).isRequired,

  currentSlideNumber: PropTypes.number.isRequired,
  slidesQuantity: PropTypes.number.isRequired,

  onSwipeStart: PropTypes.func.isRequired,
  onTabClick: PropTypes.func
};

MainSlider.displayName = `MainSlider`;

export default withSlider(MainSlider);
