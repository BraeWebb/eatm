/*
====================
Screens
====================
*/

class ErrorScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="prompt">
          <h1>Error</h1>
          <p>404 Not Found</p>
        </div>
      </div>
    );
  }
}

class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    this.props.onContinue('card');
  }

  render() {
    return (
      <div onClick={this.handleContinue}>
        <div className="prompt">
          <h1>Welcome to <span className="bank">Bank<strong>X</strong></span></h1>
          <p>Touch screen to begin</p>
        </div>
      </div>
    );
  }
}

class ScanCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    this.props.onContinue('pin');
  }

  render() {
    return (
      <div onClick={this.handleContinue}>
        <div className="prompt">
          <p>Please place your card on the reader</p>
        </div>
      </div>
    );
  }
}

class InputScreen extends React.Component {
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // this is probably unsafe...
    // but it seems to work without either an error or a warning
    if (nextProps.ok == true) {
      this.props.callback(this.props.input);
    }
  }

  render() {
    let prefix = this.props.type === 'amount' ? '$' : '';
    let type;

    if (this.props.type === 'amount') {
      type = 'number';
    } else {
      type = this.props.type;
    }

    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
          <p>{prefix}<input type={type} value={this.props.input} readOnly="true" /></p>
        </div>
      </div>
    );
  }
}

class OptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index, e) {
    this.props.callback(index, this.props.options);
  }

  render() {
    const options = this.props.options,
      twoColumns = (this.props.options.length > 3);

    function option(index, width) {
      return (
        <div key={index} className="option" style={{"width": width}}>
          <div className="button" onClick={(e) => this.handleClick(index, e)}>{options[index]}</div>
        </div>
      );
    }

    let optionElements = [];
    if (twoColumns) {
      for (let i = 0; i < options.length; i += 2) {
        optionElements.push(option.call(this, i, "40%"));
      }
      for (let i = 1; i < options.length; i += 2) {
        optionElements.push(option.call(this, i, "40%"));
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        optionElements.push(option.call(this, i, "90%"));
      }
    }

    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
        </div>
        <div className="options">
          {optionElements}
        </div>
      </div>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.setScreen = this.setScreen.bind(this);
  }

  setScreen(to, options) {
    switch (to) {
      case 0:
        this.props.onContinue('withdrawalAccount');
        break;
      case 5:
        this.props.onContinue('help');
        break;
      default:
        this.props.onContinue('error');
        break;
    }
  }

  render() {
    const homeOptions = [
      'Withdrawal',
      'Deposit',
      'View Balance',
      'Transfer',
      'Language',
      'Help'
    ];
    const prompt = (
      <React.Fragment>
        Welcome!<br />
        Please choose an option
      </React.Fragment>
    );
    return (
      <OptionScreen
          prompt={prompt}
          options={homeOptions}
          callback={this.setScreen} />
    );
  }
}

class YesNoScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
        </div>
        <div className="options">
          <div className="option" style={{"width": "40%"}}>
            <div className="button" onClick={(e) => this.props.callback(true)}>Yes</div>
          </div>
          <div className="option" style={{"width": "40%"}}>
            <div className="button" onClick={(e) => this.props.callback(false)}>No</div>
          </div>
        </div>
      </div>
    );
  }
}


/*
====================
ATM
====================
*/

class Breadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.crumbClick = this.crumbClick.bind(this);
  }

  crumbClick(e) {
    this.props.changeScreen(e.target.dataset.crumbNumber);
  }

  render() {
    let crumbs = this.props.crumbs.map((crumb, index) => {
      let number = this.props.crumbs.length - index - 1;
      return <a key={crumb} data-crumb={crumb} data-crumb-number={number}
                onClick={this.crumbClick}>{crumb} > </a>;
    });
    return (
      <nav className="breadcrumbs">
          {crumbs.splice(Math.max(0, crumbs.length-3), crumbs.length)}
      </nav>
    );
  }
}

class Key extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.keyValue);
  }

  render() {
    let classes = this.props.keyValue.length > 1 ? 'key small' : 'key';
    return (
      <div className={classes} onClick={this.handleClick}>{this.props.keyValue}</div>
    );
  }
}

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
        <ErrorScreen />,
      landing:
        <LandingScreen
          onContinue={this.pushScreen} />,
      card:
        <ScanCardScreen
          input={this.state.input}
          onContinue={this.pushScreen} />,
      pin:
        <InputScreen
          prompt="Please enter your PIN"
          type="password"
          input={this.state.input}
          ok={this.state.ok}
          callback={this.setPin} />,
      home:
        <HomeScreen
          onContinue={this.pushScreen} />,
      withdrawalAccount:
        <OptionScreen
          prompt="Choose an account"
          options={withdrawalAccountOptions}
          callback={this.setWithdrawalAccount} />,
      withdrawal:
        <OptionScreen
          prompt="Choose an amount"
          options={withdrawalOptions}
          callback={this.setWithdrawal} />,
      withdrawalCustom:
        <InputScreen
          prompt="Please enter an amount"
          type="amount"
          input={this.state.input}
          ok={this.state.ok}
          callback={this.setAmount} />,
      withdrawalFavourite:
        <ErrorScreen />,
      withdrawalConfirmation:
        <ErrorScreen />,
      help:
        <YesNoScreen
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
                  <Breadcrumbs crumbs={this.state.crumbs}
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
