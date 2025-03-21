/*
body {
  font-family: sans-serif;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tabs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tabs-list {
  display: flex;
  gap: 6px;
}

.tabs-list-item {
  --active-color: blueviolet;

  background: none;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 10px;
}

.tabs-list-item:hover {
  border-color: var(--active-color);
  color: var(--active-color);
}

.tabs-list-item--active,
.tabs-list-item--active:hover {
  border-color: var(--active-color);
  background-color: var(--active-color);
  color: #fff;
}
*/

import Tabs from './Tabs';

export default function App() {
  return (
    <div className="wrapper">
      <button>A focusable element</button>
      <Tabs
        items={[
          {
            value: 'html',
            label: 'HTML',
            panel:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            label: 'CSS',
            panel:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            label: 'JavaScript',
            panel:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
      />
      <button>Some other focusable element</button>
    </div>
  );
}

import { useId, useState } from 'react';

function getTabListItemId(tabsId, value) {
  return tabsId + '-tab-' + value;
}

function getTabPanelId(tabsId, value) {
  return tabsId + '-tabpanel-' + value;
}

export default function Tabs({ defaultValue, items }) {
  const tabsId = useId();
  const [value, setValue] = useState(
    defaultValue ?? items[0].value,
  );

  function setValueViaIndex(index) {
    const newValue = items[index].value;
    setValue(newValue);
    document
      .getElementById(getTabListItemId(tabsId, newValue))
      .focus();
  }

  return (
    <div className="tabs">
      <div
        className="tabs-list"
        role="tablist"
        onKeyDown={(event) => {
          switch (event.code) {
            case 'ArrowLeft': {
              const index = items.findIndex(
                ({ value: itemValue }) =>
                  itemValue === value,
              );
              setValueViaIndex(
                // Use modulo to wrap around to the end if necessary.
                (index - 1 + items.length) % items.length,
              );
              break;
            }
            case 'ArrowRight': {
              const index = items.findIndex(
                ({ value: itemValue }) =>
                  itemValue === value,
              );
              // Use modulo to wrap around to the start if necessary.
              setValueViaIndex((index + 1) % items.length);
              break;
            }
            case 'Home': {
              // Set the first item ias the active item.
              setValueViaIndex(0);
              break;
            }
            case 'End': {
              // Set the last item ias the active item.
              setValueViaIndex(items.length - 1);
              break;
            }
            default:
              break;
          }
        }}>
        {items.map(({ label, value: itemValue }) => {
          const isActiveValue = itemValue === value;

          return (
            <button
              id={getTabListItemId(tabsId, itemValue)}
              key={itemValue}
              type="button"
              className={[
                'tabs-list-item',
                isActiveValue && 'tabs-list-item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                setValue(itemValue);
              }}
              role="tab"
              tabIndex={isActiveValue ? 0 : -1}
              aria-controls={getTabPanelId(
                tabsId,
                itemValue,
              )}
              aria-selected={isActiveValue}>
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {items.map(({ panel, value: itemValue }) => (
          <div
            key={itemValue}
            tabIndex={0}
            id={getTabPanelId(tabsId, itemValue)}
            aria-labelledby={getTabListItemId(
              tabsId,
              itemValue,
            )}
            role="tabpanel"
            hidden={itemValue !== value}>
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}
