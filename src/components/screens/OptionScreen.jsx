import React from "react";

class OptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index, e) {
    this.props.callback(index, this.props.options);
  }

  render() {
    const options = this.props.options,
      twoColumns = (this.props.options.length > 3);

    function option(index, width) {
      return (
        <div key={index} className="option" style={{"width": width}}>
          <div className="button" onClick={(e) => this.handleClick(index, e)}>{options[index]}</div>
        </div>
      );
    }

    let optionElements = [];
    if (twoColumns) {
      for (let i = 0; i < options.length; i += 2) {
        optionElements.push(option.call(this, i, "48%"));
      }
      for (let i = 1; i < options.length; i += 2) {
        optionElements.push(option.call(this, i, "48%"));
      }
    } else {
      for (let i = 0; i < options.length; i++) {
        optionElements.push(option.call(this, i, "90%"));
      }
    }

    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
        </div>
        <div className="options">
          {optionElements}
        </div>
      </div>
    );
  }
}

export default OptionScreen;
