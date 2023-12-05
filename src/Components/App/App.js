import React, { useState } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import NextButton from '../NextButton/NextButton';
import GameForm from '../GameForm/GameForm';
import Header from '../Header/Header';
import MathBoard from '../MathBoard/MathBoard';
import EndPage from '../EndPage/EndPage';
import './App.css';

function App () {
  const [timeLeft, setTimeLeft] = useState(true);
  const [operation, setOperation] = useState('+');
  const [time, setTime] = useState('180');
  const [numberCorrect, setNumberCorrect] = useState(0);
  const [numberIncorrect, setNumberIncorrect] = useState(0);

  function startTimer () {
    setTimeLeft(true)
  }

  function endTimer () {
    setTimeLeft(false)
    setTimeLeft(true)
  }

  function updateSelections (category, value) {
    if (category === "timeLeft") {
      setTimeLeft(value)
    } if (category === "operation") {
      setOperation(value)
    }    if (category === "time") {
      setTime(value)
    }    if (category === "numberCorrect") {
      setNumberCorrect(value)
    }    if (category === "numberIncorrect") {
      setNumberIncorrect(value)
    }
  }

  function increaseCorrect () {
    setNumberCorrect(numberCorrect + 1)
  }

  function increaseIncorrect () {
    setNumberIncorrect(numberIncorrect + 1)

  }

    return (
      <main>
        {!timeLeft &&
          <Routes>
            <Route
              exact path='/play'
              element={ <Navigate replace to='/end' /> }
            />
          </Routes>
        }
        <Routes>
          <Route
            exact path="/"
            element={<>
              <HomePage/>
              <NextButton startTimer={startTimer} nextLink='/select'/>
            </>}
          />
          <Route
            exact path='/select'
            element={<>
              <GameForm updateSelections={updateSelections} operation={operation} time={time}/>
              <NextButton startTimer={startTimer} nextLink='/play'/>
            </>}
          />
          <Route
          exact path='/play'
          element={
            <section className='game-board'>
            <Header endTimer={endTimer} time={time} />
            <MathBoard operation={operation} increaseCorrect={increaseCorrect} increaseIncorrect={increaseIncorrect} />
            </section>            }
            />
          <Route exact path='/end' element={<><EndPage numberCorrect={numberCorrect} numberIncorrect={numberIncorrect} time={time} /><NextButton startTimer={startTimer} nextLink='/select'/></>} />
        </Routes>
      </main>
    )
}

export default App;
