import React from "react";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.replay = this.replay.bind(this);

    this.state = {
      sessions: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:8081/sessions')
      .then(res => res.json())
      .then(sessions => this.setState({ sessions }));
  }

  replay(event) {
    let session = this.state.sessions[event.target.dataset.id];
    let query = JSON.stringify(session.history);
    window.location.href = "/?" + encodeURIComponent(query);
  }

  render() {
    let sessions = this.state.sessions.map((session, index) => {
      return (
        <li key={session._id} onClick={this.replay} data-id={index}>
          {session.name} @ {session.submitted}
        </li>
      );
    });
    return (
      <ul className="sessions">
        {sessions}
      </ul>
    );
  }
}

export default Admin;