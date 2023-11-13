import React, { useState, useEffect } from 'react';
import './style.css'

const Timer = () => {
 const [isRunning, setIsRunning] = useState(false);
 const [timer, setTimer] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
 const [records, setRecords] = useState([]);

 useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => ({
          ...prevTimer,
          milliseconds: (prevTimer.milliseconds + 1) % 1000,
        }));
      }, 10);

      setTimer((prevTimer) => ({
        ...prevTimer,
        milliseconds: 0,
      }));
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
 }, [isRunning]);

 useEffect(() => {
    if (timer.milliseconds === 0) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        seconds: (prevTimer.seconds + 1) % 60,
      }));
    }
    if (timer.seconds === 0) {
      setTimer((prevTimer) => ({
        ...prevTimer,
        minutes: (prevTimer.minutes + 1) % 60,
      }));
    }
 }, [timer.milliseconds]);

 const start = () => setIsRunning(true);
 const stop = () => setIsRunning(false);
 const reset = () => setTimer({ minutes: 0, seconds: 0, milliseconds: 0 });

 const saveRecord = () => {
    setRecords((prevRecords) => [
      ...prevRecords,
      { ...timer },
    ]);
 };

 return (
    <div>
      <div>{timer.minutes.toString().padStart(2, '0')}:{timer.seconds.toString().padStart(2, '0')}:{timer.milliseconds.toString().padStart(3, '0')}</div>
      <button onClick={start}>Старт</button>
      <button onClick={stop}>Стоп</button>
      <button onClick={reset}>Сбросить</button>
      <button onClick={saveRecord}>Сохранить</button>
      <ul>
        {records.map((record, index) => (
          <li key={index}>
            {record.minutes.toString().padStart(2, '0')}:{record.seconds.toString().padStart(2, '0')}:{record.milliseconds.toString().padStart(3, '0')} 
          </li>
        ))}
      </ul>
    </div>
 );
};

export default Timer;