import React from "react";

class InfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.callback();
  }

  render() {
    let button = <div/>;
    if (this.props.callback) {
      button = (
        <div className="back">
          <div className="button" onClick={this.handleClick}>Go Back</div>
        </div>);
    }
    return (
      <div>
        <div className="title">
          <p>{this.props.title}</p>
        </div>
        <div className="info">
          <p>{this.props.info}</p>
        </div>
        {button}
      </div>
    );
  }
}

export default InfoScreen;
