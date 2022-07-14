import type { FC } from 'react';
import { useState } from 'react';

export const ClickSpeedChecker: FC = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [resultTime, setResultTime] = useState<number | null>(null);
  const [clickCount, setClickCount] = useState<number>(50);

  return (
    <>
      <h1>Click Speed Checker</h1>
      <button
        onClick={() => {
          setStartTime(null);
          setResultTime(null);
          setClickCount(50);
        }}
      >
        reset
      </button>

      <p>limit: {clickCount}click</p>

      <button
        onClick={() => {
          if (!startTime) setStartTime(Date.now());
          setClickCount((b) => {
            if (b <= 0) {
              setResultTime((b) =>
                !b ? (Date.now() - (startTime ?? Date.now())) / 1000 : b,
              );
              return b;
            } else {
              return b - 1;
            }
          });
        }}
        className='h-36 w-36 bg-slate-300'
      ></button>

      {resultTime && <p>Result:{resultTime} s</p>}
    </>
  );
};
