# Can Connect SignalR Test App

`can-connect-signalr-test-app` is a [CanJS](https://canjs.com) chat app that demonstrates how you can use
`can-connect-signalr` in an application. The application is somewhat Slack like:
 - You can press the up arrow to edit the last message. 
 - You can add an image message (as long as it ends with a (gif|png|jpg|jpeg) extension). 
 - Pressing `esc` will cancel out of editing a message.

To run the `can-connect-signalr-test-app` app locally, run its tests, or generate its documentation
follow the steps outlined below:

- [Setup Environment](#setup-environment)
- [Download Source](#download-source)
- [Install Dependencies](#install-dependencies)
- [Start the Server](#start-the-server)
- [Enjoy](#enjoy)


### Setup Environment

Make sure you have installed:

- [Node 5](https://nodejs.org/en/download/)
- NPM 3 *(packaged with Node)*
- An Http Server.

#### Installing an Http Server 

If you do not have an Http Server installed, we recommend installing the `http-server` module:

```
npm i -g http-server
```
or
```
yarn global add http-server
```

Once `http-server` is installed, you can run it from any directory on your system to serve the contents
of that directory (and its children), as follows:

```
$ http-server
```

### Download Source

Clone this repo using git:

```
git clone https://github.com/joe-crick/can-connect-signalr-test-app.git
```

Navigate to the repository's directory

```
cd can-connect-signalr-test-app
```

### Install Dependencies

To install the project's JavaScript dependencies run:

```
npm i
```
or
```
yarn install
```

### Start the Server

The prerequisite setup is now complete. The server can be started. If you installed `http-server`, then run:

```
http-server
```

### Open the Application

By default, `http-server` listens for requests on port `8080`. Navigate to `localhost:8080` in your browser. 
The application should load!

#### Exploring Distrubuted Messaging

To see signalR's distributed messaging in action, open up two copies of the application in different browsers (e.g., 
Chrome and Firefox). Place them side-by-side. Any CRUD action you take on a message in one browser will be automatically
updated in the other.

![SideBySideApplication](https://raw.githubusercontent.com/joe-crick/can-connect-signalr-test-app/master/src/static/images/side-by-side.gif)

### Enjoy

:)
