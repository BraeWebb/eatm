import React from "react";

class YesNoScreen extends React.Component {
  render() {
    let yes = this.props.yes ? this.props.yes : "Yes";
    let no = this.props.no ? this.props.no : "No";

    let prompts;

    if (this.props.prompt) {
      prompts = [<p key="prompt">{this.props.prompt}</p>];
    } else {
      prompts = this.props.prompts.map((prompt, index) => {
        return <p key={index}>{prompt}</p>;
      });
    }

    return (
      <div>
        <div className="prompt">
          {prompts}
        </div>
        <div className="options">
          <div className="option" style={{"width": "40%"}}>
            <div className="button okayBtn" onClick={(e) => this.props.callback(true)}>{yes}</div>
          </div>
          <div className="option" style={{"width": "40%"}}>
            <div className="button cancelBtn" onClick={(e) => this.props.callback(false)}>{no}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default YesNoScreen;