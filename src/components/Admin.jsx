import React from "react";
import Config from '../../config';

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.replay = this.replay.bind(this);

    this.state = {
      sessions: []
    };
  }

  componentDidMount() {
    fetch(Config.urls.list_sessions)
      .then(res => res.json())
      .then(sessions => this.setState({ sessions }));
  }

  replay(event) {
    let session = this.state.sessions[event.target.dataset.id];
    let query = JSON.stringify(session.history);
    localStorage.setItem('session', query);
    window.location.href = "/";
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