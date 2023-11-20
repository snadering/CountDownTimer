import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [initialTime, setInitialTime] = useState({ minutes: 0, seconds: 0 });
  const [time, setTime] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const handleInputChange = (e, key) => {
    setInitialTime((prevTime) => ({
      ...prevTime,
      [key]: parseInt(e.target.value, 10) || 0,
    }));
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds - 1;
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60);

          if (newMinutes === 0 && newSeconds === 0) {
            setIsRunning(false);
            clearInterval(interval);
            return { minutes: 0, seconds: 0 };
          }

          return {
            minutes: newMinutes,
            seconds: newSeconds >= 0 ? newSeconds % 60 : 59,
          };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning(true);
    setTime({ ...initialTime });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime({ minutes: 0, seconds: 0 });
    setInitialTime({minutes: 0, seconds: 0});
  };

  return (
    <div className="timer-container">
    <h1>Timer</h1>
    <div className="timer-display">
      <h2>
        {time.minutes !== undefined &&
          String(time.minutes).padStart(2, '0')} :{' '}
        {time.seconds !== undefined &&
          String(time.seconds).padStart(2, '0')}
      </h2>
    </div>
    <div className="input-container">
      <div className="input-group">
        <p>Minutes</p>
        <input
          onChange={(e) => handleInputChange(e, 'minutes')}
          type="number"
          placeholder="Minutes"
          min="0"
          max="59"
          id="minutes-input"
          value={initialTime.minutes}
        />
      </div>
      <div className="input-group">
        <p>Seconds</p>
        <input
          onChange={(e) => handleInputChange(e, 'seconds')}
          type="number"
          placeholder="Seconds"
          min="0"
          max="59"
          id="seconds-input"
          value={initialTime.seconds}
        />
      </div>
    </div>
    <div className="button-container">
      <button onClick={handleStart}>Start</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  </div>
  );
};

export default Timer;
