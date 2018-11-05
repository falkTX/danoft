import React from 'react';
import './Home.css';

const Home = (props) => (
  <div className="Home">
    <header className="Home-header">
      <img src='/assets/camomile.png' className="Home-logo" alt="logo" />
      <p className={props.fadingOut ? "Home-fading-out" : ""}>
        Hallo Daniela, ich habe etwas für dich gemacht!^.^)/
      </p>
      <button onClick={props.startDemo} className={props.fadingOut ? "Home-fading-out" : ""}>
        Anfangen!
      </button>
    </header>
  </div>
);

export default Home;
