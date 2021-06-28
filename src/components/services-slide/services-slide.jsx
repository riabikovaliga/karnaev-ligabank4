import React from "react";
import PropTypes from "prop-types";

const ServicesSlide = (props) => {
  const {
    currentSlide,
  } = props;

  return (
    <div className={`services-slider__slide services-slider__slide--${currentSlide.name}`}>
      <div className={`services-slider__slide-wrapper services-slider__slide-wrapper--${currentSlide.name}`}>
        <p className={`services-slider__slogan services-slider__slogan--${currentSlide.name}`}>{currentSlide.slogan}</p>

        <ul className={`services-slider__features services-slider__features--${currentSlide.name}`}>
          {currentSlide.features.map((feature) => (
            <li key={feature} className={`services-slider__feature services-slider__feature--${currentSlide.name}`}>{feature}</li>
          ))}
        </ul>

        {currentSlide.text && <p
          className="services-slider__text"
        >
          {currentSlide.text.firstLine}
          <br/>
          {currentSlide.text.secondLine}
          <a className="services-slider__text-link" href="#">{currentSlide.text.link}</a>
        </p>}

        {currentSlide.link && <a
          className={`services-slider__link services-slider__link--${currentSlide.name}`}
          href="#"
        >
          {currentSlide.link}
        </a>}
      </div>
    </div>
  );
};

ServicesSlide.propTypes = {
  currentSlide: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.shape({
      firstLine: PropTypes.string.isRequired,
      secondLine: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
    link: PropTypes.string
  }).isRequired
};

ServicesSlide.displayName = `ServicesSlide`;

export default ServicesSlide;
