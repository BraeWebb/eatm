import React from "react";
import Key from "./Key";

class KeyPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="keypad">
        <div className="keypad-row">
          <Key keyValue="1" onClick={this.props.numberInput} />
          <Key keyValue="2" onClick={this.props.numberInput} />
          <Key keyValue="3" onClick={this.props.numberInput} />
          <Key keyValue="Cancel" className="cancelBtn" onClick={this.props.cancel} />
        </div>
        <div className="keypad-row">
          <Key keyValue="4" onClick={this.props.numberInput} />
          <Key keyValue="5" onClick={this.props.numberInput} />
          <Key keyValue="6" onClick={this.props.numberInput} />
          <Key keyValue="Clear" className="clearBtn" onClick={this.props.clear} />
        </div>
        <div className="keypad-row">
          <Key keyValue="7" onClick={this.props.numberInput} />
          <Key keyValue="8" onClick={this.props.numberInput} />
          <Key keyValue="9" onClick={this.props.numberInput} />
          <Key keyValue="OK" className="okayBtn" onClick={this.props.ok} />
        </div>
        <div className="keypad-row">
          <Key hidden={true} />
          <Key keyValue="0" onClick={this.props.numberInput} />
          <Key keyValue="." onClick={this.props.numberInput} />
        </div>
      </div>
    );
  }
}

export default KeyPad;
