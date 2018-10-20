import React, { Component } from 'react';
import Game from './game';
import Home from './home';

class App extends Component {
  state = {
    gameRunning: false,
    debugMode: false,
    fadingOut: false,
  }

  startDemo = () => {
    this.setState({ fadingOut : true })
    setTimeout(this.startDemo2, 200)
  }

  startDemo2 = () => {
    this.setState({ gameRunning: true })
  }

  startDebug = () => {
    this.setState({ debugMode: true })
  }

  render() {
    console.log(this.state);

    const { gameRunning, debugMode, fadingOut } = this.state;

    if (gameRunning)
      return <Game />;
    
    if (debugMode)
      return <Game />;
    
    return (
      <Home
        startDemo={this.startDemo}
        startDebug={this.startDebug}
        fadingOut={fadingOut}
      />
    );
  }
}

export default App;
