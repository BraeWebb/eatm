import React from 'react';
import ReactDOM from 'react-dom';
import Config from '../config';

import BreadCrumb from './components/BreadCrumb';
import KeyPad from "./components/KeyPad";

import * as Screens from './components/screens';

import Admin from './components/Admin';

import './style.css';


class ATM extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.pushScreen = this.pushScreen.bind(this);
    this.popScreen = this.popScreen.bind(this);
    this.nextCallback = this.nextCallback.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setOk = this.setOk.bind(this);
    this.scanCard = this.scanCard.bind(this);
    this.setPin = this.setPin.bind(this);
    this.setWithdrawalAccount = this.setWithdrawalAccount.bind(this);
    this.setWithdrawal = this.setWithdrawal.bind(this);
    this.setTransfer = this.setTransfer.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.callSupport = this.callSupport.bind(this);
    this.submitSession = this.submitSession.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.continue = this.continue.bind(this);
    this.reset = this.reset.bind(this);

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
      action: '',
      favourites: [],
      language: 'English',
      time: new Date(),
      position: {x: 0, y: 0}
    };

    let data = localStorage.getItem('session');
    localStorage.setItem('session', "[]");
    data = JSON.parse(data);
    this.makeAction(this, data);

    this.history = [this.state];
    this.change = new Date();
    this.canvas = document.getElementById("overlay").getContext("2d");
    this.canvas.fillStyle = "#FF0000";
    this.position = {x: 0, y: 0};
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.time = (new Date()) - this.change;
    nextState.position = this.position;
    this.change = new Date();
    this.history.push(nextState);
  }

  mouseMove(event) {
    this.position = {
      x: event.clientX/window.innerWidth,
      y: event.clientY/window.innerHeight
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

  nextCallback(screen) {
    if (screen === -1) {
      return this.goBack;
    }
    return () => {
      let index = this.state.crumbs.indexOf(screen);
      if (index !== -1) {
        this.popScreen(this.state.crumbs.length - index - 1);
      } else {
        this.pushScreen(screen);
      }
    }
  }

  yesNoCallback(yes, no) {
    return (condition) => {
      if (condition) {
        this.nextCallback(yes)();
      } else {
        this.nextCallback(no)();
      }
    }
  }

  setValueCallback(property, screen) {
    return (value) => {
      let state = {};
      state[property] = value;
      this.setState(state);
      if (screen) {
        this.nextCallback(screen)();
      }
    };
  }

  returnHome() {
    let index = this.state.crumbs.indexOf("home");
    if (index !== -1) {
      this.popScreen(this.state.crumbs.length - index - 1);
    } else {
      this.pushScreen("home");
    }
  }

  reset () {
    this.setState({
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
      action: '',
      favourites: [],
      language: 'English'
    });
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
    this.pushScreen('withdrawalAmount');
  }

  setWithdrawal(to, options) {
    this.setState({action: "withdrawal"});
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

  setTransfer(to, options) {
    this.setState({action: "transfer"});
    switch (to) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        this.setAmount(options[to]);
        break;
      case 5:
        this.pushScreen('withdrawalCustom');
        break;
    }
  }

  setAmount(value) {
    this.setState({amount: value});
    this.pushScreen('confirmation');
  }

  callSupport(call) {
    if (call) {
      this.pushScreen('error');
    } else {
      this.returnHome();
    }
  }

  continue() {
    let next = this.screen.props.continue;
    if (next) {
      this.pushScreen(next);
    }
  }

  makeAction(atm, history) {
    if (history.length <= 0) {
      return;
    }
    setTimeout((() => {
      this.setState(history[0]);

      if (history[0].position) {
        let x = history[0].position.x * this.canvas.canvas.width;
        let y = history[0].position.y * this.canvas.canvas.height;

        this.canvas.fillRect(x, y, 5, 5);
      }

      this.makeAction(atm, history.splice(1, history.length-1))
    }).bind(this), history[0].time);
  }

  submitSession() {
    let name = prompt("Please enter your name");
    fetch(Config.urls.make_session, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history: this.history,
        name: name
      })
    })
  }

  render() {
    const withdrawalAccountOptions = ['Savings', 'Cheque', 'Credit'];
    const withdrawalOptions = ['$20', '$50', '$100', '$200', 'Custom Amount', 'Favourite Withdrawal'];
    const depositAccountOptions = ['Savings', 'Cheque'];
    const depositMethodOptions = ['Cash', 'Cheque'];
    const transferOptions = ['$20', '$50', '$100', '$200', '$500', 'Custom Amount'];
    const languages = ['English', 'Spanish', 'French', 'Chinese', 'Italian', 'Polish'];
    // the array keys are used to identify screens
    const screens = {
      error:
        <Screens.ErrorScreen />,
      landing:
        <Screens.LandingScreen
          onContinue={this.pushScreen} />,
      card:
        <Screens.InfoScreen
          title="Please place your card on the reader"
          continue="pin" />,
      pin:
        <Screens.InputScreen
          prompt="Please enter your PIN"
          type="password"
          input={this.state.input}
          ok={this.state.ok}
          callback={this.nextCallback("home")} />,
      home:
        <Screens.HomeScreen
          onContinue={this.pushScreen} />,
      withdrawalAccount:
        <Screens.OptionScreen
          prompt="Choose an account"
          options={withdrawalAccountOptions}
          callback={this.setWithdrawalAccount} />,
      withdrawalAmount:
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
          callback={this.setValueCallback('amount', 'confirmation')} />,
      withdrawalFavourite:
        <Screens.ErrorScreen />,
      confirmation:
        <Screens.YesNoScreen
          prompts={[
            "Confirm this " + this.state.action + "?",
            "Amount: " + this.state.amount,
            "Account: " + this.state.accountType
          ]}
          yes="Confirm"
          no="Go Back"
          callback={this.yesNoCallback("error", -1)} />,
      deposit:
        <Screens.OptionScreen
          prompt="Choose an account"
          options={depositAccountOptions}
          callback={this.nextCallback("depositMethod")} />,
      depositMethod:
        <Screens.OptionScreen
          prompt="Choose a method"
          options={depositMethodOptions}
          callback={this.setValueCallback("account", "confirmation")} />,
      balance:
        <Screens.InfoScreen
          title="Your account balance is:"
          info="$103,694.70"
          callback={this.nextCallback("home")} />,
      transfer:
        <Screens.YesNoScreen
          prompt="Choose a transfer method"
          yes="PayID"
          no="BSB or Account Number"
          callback={this.yesNoCallback("payid", "bsb")} />,
      transferAmount:
        <Screens.OptionScreen
          prompt="Choose a transfer amount"
          options={transferOptions}
          callback={this.setTransfer} />,
      payid:
        <Screens.MultipleInputScreen
          fields={[
            "Phone Number",
            "Email Address",
            "ABN",
            "Organisation Identifier"
          ]}
          input={this.state.input}
          callback={this.nextCallback("transferAmount")}
        />,
      bsb:
        <Screens.MultipleInputScreen
          fields={[
            "BSB",
            "Account Number"
          ]}
          input={this.state.input}
          callback={this.nextCallback("transferAmount")}
        />,
      language:
        <Screens.OptionScreen
          prompt="Choose a language"
          options={languages}
          callback={this.setValueCallback('language', 'home')} />,
      help:
        <Screens.YesNoScreen
          prompt="Do you want to be connected to our 24 hour customer support hotline?"
          callback={this.yesNoCallback("call", "home")} />,
      call:
        <Screens.CallScreen
          title="In Call"
          info="Duration: "
          callback={this.nextCallback("home")} />
    };

    this.screen = screens[this.state.screen];

    return (
      <div className="row middle-xs" onMouseMove={this.mouseMove}>
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
                <KeyPad
                  numberInput={this.handleInput}
                  cancel={this.goBack}
                  clear={this.clearInput}
                  ok={this.setOk}
                />
              </div>
              <div className="col-xs-3">
                <div className="scanner" onClick={this.continue} />
                <div className="row middle-xs">
                  <div className="col-xs-7">
                  </div>
                  <div className="col-xs-2">
                    <div className="reset" onClick={this.reset} />
                    <span className="small-text">Reset</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row center-xs">
              <div className="replay" onClick={this.submitSession}>Finish</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

if(document.getElementById('root')) {
  ReactDOM.render(
    <ATM/>,
    document.getElementById('root')
  );
}

if(document.getElementById('admin')) {
  ReactDOM.render(
    <Admin/>,
    document.getElementById('admin')
  );
}