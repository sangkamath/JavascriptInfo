/*
body {
  font-family: sans-serif;
}

.wrapper {
  align-items: center;
  display: flex;
}

.accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.accordion-item {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  padding: 4px 0;
}

.accordion-item:not(:first-child) {
  border-top: 1px solid #eee;
}

.accordion-item-title {
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  padding: 4px;
  justify-content: space-between;
  text-align: start;
  display: flex;
}

.accordion-item-title:hover {
  background-color: #eee;
}

.accordion-icon {
  border: solid currentcolor;
  border-width: 0 2px 2px 0;
  display: inline-block;
  height: 8px;
  pointer-events: none;
  transform: translateY(-2px) rotate(45deg);
  width: 8px;
}

.accordion-icon--rotated {
  transform: translateY(2px) rotate(-135deg);
}

.accordion-item-contents {
  font-size: 14px;
  line-height: 1.2em;
  padding: 4px;
}

*/

import Accordion from './Accordion';

export default function App() {
  return (
    <div className="wrapper">
      <Accordion
        sections={[
          {
            value: 'html',
            title: 'HTML',
            contents:
              'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
          },
          {
            value: 'css',
            title: 'CSS',
            contents:
              'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
          },
          {
            value: 'javascript',
            title: 'JavaScript',
            contents:
              'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
          },
        ]}
      />
    </div>
  );
}


import { useId, useState } from 'react';

function getAccordionHeaderId(accordionId, value) {
  return accordionId + '-header-' + value;
}

function getAccordionPanelId(accordionId, value) {
  return accordionId + '-panel-' + value;
}

export default function Accordion({ sections }) {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(
    new Set(),
  );

  return (
    <div className="accordion">
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value);
        const headerId = getAccordionHeaderId(
          accordionId,
          value,
        );
        const panelId = getAccordionPanelId(
          accordionId,
          value,
        );

        return (
          <div className="accordion-item" key={value}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              id={headerId}
              className="accordion-item-title"
              type="button"
              onClick={() => {
                const newOpenSections = new Set(
                  openSections,
                );
                newOpenSections.has(value)
                  ? newOpenSections.delete(value)
                  : newOpenSections.add(value);
                setOpenSections(newOpenSections);
              }}>
              {title}{' '}
              <span
                aria-hidden={true}
                className={[
                  'accordion-icon',
                  isExpanded && 'accordion-icon--rotated',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>
            <div
              aria-labelledby={headerId}
              role="region"
              className="accordion-item-contents"
              id={panelId}
              hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
}
