/*
body {
  font-family: sans-serif;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  position: fixed;

  align-items: center;
  display: flex;
  justify-content: center;

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
  margin: 0;
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

import { ComponentProps, useId } from 'react';
import { createPortal } from 'react-dom';

export default function ModalDialog({
  open = false,
  ...props
}: Readonly<{
  open?: boolean;
}> &
  ComponentProps<typeof ModalDialogImpl>) {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

function ModalDialogImpl({
  children,
  title,
  onClose,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}>) {
  const titleId = useId();
  const contentId = useId();

  return createPortal(
    <div className="modal-overlay">
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className="modal"
        role="dialog">
        <h1 className="modal-title" id={titleId}>
          {title}
        </h1>
        <div id={contentId}>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body,
  );
}


*/