import React from "react";

class Admin extends React.Component {
  constructor(props) {
    super(props);

    this.addSession = this.addSession.bind(this);
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

  addSession() {
    fetch('http://localhost:8081/session', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

  replay(event) {
    console.log(event.target.dataset.history);
  }

  render() {
    let sessions = this.state.sessions.map((session) => {
      return (
        <li key={session._id} onClick={this.replay} data-history={session.history}>
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