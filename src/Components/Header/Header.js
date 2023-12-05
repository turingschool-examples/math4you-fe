import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export function Header (props) {
  console.log(props)
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  //what I want:
  // - component loads
  // - minutes and seconds left get updated with initial time
  // - equations load
  // - after min and seconds get updated with initial time, countdown() is invoked
  // - countdown should run itself and keep counting the time down until the timer ends


  function countdown() {
    console.log('in countdown function')
    console.log('BEFORE Min - sec:', minutesLeft, secondsLeft)
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
    console.log('AFTER Min - sec:', minutesLeft, secondsLeft)

      } else {
        props.endTimer()
      }
    }
    tick();
  }

  useEffect(() => {

    setMinutesLeft(Math.floor(props.time / 60))
    setSecondsLeft(props.time % 60)
    setTimerStarted(true)
    // console.log('props.time: ', props.time)
    // //do i need async await?
    // async function setMinsAndSecs () {
    //   await setMinutesLeft(Math.floor(props.time / 60))
    //   await setSecondsLeft(props.time % 60)
    // }

    // async function startCountdown() {
    //   await setMinsAndSecs()
    //   console.log('line before countdown() min', minutesLeft)
    //   countdown()
    // }

    // startCountdown()
    
  }, [])

  useEffect(() => {
    console.log('MIN: ', minutesLeft, 'SEC: ', secondsLeft)
    countdown()
  }, [timerStarted])

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
