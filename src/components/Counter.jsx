import React, { useEffect } from 'react'
import { useState } from 'react';
import '../styles/Counter.css';
import Chart from './Chart';

const Counter = () => {
  const [data, setData] = useState([{ 'count': 0, 'value': 0 }]);
  const [totalCount, setTotalCount] = useState(0);
  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);

  const handleCount = (dir) => {
    setTotalCount(prev => prev + 1)
    if (dir === 'up') {
      setCount(prev => prev + 1);
      setData(prevData => [...prevData, { 'count': totalCount + 1, 'value': count + 1 }])

    } else {
      setCount(prev => prev - 1);
      setData(prevData => [...prevData, { 'count': totalCount + 1, 'value': count - 1 }])
    }
  };

  const getSum = () => {
    var sum = 0
    for (let point of data) {
      sum += point.value;
    }
    return sum
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (auto) {
        const getIncrement = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const increment = getIncrement(1, 10);

        setTotalCount(prev => prev + 1);

        if (increment % 2 === 0) {
          setCount(prev => prev + increment);
          setData(prevData => [...prevData, { 'count': totalCount + 1, 'value': count + increment }])
        } else {
          setCount(prev => prev - increment);
          setData(prevData => [...prevData, { 'count': totalCount + 1, 'value': count - increment }])
        }

      }
    }, 1500);
    return () => clearInterval(interval);
  }, [auto, count, totalCount]);

  const handleReset = () => {
    setData([{ 'count': 0, 'value': 0 }]);
    setCount(0);
    setAuto(false);
    setTotalCount(0);
  };

  return (
    <div>
      <Chart data={data} />
      <div className='info-group'>
        <h1 className='count'>{`Current Count: ${count}`}</h1>
        <h2>{`Sum of Counts: ${getSum()}`}</h2>
        <h2>{`Mean: ${totalCount === 0 ? 0 : getSum()/totalCount}`}</h2>
      </div>
      <section className='button-group'>
        <button id='down' onClick={() => handleCount('down')}><span>Decrease</span></button>
        <button id='up' onClick={() => handleCount('up')}><span>Increase</span></button>
        {auto ? (
          <button id='auto' onClick={() => setAuto(false)}>Stop</button>
        ) : (
            <button id='auto' onClick={() => setAuto(true)}>Auto</button>
          )}
        <button id='reset' onClick={handleReset}>Reset</button>
      </section>
    </div>
  )
}

export default Counter
