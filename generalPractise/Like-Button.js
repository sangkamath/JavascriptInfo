import { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icons';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export default function App() {
  // Determines if the button is in the default/liked state.
  const [liked, setLiked] = useState(false);
  // Whether there's a pending background API request.
  const [isPending, setIsPending] = useState(false);
  // Error message to be shown if the API request failed.
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        'https://www.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        },
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="button-container">
      <button
        className={classNames(
          'like-button',
          liked
            ? 'like-button--liked'
            : 'like-button--default',
        )}
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}>
        {isPending ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? 'Liked' : 'Like'}
      </button>
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}

/*
body {
  font-family: sans-serif;
}

.error-message {
  font-size: 12px;
  margin-top: 8px;
}

.like-button {
  --default-color: #888;
  --active-color: red;

  align-items: center;
  border-style: solid;
  border-radius: 32px;
  border-width: 2px;
  display: flex;
  cursor: pointer;
  font-weight: bold;
  gap: 8px;
  height: 32px;
  padding: 4px 8px;
}

.like-button--default {
  background-color: #fff;
  border-color: var(--default-color);
  color: var(--default-color);
}

.like-button:hover {
  border-color: var(--active-color);
  color: var(--active-color);
}

.like-button--liked,
.like-button--liked:hover {
  background-color: var(--active-color);
  border-color: var(--active-color);
  color: #fff;
}

.like-button-icon {
  display: flex;
}
*/
