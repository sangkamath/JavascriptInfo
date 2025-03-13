/*
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
*/

import ProgressBar from './ProgressBar';

export default function App() {
  return (
    <div className="wrapper">
      <ProgressBar value={0} />
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
      <ProgressBar value={2} />
      <ProgressBar value={-10} />
      <ProgressBar value={120} />
    </div>
  );
}

const MIN = 0;
const MAX = 100;

export default function ProgressBar({ value }) {
  // Handle invalid values and convert them to be within [0, 100].
  const clampedValue = Math.min(Math.max(value, MIN), MAX);

  return (
    <div className="progress">
      <div
        className="progress-bar"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={MIN}
        aria-valuemax={MAX}>
        {clampedValue}%
      </div>
    </div>
  );
}

/*
body {
  font-family: sans-serif;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress {
  background-color: rgb(233, 236, 239);
  border: 1px solid #c5c5c5;
  border-radius: 8px;
  height: 20px;
  overflow: hidden;
}

.progress-bar {
  background-color: #0d6efd;
  color: #fff;
  height: 100%;
  overflow: hidden;
  text-align: center;
}

*/