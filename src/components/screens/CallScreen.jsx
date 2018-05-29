import React from "react";

class CallScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      duration: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(
      () => {this.setState({duration:this.state.duration+1})},
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleClick(e) {
    this.props.callback();
  }

  render() {
    // Credit to https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
    let minutes = parseInt(this.state.duration / 60, 10);
    let seconds = parseInt(this.state.duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return (
      <div>
        <div className="title">
          <p>{this.props.title}</p>
        </div>
        <div className="info">
          <p>{this.props.info}{minutes}:{seconds}</p>
        </div>
        <div className="back">
          <div className="button" onClick={this.handleClick}>Go Back</div>
        </div>
      </div>
    );
  }
}

export default CallScreen;
