import React, { useState } from 'react';
import './MathCard.css';
import { getNumbers, writeExpression, operationPairings } from '../../problemSets';
import { getAnswer } from '../../apiCalls/apiCalls';

export function MathCard() {
  const [numbers, setNumbers] = useState([]);
  const [expression, setExpression] = useState('');
  const [answer, setAnswer] = useState('');
  const [evaluatedTo, setEvaluatedTo] = useState('waiting');
  const [error, setError] = useState('');



  async componentDidMount() {
    await setNumbers(getNumbers())

    setExpression(writeExpression(numbers, props.operation))
  }

  updateAnswer = event => {
    setAnswer(event.target.value);
  };

  checkAnswer = () => {
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

  getNewCard = async () => {
    await setNumbers(getNumbers())
      setAnswer('')
      setEvaluatedTo('waiting')
  }

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
