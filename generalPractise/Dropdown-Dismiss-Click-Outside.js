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
  margin-top: 4px;
  text-align: left;
}

.menu-list--end {
  right: 0;
}
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
  margin-top: 4px;
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

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

function DropdownMenu() {
  const buttonRef = useRef();
  const menuRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoord, setMenuCoord] = useState(null);

  function clickOutsideListener(event) {
    // Clicked element is a descendant of
    // the menu or button.
    if (
      buttonRef.current?.contains(event.target) ||
      menuRef.current == null ||
      menuRef.current?.contains(event.target)
    ) {
      return;
    }

    setIsOpen(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickOutsideListener);
    document.addEventListener("touchstart", clickOutsideListener);

    return () => {
      document.removeEventListener("mousedown", clickOutsideListener);
      document.removeEventListener("touchstart", clickOutsideListener);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            const buttonEl = buttonRef.current;
            const coord = {
              top: buttonEl.offsetTop + buttonEl.offsetHeight,
              left: buttonEl.offsetLeft
            };
            setMenuCoord(coord);
          } else {
            setMenuCoord(null);
          }
        }}
      >
        Actions
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="menu-list"
            role="menu"
            style={{
              top: menuCoord.top,
              left: menuCoord.left
            }}
          >
            <div>New File</div>
            <div>Save</div>
            <div>Delete</div>
          </div>,
          document.querySelector("body")
        )}
    </>
  );
}

export default function App() {
  return (
    <div className="app">
      <DropdownMenu position="start" />
    </div>
  );
}
