import React from "react";

class InputScreen extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.ok == true) {
      this.props.callback(this.props.input);
    }
  }

  render() {
    let fields = this.props.fields.map((field, index) => {
      return (
        <p key={field}>
          <span className="field">{field}</span>
          <input value={this.props.input} readOnly="true" />
        </p>
      );
    });

    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
          {fields}
        </div>
        <div>
          <div className="button" onClick={this.props.callback}>Continue</div>
        </div>
      </div>
    );
  }
}

export default InputScreen;