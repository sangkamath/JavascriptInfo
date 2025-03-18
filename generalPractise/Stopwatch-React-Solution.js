/*
body {
  font-family: sans-serif;
}

.wrapper {
  align-items: center;
  display: flex;
}

.time {
  align-items: baseline;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 16px;
  user-select: none;
}

.time-unit {
  font-size: 24px;
}

.time-number {
  font-size: 62px;
}

.time-number--small {
  font-size: 36px;
}

*/

import Stopwatch from './Stopwatch';

export default function App() {
  return (
    <div className="wrapper">
      <Stopwatch />
    </div>
  );
}

import { useRef, useState } from 'react';

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MS_IN_HOUR =
  MINUTES_IN_HOUR * SECONDS_IN_MINUTE * MS_IN_SECOND;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

//Used to break milliseconds into hours, minutes, seconds.
function formatTime(timeParam) {
  let time = timeParam;
  const parts = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    ms: 0,
  };
  if (time > MS_IN_HOUR) {
    parts.hours = Math.floor(time / MS_IN_HOUR);
    time %= MS_IN_HOUR;
  }

  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }

  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }

  parts.ms = time;

  return parts;
}

function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

export default function Stopwatch() {
  const lastTickTiming = useRef(null); //Stores the last recorded timestamp (does not trigger re-renders).
  const [totalDuration, setTotalDuration] = useState(0); //Stores elapsed time in milliseconds.
  // Timer ID of the active interval, if one is running.
  const [timerId, setTimerId] = useState(null); //Stores setInterval ID (if running).

  // Derived state to determine if there's a timer running.
  const isRunning = timerId != null;

  function startTimer() {
    lastTickTiming.current = Date.now();
    setTimerId(
      window.setInterval(() => {
        const now = Date.now();
        const timePassed = now - lastTickTiming.current;
        setTotalDuration(
          (duration) =>
            // Use the callback form of setState to ensure
            // we are using the latest value of duration.
            duration + timePassed,
        );
        lastTickTiming.current = now;
      }, 1),
    );
  }

  // Stops the running interval and clears timerId.
  function stopInterval() {
    window.clearInterval(timerId);
    setTimerId(null);
  }

  //Stops the timer and resets totalDuration to 0.
  function resetTimer() {
    stopInterval();
    setTotalDuration(0);
  }

  //Toggle Timer (Start/Stop)
  function toggleTimer() {
    if (isRunning) {
      stopInterval();
    } else {
      startTimer();
    }
  }

  //Calls formatTime(totalDuration) to convert milliseconds 
  // into hours, minutes, seconds.
  const formattedTime = formatTime(totalDuration);

  return (
    <div>
      <button
        className="time"
        onClick={() => {
          toggleTimer();
        }}>
        {formattedTime.hours > 0 && (
          <span>
            <span className="time-number">
              {formattedTime.hours}
            </span>
            <span className="time-unit">h</span>
          </span>
        )}{' '}
        {formattedTime.minutes > 0 && (
          <span>
            <span className="time-number">
              {formattedTime.minutes}
            </span>
            <span className="time-unit">m</span>
          </span>
        )}{' '}
        <span>
          <span className="time-number">
            {formattedTime.seconds}
          </span>
          <span className="time-unit">s</span>
        </span>{' '}
        <span className="time-number time-number--small">
          {padTwoDigit(Math.floor(formattedTime.ms / 10))}
        </span>
      </button>
      <div>
        <button
          onClick={() => {
            toggleTimer();
          }}>
          {isRunning ? 'Stop' : 'Start'}
        </button>{' '}
        <button
          onClick={() => {
            resetTimer();
          }}>
          Reset
        </button>
      </div>
    </div>
  );
}
