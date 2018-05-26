import React from "react";

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

export default Key;