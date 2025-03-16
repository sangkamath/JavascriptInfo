import { useState } from "react";
import "./styles.css";

/*
body {
  font-family: sans-serif;
}

.row {
  display: flex;
  flex-direction: row;
}

.square {
  border: 1px solid black;
  height: 60px;
  width: 60px;
  display: flex;
 justify-content: center;
 align-items: center;
 font-size: 30px;
}

*/

const Square = function ({ value, onClickBoardSpot }) {
  return (
    <div onClick={onClickBoardSpot} className="square">
      {value}
    </div>
  );
};

const checkWinner = function (board) {
  const winStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]];

  for(var i = 0; i < winStates.length; i++) {
    const [a, b,c] = winStates[i];
    if(board[a] != "" && board[a] === board[b] && board[b] === board[c]) {
      return true;
    }
  }

  return false;
};

export default function App() {
  const [message, setMessage] = useState("Hello World!");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("O");

  function setBoardSpot(index) {
    if(board[index] === "") return;
    const newBoard = board;
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    if(checkWinner(newBoard)){
      const messageWins = "Player " + currentPlayer + " wins!";
      setMessage(messageWins);
      return;
    }
    const nextPlayer = currentPlayer === "O" ? "X" : "O";
    setCurrentPlayer(nextPlayer);
  }

  function reset() {
    const emptyArray = Array(9).fill("");
    setBoard(emptyArray);
    setCurrentPlayer("O");
    setMessage("");
  }

  return (
    <div>
      <h1>{message}</h1>
      <div className="row">
        <Square value={board[0]} onClickBoardSpot={() => setBoardSpot(0)} />
        <Square value={board[1]} onClickBoardSpot={() => setBoardSpot(1)} />
        <Square value={board[2]} onClickBoardSpot={() => setBoardSpot(2)} />
      </div>
      <div className="row">
        <Square value={board[3]} onClickBoardSpot={() => setBoardSpot(3)} />
        <Square value={board[4]} onClickBoardSpot={() => setBoardSpot(4)} />
        <Square value={board[5]} onClickBoardSpot={() => setBoardSpot(5)} />
      </div>
      <div className="row">
        <Square value={board[6]} onClickBoardSpot={() => setBoardSpot(6)} />
        <Square value={board[7]} onClickBoardSpot={() => setBoardSpot(7)} />
        <Square value={board[8]} onClickBoardSpot={() => setBoardSpot(8)} />
      </div>
      <div>
        <br />
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

/*
body {
  font-family: sans-serif;
}

.app {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 320px;
  margin: 0 auto;
  row-gap: 16px;
}

.board {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
}

.cell {
  background-color: #fff;
  border: 1px solid #ccc;
  color: #000;
  font-size: min(48px, 10vw);
  font-weight: bold;
  vertical-align: middle;
  aspect-ratio: 1 / 1;
}

.cell:not(:disabled) {
  cursor: pointer;
}

.cell:not(:disabled):hover {
  background-color: #fafafa;
}
*/

import { useState } from 'react';

// List of cell indices that are 3-in-a-row.
const CELLS_IN_A_LINE = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Determine if there's a winner for the board.
function determineWinner(board) {
  for (let i = 0; i < CELLS_IN_A_LINE.length; i++) {
    const [x, y, z] = CELLS_IN_A_LINE[i];
    // Determine if the cells in a line have the same mark.
    if (
      board[x] != null &&
      board[x] === board[y] &&
      board[y] === board[z]
    ) {
      return board[x];
    }
  }

  // No winner yet.
  return null;
}

function Cell({ index, disabled, mark, turn, onClick }) {
  return (
    <button
      aria-label={
        mark == null
          ? `Mark cell ${index} as ${turn}`
          : undefined
      }
      className="cell"
      disabled={disabled}
      onClick={onClick}>
      <span aria-hidden={true}>{mark}</span>
    </button>
  );
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setIsXPlaying] = useState(true);

  const winner = determineWinner(board);

  function onReset() {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  }

  function getStatusMessage() {
    if (winner != null) {
      return `Player ${winner} wins!`;
    }

    // All cells have been filled up.
    if (!board.includes(null)) {
      return `It's a draw!`;
    }

    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  }

  return (
    <div className="app">
      <div aria-live="polite">{getStatusMessage()}</div>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => index)
          .map((cellIndex) => {
            const turn = xIsPlaying ? 'X' : 'O';
            return (
              <Cell
                key={cellIndex}
                disabled={
                  board[cellIndex] != null || winner != null
                }
                index={cellIndex}
                mark={board[cellIndex]}
                turn={turn}
                onClick={() => {
                  const newBoard = board.slice();
                  newBoard[cellIndex] = turn;
                  setBoard(newBoard);
                  setIsXPlaying(!xIsPlaying);
                }}
              />
            );
          })}
      </div>
      <button
        onClick={() => {
          if (winner == null) {
            // Confirm whether to reset the game.
            const confirm = window.confirm(
              'Are you sure you want to reset the game?',
            );
            if (!confirm) {
              return;
            }
          }

          onReset();
        }}>
        Reset
      </button>
    </div>
  );
}