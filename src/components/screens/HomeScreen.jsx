import React from "react";

import OptionScreen from './OptionScreen';

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

export default HomeScreen;