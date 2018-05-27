let config = {};

config.urls = {
  make_session: "http://localhost:8081/session",
  list_sessions: "http://localhost:8081/sessions",
  mongo: "mongodb://eatm:trevorsucks@eatm.braewebb.com:27017/eatm"
};

config.server_root = "/";

module.exports = config;