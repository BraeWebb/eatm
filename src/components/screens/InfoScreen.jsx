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

    function option(index, width) {
      return (
        <div key={index} className="option" style={{"width": width}}>
          <div className="button" onClick={this.handleClick}>{options[index]}</div>
        </div>
      );
    }

    return (
      <div>
        <div className="title">
          <p>{this.props.title}</p>
        </div>
        <div className="info">
          <p>{this.props.info}</p>
        </div>
        <div className="back">
          <div className="button" onClick={this.handleClick}>Go Back</div>
        </div>
      </div>
    );
  }
}

export default InfoScreen;
