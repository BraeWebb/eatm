import React from "react";

class ScanCardScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="prompt">
          <p>Please place your card on the reader</p>
        </div>
      </div>
    );
  }
}

export default ScanCardScreen;