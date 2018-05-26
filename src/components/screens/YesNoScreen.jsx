import React from "react";

class YesNoScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="prompt">
          <p>{this.props.prompt}</p>
        </div>
        <div className="options">
          <div className="option" style={{"width": "40%"}}>
            <div className="button" onClick={(e) => this.props.callback(true)}>Yes</div>
          </div>
          <div className="option" style={{"width": "40%"}}>
            <div className="button" onClick={(e) => this.props.callback(false)}>No</div>
          </div>
        </div>
      </div>
    );
  }
}

export default YesNoScreen;