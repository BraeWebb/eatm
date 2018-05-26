import React from "react";

class InputScreen extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.ok == true) {
      this.props.callback(this.props.input);
    }
  }

  render() {
    let prefix = this.props.type === 'amount' ? '$' : '';
    let type;

    if (this.props.type === 'amount') {
      type = 'number';
    } else {
      type = this.props.type;
    }

    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
          <p>{prefix}<input type={type} value={this.props.input} readOnly="true" /></p>
        </div>
      </div>
    );
  }
}

export default InputScreen;