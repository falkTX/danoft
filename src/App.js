import React, { Component } from 'react';
import Game from './game';
import Home from './home';

class App extends Component {
  state = {
    gameRunning: false,
    fadingOut: false,
  }

  startDemo = () => {
    this.setState({ fadingOut : true })
    setTimeout(this.startDemo2, 2000)
  }

  startDemo2 = () => {
    this.setState({ gameRunning: true })
  }

  render() {
    const { gameRunning, fadingOut } = this.state;

    if (gameRunning)
      return <Game />;

    return (
      <Home
        startDemo={this.startDemo}
        fadingOut={fadingOut}
      />
    );
  }
}

export default App;
