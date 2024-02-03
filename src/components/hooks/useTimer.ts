import { useState, useEffect } from 'react';


const useTimer = () => {
  const [time, setTime] = useState(0);
  const [intervalRef, setIntervalRef] = useState(0);

  const increaseTime = () => setTime(oldTime => oldTime + 1)

  const startTimer = () => {
    setTime(0);
    const intervalRef = setInterval(increaseTime, 1000);
    setIntervalRef(intervalRef)
  }

  const endTimer = () => {
    clearInterval(intervalRef);
  }

  useEffect(() => {
    return () => {
      clearInterval(intervalRef);
    }
  }, []);

  return [time, startTimer, endTimer] as const;
}

export default useTimer;