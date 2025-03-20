/*
.app {
  font-family: sans-serif;
  font-size: 12px;
}

.menu-list {
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 8px;
  width: 100px;
  position: absolute;
  text-align: left;
}

.menu-list--end {
  right: 0;
}
  */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

const BUTTON_MENU_SPACING = 4;

function Menu({ buttonEl }) {
  const menuRef = useRef();
  const [menuHeight, setMenuHeight] = useState(0);
  const [, setForceUpdate] = useState(0);

  // See https://beta.reactjs.org/reference/react/useLayoutEffect
  useLayoutEffect(() => {
    const { height } = menuRef.current?.getBoundingClientRect();
    setMenuHeight(height);
  }, []);

  function calculatePosition() {
    const windowHeight = window.innerHeight;
    const buttonElRect = buttonEl.getBoundingClientRect();

    const withinWindow =
      buttonElRect.y + buttonEl.offsetHeight + menuHeight < windowHeight;
    const coord = {
      top: withinWindow
        ? buttonEl.offsetTop + buttonEl.offsetHeight + BUTTON_MENU_SPACING
        : buttonEl.offsetTop - menuHeight - BUTTON_MENU_SPACING,
      left: buttonEl.offsetLeft
    };

    return coord;
  }

  useEffect(() => {
    function updateMenuPosition() {
      setForceUpdate((count) => count + 1);
    }

    // Debounce the listener for better
    // scroll performance.
    // Should also listen for window resize events.
    window.addEventListener("scroll", updateMenuPosition);

    return () => {
      window.removeEventListener("scroll", updateMenuPosition);
    };
  }, []);

  const menuCoord = calculatePosition();

  return createPortal(
    <div
      ref={menuRef}
      className="menu-list"
      role="menu"
      style={{
        top: menuCoord?.top,
        left: menuCoord?.left
      }}
    >
      <div>New File</div>
      <div>Save</div>
      <div>Delete</div>
    </div>,
    document.querySelector("body")
  );
}

function DropdownMenu() {
  const buttonRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Actions
      </button>
      {isOpen && <Menu buttonEl={buttonRef.current} />}
    </>
  );
}

export default function App() {
  return (
    <div className="app">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <DropdownMenu position="start" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>
  );
}
