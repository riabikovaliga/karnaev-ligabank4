import React from 'react';
import PropTypes from 'prop-types';

const LogIn = (props) => {

  const {
    passwordInputRef,
    isLogInOpened,
    onLogInClosure,
    onLogInFieldChange,
    onPasswordShow,
    onPasswordHide
  } = props;

  return (
    <div className={`log-in ${isLogInOpened ? `log-in--opened` : ``}`} onClick={onLogInClosure}>
      <form action="#" className="log-in__form" onClick={(evt) => evt.stopPropagation()}>
        <div className="log-in__logo"/>
        <button type="button" className="log-in__close" onClick={onLogInClosure}>
          <span className="visually-hidden">Закрыть окно</span>
        </button>
        <label className="log-in__label log-in__label--login">
            Логин
          <input
            id="login"
            type="text"
            name="login"
            className="log-in__input log-in__input--login"
            onChange={onLogInFieldChange}
            value={localStorage.getItem(`login`) !== null ? localStorage.getItem(`login`) : ``}
            autoFocus
            required
          />
        </label>
        <label className="log-in__label log-in__label--password">
            Пароль
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordInputRef}
            className="log-in__input log-in__input--password"
            onChange={onLogInFieldChange}
            value={localStorage.getItem(`password`) !== null ? localStorage.getItem(`password`) : ``}
            required
          />
        </label>
        <button className="log-in__show-password" onMouseDown={onPasswordShow} onMouseUp={onPasswordHide}></button>
        <button type="submit" className="log-in__submit">Войти</button>
        <a href="#top" className="log-in__restore-password">Забыли пароль?</a>
      </form>
    </div>
  );
};

LogIn.propTypes = {
  passwordInputRef: PropTypes.shape({}).isRequired,
  isLogInOpened: PropTypes.bool.isRequired,
  onLogInClosure: PropTypes.func.isRequired,
  onLogInFieldChange: PropTypes.func.isRequired,
  onPasswordShow: PropTypes.func.isRequired,
  onPasswordHide: PropTypes.func.isRequired
};

export default LogIn;
