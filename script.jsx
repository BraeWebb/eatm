/*
====================
Screens
====================
*/

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
        <h1>Welcome to BankX</h1>
        <p>Touch screen to begin</p>
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
        <p>Please place your card on the reader</p>
      </div>
    );
  }
}

class PINScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // this is probably unsafe...
    // but it seems to work without either an error or a warning
    if (nextProps.ok == true) {
      this.props.onContinue('home');
    }
  }

  render() {
    return (
      <div>
        <p>Please enter your PIN</p>
        <input type="password" value={this.props.input} readOnly="true" />
      </div>
    );
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    this.props.onContinue('withdrawAccount');
  }

  render() {
    return (
      <div onClick={this.handleContinue}>
        <p>HOME SCREEN PLACEHOLDER</p>
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
    this.props.options[index].callback();
    this.props.onContinue(this.props.continueTo);
  }

  render() {
    const optionRows = this.props.options.map((option, index) =>
      <div key={index} className="col-xs-12">
        <div className="button" onClick={(e) => this.handleClick(index, e)}>{option.name}</div>
      </div>
    );
    return (
      <div>
        <p>{this.props.prompt}</p>
        <div className="row around-xs">
          {optionRows}
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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.onClick(this.props.keyValue);
  }

  render() {
    return (
      <nav className="breadcrumbs" onClick={this.handleClick}></nav>
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
    var classes = this.props.keyValue.length > 1 ? 'key small' : 'key';
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
    this.setAccountToSavings = this.setAccountToSavings.bind(this);
    this.setAccountToCheque = this.setAccountToCheque.bind(this);
    this.setAccountToCredit = this.setAccountToCredit.bind(this);

    // i think this is all we need to keep track of
    this.state = {
      input: '',
      screen: 'landing',
      crumbs: [0],
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
    var crumbs = this.state.crumbs.slice(0, this.state.crumbs.length - n);
    if (crumbs.length < 1) {
      return;
    }
    this.setState({screen: crumbs[crumbs.length - 1], crumbs: crumbs});
  }

  goBack(value) {
    this.popScreen(1);
  }

  setOk(value) {
    this.setState({ok: true});
  }

  setAccountToSavings() {
    this.setState({account: 'Savings'});
  }

  setAccountToCheque() {
    this.setState({account: 'Cheque'});
  }

  setAccountToCredit() {
    this.setState({account: 'Credit'});
  }

  render() {
    const withdrawAccountOptions = [
      {name: 'Savings', callback: this.setAccountToSavings},
      {name: 'Cheque', callback: this.setAccountToCheque},
      {name: 'Credit', callback: this.setAccountToCredit}
    ];
    // the array keys are used to identify screens
    const screens = {
      /*
      -1: Error
      */
      landing: <LandingScreen onContinue={this.pushScreen} />,
      card: <ScanCardScreen input={this.state.input} onContinue={this.pushScreen} />,
      pin: <PINScreen input={this.state.input} ok={this.state.ok} onContinue={this.pushScreen} />,
      home: <HomeScreen onContinue={this.pushScreen} />,
      withdrawAccount: <OptionScreen prompt="Choose an account" options={withdrawAccountOptions} onContinue={this.pushScreen} continueTo="landing" />
      /*
      98: Transaction pending
      99: Transaction complete
      */
    };

    return (
      <div className="row middle-xs">
        <div className="col-xs">
          <div className="atm">
            <div className="row center-xs">
              <div className="col-xs-8">
                <h1 className="bank">BankX</h1>
                <div className="screen">
                  <Breadcrumbs />
                  {screens[this.state.screen]}
                </div>
              </div>
            </div>
            <div className="row center-xs">
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
