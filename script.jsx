class ScreenOne extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    this.props.onContinue(1);
  }

  render() {
    return (
      <div onClick={this.handleContinue}>
        <h1>1</h1>
        <p>{this.props.input}</p>
        <p>Touch screen to continue</p>
      </div>
    );
  }
}

class ScreenTwo extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleContinue() {
    this.props.onContinue(0);
  }

  render() {
    return (
      <div>
        <h1>2</h1>
        <p>{this.props.input}</p>
        <button onClick={this.handleContinue}>Next</button>
      </div>
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
    this.state = {input: '', screen: 0, crumbs: [0], account: '', amount: '', favourites: []};
  }

  handleInput(value) {
    this.setState({input: this.state.input + value});
  }

  clearInput() {
    this.setState({input: ''});
  }

  pushScreen(i) {
    this.setState({screen: i, crumbs: this.state.crumbs.concat([i])});
  }

  popScreen(n) {
    var crumbs = this.state.crumbs.slice(0, this.state.crumbs.length - n);
    if (crumbs.length < 1) {
      return;
    }
    this.setState({screen: crumbs[crumbs.length - 1], crumbs: crumbs});
  }

  goBack() {
    this.popScreen(1);
  }

  render() {
    const screens = [
      <ScreenOne input={this.state.input} onContinue={this.pushScreen} />,
      <ScreenTwo input={this.state.input} onContinue={this.pushScreen} />
    ];

    return (
      <div className="row middle-xs">
        <div className="col-xs">
          <div className="atm">
            <div className="row center-xs">
              <div className="col-xs-8">
                <h1 className="bank">BankX</h1>
                <div className="screen">
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
                    <Key keyValue="OK" />
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
