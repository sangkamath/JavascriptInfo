/*
body {
  font-family: sans-serif;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.transfer-list {
  border: 1px solid #ccc;
  display: flex;
  max-width: 768px;
  margin: 0 auto;
}

.transfer-list__section {
  padding: 20px;
  flex-grow: 1;
}

.transfer-list__section__items {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.transfer-list__section__items__item {
  display: flex;
  gap: 8px;
}

.transfer-list__actions {
  border-color: #ccc;
  border-width: 0 1px 0 1px;
  border-style: solid;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  row-gap: 12px;
}

*/

import { useId, useState } from 'react';

//Displays a label and checkbox
//The onChange prop handles checkbox selection
function CheckboxItem({ onChange, label, checked }) {
  // Let React generate a unique ID for each item so as to maximize
  // reusability of the component.
  const id = useId();

  return (
    <div className="transfer-list__section__items__item">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

//Loops through items, displaying checkbox for each one
//items is a Map, keys are labels and values are booleans(checked or not)
//When clicked, checkbox toggles its checked state
function ItemList({ items, setItems }) {
  return (
    <div className="transfer-list__section">
      <ul className="transfer-list__section__items">
        {Array.from(items.entries()).map(
          ([label, checked]) => (
            <li key={label}>
              <CheckboxItem
                label={label}
                checked={checked}
                onChange={() => {
                  const newItems = new Map(items);
                  newItems.set(label, !items.get(label));
                  setItems(newItems);
                }}
              />
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

const DEFAULT_ITEMS_LEFT = [
  'HTML',
  'JavaScript',
  'CSS',
  'TypeScript',
];
const DEFAULT_ITEMS_RIGHT = [
  'React',
  'Angular',
  'Vue',
  'Svelte',
];

// Convert the default array of items into a map with the item
// name as a key and the value as a boolean.
function generateItemsMap(items) {
  return new Map(items.map((label) => [label, false]));
}

// Determine if the list has no selected items.
function hasNoSelectedItems(items) {
  return (
    Array.from(items.values()).filter((val) => Boolean(val))
      .length === 0
  );
}

// Transfer all items from a source list to a destination list.
function transferAllItems(
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst,
) {
  setItemsDst(new Map([...itemsDst, ...itemsSrc]));
  setItemsSrc(new Map());
}

// Transfer selected items from a source list to a destination list.
function transferSelectedItems(
  itemsSrc,
  setItemsSrc,
  itemsDst,
  setItemsDst,
) {
  const newItemsSrc = new Map(itemsSrc);
  const newItemsDst = new Map(itemsDst);

  // Remove selected items from source list and add to the destination list.
  itemsSrc.forEach((value, key) => {
    if (!value) {
      return;
    }

    newItemsDst.set(key, value);
    newItemsSrc.delete(key);
  });
  setItemsSrc(newItemsSrc);
  setItemsDst(newItemsDst);
}

export default function App() {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT),
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT),
  );

  return (
    <div className="transfer-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfer-list__actions">
        <button
          aria-label="Transfer all items to left list"
          disabled={itemsRight.size === 0}
          onClick={() => {
            transferAllItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft,
            );
          }}>
          <span aria-hidden={true}>&lt;&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to left list"
          disabled={hasNoSelectedItems(itemsRight)}
          onClick={() => {
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft,
            );
          }}>
          <span aria-hidden={true}>&lt;</span>
        </button>
        <button
          aria-label="Transfer selected items to right list"
          disabled={hasNoSelectedItems(itemsLeft)}
          onClick={() => {
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            );
          }}>
          <span aria-hidden={true}>&gt;</span>
        </button>
        <button
          aria-label="Transfer all items to right list"
          disabled={itemsLeft.size === 0}
          onClick={() => {
            transferAllItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            );
          }}>
          <span aria-hidden={true}>&gt;&gt;</span>
        </button>
      </div>
      <ItemList
        items={itemsRight}
        setItems={setItemsRight}
      />
    </div>
  );
}

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
