import React from "react";

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

export default LandingScreen;