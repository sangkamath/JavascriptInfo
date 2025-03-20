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

*/

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles.css";

function DropdownMenu({ position = "start" }) {
  const buttonRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [menuCoord, setMenuCoord] = useState(null);

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
              left:
                position === "start"
                  ? buttonEl.offsetLeft
                  : buttonEl.offsetLeft - buttonEl.offsetWidth
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
            className={["menu-list", position === "end" && "menu-list--end"]
              .filter(Boolean)
              .join(" ")}
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div>
        Left aligned menu <DropdownMenu position="start" />
      </div>
      <div style={{ textAlign: "end" }}>
        Right aligned menu <DropdownMenu position="end" />
      </div>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
}

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