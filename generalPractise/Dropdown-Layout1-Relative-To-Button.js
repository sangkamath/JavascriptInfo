/*
.app {
  font-family: sans-serif;
  font-size: 12px;
}

.dropdown-menu {
  display: inline-block;
  font-size: 12px;
  position: relative;
}

.menu-list {
  background-color: #fff;
  border: 1px solid #ccc;
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

import { useState } from "react";
import "./styles.css";

function DropdownMenu({ position }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown-menu">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Actions
      </button>
      {isOpen && (
        <div
          className={["menu-list", position === "end" && "menu-list--end"]
            .filter(Boolean)
            .join(" ")}
          role="menu"
        >
          <div>New File</div>
          <div>Save</div>
          <div>Delete</div>
        </div>
      )}
    </div>
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
