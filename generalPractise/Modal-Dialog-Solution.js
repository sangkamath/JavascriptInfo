/*
body {
  font-family: sans-serif;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7); // Dark background with 70% opacity 
  inset: 0;//Stretches the overlay to cover the entire screen
  position: fixed; //Keeps it positioned over everything else

  align-items: center;
  display: flex;
  justify-content: center; // Centers the modal 

  padding: 20px;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  background-color: white;
  padding: 24px;
}

.modal-title {
  margin: 0; //Removes default margin for the title inside the modal.
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

import './styles.css';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import { useState } from 'react';
import ModalDialog from './ModalDialog';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>
        Show modal
      </button>
      <ModalDialog
        open={open}
        title="Modal Title"
        onClose={() => {
          setOpen(false);
        }}>
        One morning, when Gregor Samsa woke from troubled
        dreams, he found himself transformed in his bed into
        a horrible vermin. He lay on his armour-like back,
        and if he lifted his head a little he could see his
        brown belly, slightly domed and divided by arches
        into stiff sections.
      </ModalDialog>
    </div>
  );
}

import { createPortal } from 'react-dom';

export default function ModalDialog({
  children,
  open = false,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  open?: boolean;
  title: string;
  onClose: () => void;
}>) {
  if (!open) {
    return null;// If modal is closed, render nothing
  }

  //Modals appear within the React component tree, potentially 
  // causing z-index issues and unexpected behaviors when 
  // nested inside other elements. Using createPortal:
  // Moves the modal outside of the main app to document.body.
  // Ensures the modal always appears above other content.
  // Prevents layout issues when nested deeply.
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h1 className="modal-title">{title}</h1>
        <div>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,// Portal renders modal outside of React's main tree
  );
}


*/