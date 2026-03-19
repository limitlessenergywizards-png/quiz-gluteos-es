import { useState, useEffect } from 'react';

export default function Timer({ initialSeconds, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }
    
    const intervalId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</>
  );
}
