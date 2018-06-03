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
    if (this.props.hidden) {
      return (<div/>);
    }
    let classes = this.props.keyValue.length > 1 ? 'key small' : 'key';
    classes = this.props.className ? classes + " " + this.props.className : classes;
    return (
      <div className={classes} onClick={this.handleClick}>{this.props.keyValue}</div>
    );
  }
}

export default Key;
