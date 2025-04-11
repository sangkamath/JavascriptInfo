/*
* {
  box-sizing: border-box;
  margin: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100vw;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.input-box {
  --size: 3rem;
  height: var(--size);
  width: var(--size);
  text-align: center;
  border: none;
  outline: none;
  background: #eee;
  font-weight: 600;
  font-size: 1.5rem;
}

.input-box::selection {
  background-color: #000;
  color: #fff;
}

.input-box:focus {
  color: #000;
  outline: 2px solid #000;
}

.input-box:disabled {
  cursor: not-allowed;
}

.button {
  border: 2px solid black;
  outline: none;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}

.button:focus {
  outline: 2px solid #000;
  outline-offset: 1px;
}

.button:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  transition: all 0.3s linear;
}

.button--primary {
  background-color: #000;
  color: #fff;
}

.button--secondary {
  background-color: transparent;
  color: black;
}

import { useState } from 'react';

import AuthCodeInput from './AuthCodeInput';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(code: string) {
    setIsSubmitting(true);
    fetch(
      'https://questions.greatfrontend.com/api/questions/auth-code-input',
      {
        method: 'POST',
        body: JSON.stringify({ otp: code }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((res) => res.text())
      .then((res) => alert(res))
      .catch(() =>
        alert(
          'Something went wrong. Please try again later.',
        ),
      )
      .finally(() => setIsSubmitting(false));
  }

  return (
    <AuthCodeInput
      length={6}
      onSubmit={onSubmit}
      isDisabled={isSubmitting}
    />
  );
}

export default App;

import { useState } from 'react';
import InputDigit from './InputDigit';

const singleNumRegex = /^\d$/;
const numRegex = /^\d+$/;

export default function AuthCodeInput({
  length,
  isDisabled = false,
  onSubmit,
}: Readonly<{
  length: number;
  isDisabled: boolean;
  onSubmit: (code: string) => void;
}>) {
  const [code, setCode] = useState(Array(length).fill(''));
  const [focusedIndex, setFocusedIndex] = useState(0);

  function clampIndex(index: number) {
    if (index <= 0) {
      return 0;
    }

    if (index >= length) {
      return length - 1;
    }

    return index;
  }

  function onFocus(index: number) {
    setFocusedIndex(index);
  }

  function onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    switch (event.key) {
      case 'ArrowLeft':
        setFocusedIndex(clampIndex(focusedIndex - 1));
        break;
      case 'ArrowRight':
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      case 'Backspace':
        if (code[index]) {
          setCode(
            code.map((codeDigit, idx) =>
              index === idx ? '' : codeDigit,
            ),
          );
        } else if (index - 1 >= 0) {
          setCode(
            code.map((codeDigit, idx) =>
              index - 1 === idx ? '' : codeDigit,
            ),
          );
          setFocusedIndex(clampIndex(index - 1));
        }
        break;
      default: {
        const value = event.key;
        if (!singleNumRegex.test(value)) {
          return;
        }

        setCode(
          code.map((codeDigit, idx) =>
            index === idx ? String(value) : codeDigit,
          ),
        );
        setFocusedIndex(clampIndex(focusedIndex + 1));
        break;
      }
    }
  }

  function onPaste(
    event: React.ClipboardEvent<HTMLInputElement>,
  ) {
    event.preventDefault();
    const pastedCode = event.clipboardData.getData('text');

    if (!numRegex.test(pastedCode)) {
      return;
    }

    setCode(
      code.map(
        (codeDigit, idx) => pastedCode[idx] ?? codeDigit,
      ),
    );
    setFocusedIndex(clampIndex(pastedCode.length));
  }

  function onReset() {
    setCode(Array(length).fill(''));
    setFocusedIndex(0);
  }

  const isSubmitEnabled = code.every((codeDigit) =>
    Boolean(codeDigit),
  );
  const isResetEnabled = code.some((codeDigit) =>
    Boolean(codeDigit),
  );

  return (
    <div className="wrapper">
      <form
        className="container"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(code.join(''));
        }}>
        <div className="flex-container">
          {code.map((codeDigit, index) => (
            <InputDigit
              key={index}
              value={codeDigit}
              isFocused={focusedIndex === index}
              disabled={isDisabled}
              onFocus={() => onFocus(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              onPaste={onPaste}
            />
          ))}
        </div>
        <div className="flex-container">
          <button
            type="reset"
            className="button button--secondary"
            disabled={!isResetEnabled || isDisabled}
            onClick={onReset}>
            Reset
          </button>
          <button
            type="submit"
            className="button button--primary"
            disabled={!isSubmitEnabled || isDisabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

import {
  InputHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

export default function InputDigit({
  value,
  isFocused,
  ...props
}: Readonly<{
  value: number;
  isFocused: boolean;
}> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      type="text"
      className="input-box"
      maxLength={1}
      inputMode="numeric"
      autoComplete="one-time-code"
      value={value}
      {...props}
    />
  );
}
*/