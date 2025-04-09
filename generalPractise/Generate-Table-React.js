/*

 body {
            font-family: sans-serif;
        }

        .app {
            align-items: center;
            display: flex;
            font-size: 12px;
            flex-direction: column;
            gap: 16px;
            justify-content: center;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        label + input {
            margin-left: 8px;
        }

        table {
            border-collapse: collapse;
        }

        table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
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

import { useState } from "react";

function DataTable({ table }) {
  if (!table || table.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        {table.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((column, colIndex) => (
              <td key={colIndex}>{column}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState(null);
  const [columns, setColumns] = useState(null);
  const [table, setTable] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const table = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => 0),
    );
    for (let col = 0; col < columns; col++) {
      for (let row = 0; row < rows; row++) {
        const value =
          col % 2 === 0 ? rows * col + (row + 1) : rows * (col + 1) - row;
        table[row][col] = value;
      }
    }
    setTable(table);
    console.log(table);
  };

  return (
    <div class="app">
      <form id="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input
            id="rows"
            name="rows"
            type="number"
            min="1"
            onChange={(event) => {
              setRows(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input
            id="columns"
            name="columns"
            type="number"
            min="1"
            onChange={(event) => {
              setColumns(event.target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div id="table-container">
        <DataTable table={table} />
      </div>
    </div>
  );
}

import { useState } from 'react';

function Table({ rows, columns }) {
  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, () => 0).map(
          (_, row) => (
            <tr key={row}>
              {Array.from({ length: columns }, () => 0).map(
                (_, col) => (
                  <td key={col}>
                    {col % 2 === 0
                      ? rows * col + (row + 1)
                      : rows * (col + 1) - row}
                  </td>
                ),
              )}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

export default function App() {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');

  return (
    <div className="app">
      <form
        onSubmit={(event) => {
          // To prevent a page reload.
          event.preventDefault();

          // Obtain data from the form.
          const data = new FormData(event.target);
          const rows = data.get('rows');
          setRows(Number(rows));
          const columns = data.get('columns');
          setColumns(Number(columns));
        }}>
        <div>
          <label htmlFor="rows">Rows</label>
          <input
            id="rows"
            name="rows"
            type="number"
            min={1}
            defaultValue={rows}
          />
        </div>
        <div>
          <label htmlFor="columns">Columns</label>
          <input
            id="columns"
            name="columns"
            type="number"
            min={1}
            defaultValue={columns}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {Boolean(rows) && Boolean(columns) && (
        <Table rows={rows} columns={columns} />
      )}
    </div>
  );
}

