/*
body {
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  margin: 0;
  min-height: 100vh;
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

header,
nav,
main,
aside,
footer {
  padding: 12px;
  text-align: center;
}

header {
  background-color: tomato;
  height: 60px;
}

.columns {
  display: flex;
  flex-grow: 1;
}

nav {
  background-color: coral;
  flex-shrink: 0;
  width: 100px;
}

main {
  background-color: moccasin;
  flex-grow: 1;
}

aside {
  background-color: sandybrown;
  flex-shrink: 0;
  width: 100px;
}

footer {
  background-color: slategray;
  height: 100px;
}
*/

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

export default function App() {
    return (
      <>
        <header>Header</header>
        <div className="columns">
          <nav>Navigation</nav>
          <main>Main</main>
          <aside>Sidebar</aside>
        </div>
        <footer>Footer</footer>
      </>
    );
  }
  
