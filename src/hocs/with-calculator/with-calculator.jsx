import React, {createRef, PureComponent} from 'react';
import {InputFields, MortgageParams, CarParams, KeyCode, REQUIRED_INCOME, QUANTITY_MONTH, PHONE_LENGTH} from '../../const';

/* eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
const withCalculator = (Component) => {
  class WithCalculator extends PureComponent {
    constructor(props) {
      super(props);

      this.costInputRef = createRef();
      this.costDivRef = createRef();

      this.initialFeeInputRef = createRef();
      this.initialFeeDivRef = createRef();

      this.termInputRef = createRef();
      this.termDivRef = createRef();

      this.telRef = createRef();

      this.state = {
        step: 1,
        purpose: `none`,
        isPurposeSelectOpened: false,
        paramsCredit: {},

        cost: 0,
        initialFee: 0,
        term: 0,

        maternalCapital: false,
        casco: false,
        lifeInsurance: false,

        creditAmount: 0,
        percent: `0`,
        monthlyPayment: 0,
        requiredIncome: 0,

        isLabelClicked: false,
        isFormValid: true
      };

      this.onSelectOpen = this.onSelectOpen.bind(this);
      this.onSelectClose = this.onSelectClose.bind(this);
      this.onPurposeChange = this.onPurposeChange.bind(this);

      this.onLabelClick = this.onLabelClick.bind(this);
      this.onInputBlur = this.onInputBlur.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
      this.onCostChange = this.onCostChange.bind(this);
      this.onInitialFeeChange = this.onInitialFeeChange.bind(this);
      this.onTermChange = this.onTermChange.bind(this);
      this.onInputRangeChange = this.onInputRangeChange.bind(this);
      this.onAdditionalChange = this.onAdditionalChange.bind(this);
      this.onCostChangeSign = this.onCostChangeSign.bind(this);

      this.getCreditAmount = this.getCreditAmount.bind(this);
      this.getInterestRate = this.getInterestRate.bind(this);
      this.getMonthlyPayment = this.getMonthlyPayment.bind(this);

      this.onMakeRequest = this.onMakeRequest.bind(this);
      this.onRegApplicationChange = this.onRegApplicationChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onPopupClose = this.onPopupClose.bind(this);
      this.closePopupKeydown = this.closePopupKeydown.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
    }

    componentDidMount() {
      this.getCreditAmount();
      this.getInterestRate();
      this.getMonthlyPayment();
    }

    componentDidUpdate() {
      this.getCreditAmount();
      this.getInterestRate();
      this.getMonthlyPayment();
    }

    onSelectOpen() {
      this.setState({isPurposeSelectOpened: true});
    }

    onSelectClose() {
      this.setState({isPurposeSelectOpened: false});
    }

    onPurposeChange(evt) {
      const params = evt.currentTarget.id === `mortgage` ? MortgageParams : CarParams;
      this.setState({
        step: 2,
        purpose: evt.currentTarget.id,
        paramsCredit: params,
        cost: params.minCost,
        initialFee: params.minCost * params.minInitialFee / 100,
        term: params.minTerm,
        maternalCapital: params.maternalCapital ? true : false,
      });
      this.onSelectClose();
    }

    onLabelClick(evt) {
      this.setState({isLabelClicked: true});

      switch (evt.target.htmlFor) {
        case InputFields.cost:
          this.costInputRef.current.style.display = `block`;
          this.costDivRef.current.style.display = `none`;
          break;

        case InputFields.initialFee:
          this.initialFeeInputRef.current.style.display = `block`;
          this.initialFeeDivRef.current.style.display = `none`;
          break;

        case InputFields.term:
          this.termInputRef.current.style.display = `block`;
          this.termDivRef.current.style.display = `none`;
          break;
      }
    }

    onInputFocus(evt) {
      evt.target.style.display = `none`;
      evt.target.previousElementSibling.style.display = `block`;
      evt.target.previousElementSibling.focus();
    }

    onInputBlur(evt, name, value) {
      evt.target.style.display = `none`;
      evt.target.nextElementSibling.style.display = `block`;
      this.setState({[name]: value, isLabelClicked: false});
    }

    onInputChange(evt) {
      const {name, value} = evt.target;
      this.setState({[name]: value});
    }

    onCostChange(evt) {
      let {name, value} = evt.target;

      if (value < this.state.paramsCredit.minCost || value > this.state.paramsCredit.maxCost) {
        evt.target.nextElementSibling.style.color = `red`;
        value = `Некорректное значение`;
      } else {
        evt.target.nextElementSibling.style.color = `#1F1E25`;
        value = +value;
        this.setState({initialFee: value * this.state.paramsCredit.minInitialFee / 100});
      }

      this.onInputBlur(evt, name, value);
    }

    onInitialFeeChange(evt) {
      let {name, value} = evt.target;

      if (value < this.state.cost * this.state.paramsCredit.minInitialFee / 100) {
        value = this.state.cost * this.state.paramsCredit.minInitialFee / 100;
      }
      if (value > this.state.cost) {
        value = this.state.cost;
      }

      this.onInputBlur(evt, name, value);
    }

    onTermChange(evt) {
      let {name, value} = evt.target;

      if (value < this.state.paramsCredit.minTerm) {
        value = this.state.paramsCredit.minTerm;
      }
      if (value > this.state.paramsCredit.maxTerm) {
        value = this.state.paramsCredit.maxTerm;
      }

      this.onInputBlur(evt, name, value);
    }

    onInputRangeChange(evt) {
      const {name, value} = evt.target;

      name === `initialFee`
        ? this.setState({[name]: this.state.cost * value / 100})
        : this.setState({[name]: value});
    }

    onAdditionalChange(evt) {
      this.setState({[evt.target.name]: !this.state[evt.target.name]});
    }

    onCostChangeSign(evt) {
      this.costInputRef.current.style.color = `#1F1E25`;
      this.costDivRef.current.style.color = `#1F1E25`;

      let cost = this.state.cost === `Некорректное значение` ? this.state.paramsCredit.minCost : this.state.cost;

      evt.target.id === `plus`
        ? cost += this.state.paramsCredit.step
        : cost -= this.state.paramsCredit.step;

      if (cost < this.state.paramsCredit.minCost) {
        cost = this.state.paramsCredit.minCost;
      }

      if (cost > this.state.paramsCredit.maxCost) {
        cost = this.state.paramsCredit.maxCost;
      }

      this.setState({
        cost,
        initialFee: this.state.cost === `Некорректное значение` ? Math.round(cost * this.state.paramsCredit.minInitialFee / 100) : Math.round(cost * this.state.initialFee / this.state.cost),
      });
    }

    getCreditAmount() {
      this.setState({creditAmount: this.state.cost - this.state.initialFee - (this.state.maternalCapital ? this.state.paramsCredit.maternalCapitalValue : 0)});
    }

    getInterestRate() {
      if (this.state.purpose === `mortgage`) {

        this.state.initialFee >= this.state.cost * this.state.paramsCredit.percent.amountForSpecialPercent / 100
          ? this.setState({percent: this.state.paramsCredit.percent.specialPercent.toFixed(2)})
          : this.setState({percent: this.state.paramsCredit.percent.default.toFixed(2)});
      }

      if (this.state.purpose === `car`) {
        let percent = this.state.paramsCredit.percent.default;

        if (this.state.cost >= this.state.paramsCredit.percent.amountForSpecialPercent) {
          percent = this.state.paramsCredit.percent.specialPercent;
        }

        if (this.state.casco || this.state.lifeInsurance) {
          percent = this.state.paramsCredit.percent.oneAddition;
        }

        if (this.state.casco && this.state.lifeInsurance) {
          percent = this.state.paramsCredit.percent.allAdditions;
        }

        this.setState({percent: percent.toFixed(2)});
      }
    }

    getMonthlyPayment() {
      const monthlyPercent = (this.state.percent / 100) / QUANTITY_MONTH;

      const result = Math.floor(
          this.state.creditAmount * monthlyPercent / (1 - (1 / Math.pow((1 + monthlyPercent), (this.state.term * QUANTITY_MONTH))))
      );

      this.setState({
        monthlyPayment: result,
        requiredIncome: Math.floor(result * 100 / REQUIRED_INCOME),
      });
    }

    onMakeRequest(evt) {
      evt.preventDefault();
      this.requestNumber = localStorage.getItem(`requestNumber`) !== null ? +localStorage.getItem(`requestNumber`) + 1 : 1;

      this.setState({step: 3});
    }

    onRegApplicationChange(evt) {
      const {name, value} = evt.target;

      this.setState({name: value});
      localStorage.setItem(name, value);
    }

    onSubmit(evt) {
      evt.preventDefault();
      if ((this.telRef.current !== null) && (this.telRef.current.value.length < PHONE_LENGTH)) {
        this.telRef.current.getInputDOMNode().style.borderColor = (`red`);
        return;
      }

      localStorage.setItem(`requestNumber`, this.requestNumber);
      this.setState({step: 4});
      document.documentElement.style.overflow = `hidden`;
      document.addEventListener(`keydown`, this.closePopupKeydown);
    }

    onPopupClose() {
      this.setState({
        step: 1,
        purpose: `none`,
      });

      document.documentElement.style.overflow = `auto`;
      document.removeEventListener(`keydown`, this.closePopupKeydown);
    }

    closePopupKeydown(evt) {
      if (evt.keyCode === KeyCode.ESC) {
        this.onPopupClose();
      }
    }

    onChangePhone(evt) {
      const {name, value} = evt.target;

      this.telRef.current.getInputDOMNode().style.borderColor = (`#1F1E25`);

      this.setState({name, value});
      localStorage.setItem(name, value);
    }

    render() {

      return (
        <Component
          costInputRef={this.costInputRef}
          costDivRef={this.costDivRef}
          initialFeeInputRef={this.initialFeeInputRef}
          initialFeeDivRef={this.initialFeeDivRef}
          termInputRef={this.termInputRef}
          termDivRef={this.termDivRef}
          telRef={this.telRef}
          state={this.state}
          onSelectOpen={this.onSelectOpen}
          onSelectClose={this.onSelectClose}
          onPurposeChange={this.onPurposeChange}
          onLabelClick={this.onLabelClick}
          onInputFocus={this.onInputFocus}
          onInputChange={this.onInputChange}
          onCostChange={this.onCostChange}
          onInitialFeeChange={this.onInitialFeeChange}
          onTermChange={this.onTermChange}
          onInputRangeChange={this.onInputRangeChange}
          onAdditionalChange={this.onAdditionalChange}
          onCostChangeSign={this.onCostChangeSign}
          onMakeRequest={this.onMakeRequest}
          onSubmit={this.onSubmit}
          onPopupClose={this.onPopupClose}
          onRegApplicationChange={this.onRegApplicationChange}
          onChangePhone={this.onChangePhone}
          requestNumber={this.requestNumber}
        />
      );
    }
  }

  return WithCalculator;
};

export default withCalculator;
