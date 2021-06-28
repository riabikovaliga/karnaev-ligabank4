import React from "react";
import PropTypes from "prop-types";

const MainSlide = (props) => {
  const {
    currentSlide,
  } = props;

  return (
      <div className={`main-slider__slide main-slider__slide--${currentSlide.name}`}>
        <div className={`main-slider__gradient-container main-slider__gradient-container--${currentSlide.name}`}>
          <div className={`main-slider__background-container main-slider__background-container--${currentSlide.name}`}></div>
        </div>
        <div className={`main-slider__container main-slider__container--${currentSlide.name}`}>
          <h1 className={`main-slider__title main-slider__title--${currentSlide.name}`}>Лига Банк</h1>
          <p className={`main-slider__slogan main-slider__slogan--${currentSlide.name}`}>{currentSlide.slogan}</p>
          {currentSlide.link && (
              <a
                  href={`#${currentSlide.linkHref}`}
                  className={`main-slider__link main-slider__link--${currentSlide.name}`}
              >
                {currentSlide.link}
              </a>
          )}
        </div>
      </div>
  );
};

MainSlide.propTypes = {
  currentSlide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkHref: PropTypes.string.isRequired
  }).isRequired
};

MainSlide.displayName = `MainSlide`;

export default MainSlide;
