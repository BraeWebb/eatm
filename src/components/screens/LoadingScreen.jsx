import React from "react";

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.timer = setInterval(
      () => {this.props.callback()},
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <div className="title">
          <p>BankX</p>
        </div>
        <div className="info">
          <p>Please Wait...</p>
          <p>Your transaction is being processed</p>
        </div>
      </div>
    );
  }
}

export default LoadingScreen;