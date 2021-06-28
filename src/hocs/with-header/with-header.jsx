import React, {createRef, PureComponent} from 'react';
import {KeyCode} from '../../const';

const withHeader = (Component) => {
  class WithHeader extends PureComponent {
    constructor(props) {
      super(props);

      this.passwordInputRef = createRef();

      this.state = {
        isNavOpened: false,
        isLoginInOpened: false,

        login: ``,
        password: ``
      };

      this.onNavOpen = this.onNavOpen.bind(this);
      this.onNavClose = this.onNavClose.bind(this);

      this.onLogInOpening = this.onLogInOpening.bind(this);
      this.onLogInClosure = this.onLogInClosure.bind(this);
      this.closeLogInKeydown = this.closeLogInKeydown.bind(this);
      this.onLogInFieldChange = this.onLogInFieldChange.bind(this);
      this.onPasswordShow = this.onPasswordShow.bind(this);
      this.onPasswordHide = this.onPasswordHide.bind(this);
    }

    onNavOpen() {
      this.setState({isNavOpened: true});
      document.documentElement.style.overflow = `hidden`;
    }

    onNavClose() {
      this.setState({isNavOpened: false});
      document.documentElement.style.overflow = `auto`;
    }

    onLogInOpening() {
      this.setState({isLoginInOpened: true});
      document.documentElement.style.overflow = `hidden`;
      document.addEventListener(`keydown`, this.closeLogInKeydown);
    }

    onLogInClosure() {
      this.setState({isLoginInOpened: false});
      document.documentElement.style.overflow = `auto`;
      document.removeEventListener(`keydown`, this.closeLogInKeydown);
    }

    closeLogInKeydown(evt) {
      if (evt.keyCode === KeyCode.ESC) {
        this.onLogInClosure();
      }
    }

    onLogInFieldChange(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value});
      localStorage.setItem(name, value);
    }

    onPasswordShow() {
      this.passwordInputRef.current.type = `text`;
    }

    onPasswordHide() {
      this.passwordInputRef.current.type = `password`;
    }


    render() {
      return (
        <Component
          passwordInputRef={this.passwordInputRef}
          isNavOpened={this.state.isNavOpened}
          onNavOpen={this.onNavOpen}
          onNavClose={this.onNavClose}

          isLogInOpened={this.state.isLoginInOpened}
          onLogInOpening={this.onLogInOpening}
          onLogInClosure={this.onLogInClosure}
          onLogInFieldChange={this.onLogInFieldChange}
          onPasswordShow={this.onPasswordShow}
          onPasswordHide={this.onPasswordHide}
        />
      );
    }
  }

  return WithHeader;
};

export default withHeader;
