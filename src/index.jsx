import React from 'react';
import ReactDOM from 'react-dom';

import BreadCrumb from './components/BreadCrumb';
import Key from './components/Key';

import * as Screens from './components/screens';

import './style.css';


class ATM extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.pushScreen = this.pushScreen.bind(this);
    this.popScreen = this.popScreen.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setOk = this.setOk.bind(this);
    this.scanCard = this.scanCard.bind(this);
    this.setPin = this.setPin.bind(this);
    this.setWithdrawalAccount = this.setWithdrawalAccount.bind(this);
    this.setWithdrawal = this.setWithdrawal.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.callSupport = this.callSupport.bind(this);

    // i think this is all we need to keep track of
    this.state = {
      input: '',
      screen: 'landing',
      crumbs: ['landing'],
      ok: false,
      card: false,
      amount: 0,
      accountType: '',
      depositType: '',
      chequeIn: false,
      cashIn: false,
      cashOut: false,
      chequeInLight: false,
      cashInLight: false,
      cashOutLight: false,
      favourites: []
    };
  }

  handleInput(value) {
    this.setState({input: this.state.input + value});
  }

  clearInput() {
    this.setState({input: ''});
  }

  pushScreen(key) {
    this.setState({
      input: '',
      screen: key,
      crumbs: this.state.crumbs.concat([key]),
      ok: false,
      card: false,
      chequeIn: false,
      cardIn: false,
      cashOut: false
    });
  }

  popScreen(n) {
    let crumbs = this.state.crumbs.slice(0, this.state.crumbs.length - n);
    if (crumbs.length < 1) {
      return;
    }
    this.setState({screen: crumbs[crumbs.length - 1], crumbs: crumbs});
  }

  returnHome() {
    let index = this.state.crumbs.indexOf('home');
    if (index !== -1) {
      this.popScreen(this.state.crumbs.length - index - 1);
    }
  }

  goBack(value) {
    this.popScreen(1);
  }

  setOk(value) {
    this.setState({ok: true});
  }

  scanCard(value) {
    this.setState({card: true});
  }

  setPin(value) {
    this.pushScreen('home');
  }

  setWithdrawalAccount(to, options) {
    this.setState({account: options[to]});
    this.pushScreen('withdrawal');
  }

  setWithdrawal(to, options) {
    switch (to) {
      case 0:
      case 1:
      case 2:
      case 3:
        this.setAmount(options[to]);
        break;
      case 4:
        this.pushScreen('withdrawalCustom');
        break;
      case 5:
        this.pushScreen('withdrawalFavourite');
        break;
    }
  }

  setAmount(value) {
    this.setState({amount: value});
    this.pushScreen('withdrawalConfirmation');
  }

  callSupport(call) {
    if (call) {
      this.pushScreen('error');
    } else {
      this.returnHome();
    }
  }

  render() {
    const withdrawalAccountOptions = ['Savings', 'Cheque', 'Credit'];
    const withdrawalOptions = ['$20', '$50', '$100', '$200', 'Custom Amount', 'Favourite Withdrawal'];
    // the array keys are used to identify screens
    const screens = {
      error:
        <Screens.ErrorScreen />,
      landing:
        <Screens.LandingScreen
          onContinue={this.pushScreen} />,
      card:
        <Screens.ScanCardScreen
          input={this.state.input}
          onContinue={this.pushScreen} />,
      pin:
        <Screens.InputScreen
          prompt="Please enter your PIN"
          type="password"
          input={this.state.input}
          ok={this.state.ok}
          callback={this.setPin} />,
      home:
        <Screens.HomeScreen
          onContinue={this.pushScreen} />,
      withdrawalAccount:
        <Screens.OptionScreen
          prompt="Choose an account"
          options={withdrawalAccountOptions}
          callback={this.setWithdrawalAccount} />,
      withdrawal:
        <Screens.OptionScreen
          prompt="Choose an amount"
          options={withdrawalOptions}
          callback={this.setWithdrawal} />,
      withdrawalCustom:
        <Screens.InputScreen
          prompt="Please enter an amount"
          type="amount"
          input={this.state.input}
          ok={this.state.ok}
          callback={this.setAmount} />,
      withdrawalFavourite:
        <Screens.ErrorScreen />,
      withdrawalConfirmation:
        <Screens.ErrorScreen />,
      help:
        <Screens.YesNoScreen
          prompt="Do you want to be connected to our 24 hour customer support hotline?"
          callback={this.callSupport} />
    };

    return (
      <div className="row middle-xs">
        <div className="col-xs">
          <div className="atm">
            <div className="row center-xs">
              <div className="col-xs-8">
                <h1 className="bank">Bank<strong>X</strong></h1>
                <div className="screen">
                  <BreadCrumb crumbs={this.state.crumbs}
                               changeScreen={this.popScreen}/>
                  {screens[this.state.screen]}
                </div>
              </div>
            </div>
            <div className="row center-xs">
              <div className="col-xs-2">
                <div className="cash-out" onClick={this.grabCash} />
                <div className="cheque-insert" onClick={this.insertCheque} />
                <div className="cash-insert" onClick={this.insertCash} />
              </div>
              <div className="col-xs-7">
                <div className="keypad">
                  <div className="keypad-row">
                    <Key keyValue="1" onClick={this.handleInput} />
                    <Key keyValue="2" onClick={this.handleInput} />
                    <Key keyValue="3" onClick={this.handleInput} />
                    <Key keyValue="Cancel" onClick={this.goBack} />
                  </div>
                  <div className="keypad-row">
                    <Key keyValue="4" onClick={this.handleInput} />
                    <Key keyValue="5" onClick={this.handleInput} />
                    <Key keyValue="6" onClick={this.handleInput} />
                    <Key keyValue="Clear" onClick={this.clearInput} />
                  </div>
                  <div className="keypad-row">
                    <Key keyValue="7" onClick={this.handleInput} />
                    <Key keyValue="8" onClick={this.handleInput} />
                    <Key keyValue="9" onClick={this.handleInput} />
                    <Key keyValue="" />
                  </div>
                  <div className="keypad-row">
                    <Key keyValue="" />
                    <Key keyValue="0" onClick={this.handleInput} />
                    <Key keyValue="." onClick={this.handleInput} />
                    <Key keyValue="OK" onClick={this.setOk} />
                  </div>
                </div>
              </div>
              <div className="col-xs-3">
                <div className="scanner" onClick={this.scanCard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ATM />,
  document.getElementById('root')
);