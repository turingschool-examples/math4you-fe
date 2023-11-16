import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export function Header () {
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);


  countdown = () => {
    const tick = () => {
      if(secondsLeft > 0) {
        let newSeconds = secondsLeft - 1;
        setSecondsLeft(newSeconds)
        setTimeout(tick, 1000);
      } else if (minutesLeft >= 1) {
        let newMinutes = minutesLeft - 1;
        setMinutesLeft(newMinutes)
        setSecondsLeft(60)
        setTimeout(tick, 1000);
      } else {
        props.endTimer()
      }
    }

    tick();
  }

  componentDidMount = async () => {
    await 
    setMinutesLeft(Math.floor(props.time / 60))
    setSecondsLeft(props.time % 60)
    countdown()
  }


    return (
      <header className='Header'>
      <h1>MATH<span className='highlight-title'>4</span>YOU</h1>
      <h2>TIME LEFT: 0{minutesLeft}:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</h2>
      <Link to = '/select'>
      <button className='go-back-button'>GO BACK</button>
      </Link>
      </header>
    );
};

export default Header;
