import React, { useState, useEffect } from 'react';
import './MathCard.css';
import { getNumbers, writeExpression, operationPairings } from '../../problemSets';
import { getAnswer } from '../../apiCalls/apiCalls';

export function MathCard(props) {
  const [numbers, setNumbers] = useState([]);
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluatedTo, setEvaluatedTo] = useState('waiting');
  const [error, setError] = useState('');

  useEffect(() => {

    async function setNumsAndExpression() {
      await setNumbers(getNumbers())
      await setExpression(writeExpression(numbers, props.operation))
    }
    //do i need async await here?
    setNumsAndExpression()

  }, [])


  function updateAnswer (event) {
    setAnswer(event.target.value);
  };

  function checkAnswer() {
    getAnswer(operationPairings[props.operation], numbers)
    .then(data => {
      console.log(data);
      if (String(data.solution) === answer) {
        setEvaluatedTo('correct')
        props.increaseCorrect();
        setTimeout(getNewCard, 2500)
      } else {
        setEvaluatedTo('incorrect')
        props.increaseIncorrect();
      }
    })
    .catch(err => setError(err))
  }

  async function getNewCard () {
    await setNumbers(getNumbers())
      setAnswer('')
      setEvaluatedTo('waiting')

    setExpression(writeExpression(numbers, props.operation))
  }

    return (
      <div className={`MathCard ${evaluatedTo}`}>
        <p className='expression-text'>{expression}</p>
        <input
          type='text'
          value={answer}
          onChange={updateAnswer}
        />
        { error && <p>Oops! Try again!</p> }
        <button
          onClick={checkAnswer}
        >CHECK</button>
      </div>
    );
};

export default MathCard;
