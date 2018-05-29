# Enhanced Automated Teller Machine

## Installation
In the projects working directory with npm installed.
```
npm install
```

## Running the server
The server is an interface between the application and a remote mongo database to store user sessions. You should start the server before doing anything that involves saving and/or loading user sessions
```
npm run server
```

## Running the development server
You can start the development server by running the following command.
```
npm start
```
The development server will automatically reload the project when changes are made.

Access through localhost:8080

## Building the project
When deploying the project to a server project files should be built. This can be done by the following command.
```
npm run build
```
Building the server will make it statically accessible from the dist/index.html file.
