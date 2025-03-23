/*

body {
  font-family: sans-serif;
}

.wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
}

.traffic-light-container {
  background-color: #000;
  border-radius: 8px;
  display: flex;
  padding: 8px;
  gap: 8px;
}

.traffic-light-container--vertical {
  flex-direction: column;
}

.traffic-light {
  --size: 50px;
  background-color: #555;
  border-radius: var(--size);
  height: var(--size);
  width: var(--size);
}
  */
import TrafficLight from './TrafficLight';

const config = {
  red: {
    backgroundColor: 'red',
    duration: 4000,
    next: 'green',
  },
  yellow: {
    backgroundColor: 'yellow',
    duration: 500,
    next: 'red',
  },
  green: {
    backgroundColor: 'green',
    duration: 3000,
    next: 'yellow',
  },
};

export default function App() {
  return (
    <div className="wrapper">
      <TrafficLight config={config} />
      <TrafficLight config={config} layout="horizontal" />
    </div>
  );
}

import { useEffect, useState } from 'react';

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

export default function TrafficLight({
  initialColor = 'green',
  config,
  layout = 'vertical',
}) {
  const [currentColor, setCurrentColor] =
    useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currentColor];

    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={[
        'traffic-light-container',
        layout === 'vertical' &&
          'traffic-light-container--vertical',
      ]
        .filter((cls) => !!cls)
        .join(' ')}>
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor
              ? config[color].backgroundColor
              : undefined
          }
        />
      ))}
    </div>
  );
}

