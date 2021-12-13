import React, { Component } from 'react';
import './NextButton.css';
import { Link } from 'react-router-dom';
import arrowImage from '../../images/arrow-icon.png';


function NextButton({ nextLink, startTimer }) {
  const goToNextPage = () => {
    startTimer();

    if(nextLink === '/play') {
      // this.props.updateTimer('isOver', false);
      // this.props.resetGameStats();
    }
  }

  return (
    <Link to={nextLink}>
      <button
        className='NextButton'
        onClick={goToNextPage}
      >
      {nextLink === '/' ?
        <p>play again!</p> :
        <p>let's go!</p>
      }
      <img src={arrowImage} alt='next-arrow'/>
      </button>
    </Link>
  );
}

export default NextButton;
