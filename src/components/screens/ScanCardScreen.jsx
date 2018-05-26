import React from "react";

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

export default ScanCardScreen;