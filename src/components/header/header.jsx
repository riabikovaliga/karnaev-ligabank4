import React from "react";
import PropTypes from "prop-types";
import withHeader from "../../hocs/with-header/with-header";
import LogIn from "../log-in/log-in";

const Header = (props) => {
  const {
    passwordInputRef,
    isNavOpened,
    onNavOpen,
    onNavClose,
    isLogInOpened,
    onLogInOpening,
    onLogInClosure,
    onLogInFieldChange,
    onPasswordShow,
    onPasswordHide
  } = props;

  return (
  <header className={`header ${isNavOpened ? `header--opened` : ``} app__header`}>
    <div className="container header__container">
      <div className="header__wrapper">
        <button className="header__burger-button" onClick={onNavOpen}><span className="visually-hidden">Открыть меню</span></button>
        <a href="#" className="header__logo">
          ЛИГА Банк
        </a>
        <button className={`header__close-menu ${isNavOpened ? `header__close-menu--opened` : ``}`} onClick={onNavClose}><span className="visually-hidden">Закрыть меню</span></button>
      </div>
      <nav className={`header__nav ${isNavOpened ? `header__nav--opened` : ``}`}>
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <a href="#" className={`header__nav-link ${isNavOpened ? `header__nav-link--opened` : ``}`}>Услуги</a>
          </li>
          <li className="header__nav-item">
            <a href="#" className={`header__nav-link ${isNavOpened ? `header__nav-link--opened` : ``}`}>Рассчитать кредит</a>
          </li>
          <li className="header__nav-item">
            <a href="#" className={`header__nav-link ${isNavOpened ? `header__nav-link--opened` : ``}`}>Конвертер валют</a>
          </li>
          <li className="header__nav-item">
            <a href="#" className={`header__nav-link ${isNavOpened ? `header__nav-link--opened` : ``}`}>Контакты</a>
          </li>
        </ul>
      </nav>
      <div className={`header__user-block ${isNavOpened ? `header__user-block--opened` : ``}`}>
        <a
            href="#"
            className={`header__user-link ${isNavOpened ? `header__user-link--opened` : ``}`}
            onClick={onLogInOpening}
        >
          <span className={`header__user-link-value ${isNavOpened ? `header__user-link-value--opened` : ``}`}>
            Войти в Интернет-банк
          </span>
        </a>
        <LogIn
            passwordInputRef={passwordInputRef}
            isLogInOpened={isLogInOpened}
            onLogInClosure={onLogInClosure}
            onLogInFieldChange={onLogInFieldChange}
            onPasswordShow={onPasswordShow}
            onPasswordHide={onPasswordHide}
        />
      </div>
    </div>
  </header>

  );
};

Header.propTypes = {
  passwordInputRef: PropTypes.shape({}).isRequired,

  isNavOpened: PropTypes.bool.isRequired,
  onNavOpen: PropTypes.func.isRequired,
  onNavClose: PropTypes.func.isRequired,

  isLogInOpened: PropTypes.bool.isRequired,

  onLogInOpening: PropTypes.func.isRequired,
  onLogInClosure: PropTypes.func.isRequired,
  onLogInFieldChange: PropTypes.func.isRequired,
  onPasswordShow: PropTypes.func.isRequired,
  onPasswordHide: PropTypes.func.isRequired,
};

Header.displayName = `Header`;

export default withHeader(Header);
