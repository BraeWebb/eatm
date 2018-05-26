import React from "react";

class ErrorScreen extends React.Component {
  render() {
    return (
      <div>
        <div className="prompt">
          <h1>Error</h1>
          <p>404 Not Found</p>
        </div>
      </div>
    );
  }
}

export default ErrorScreen;