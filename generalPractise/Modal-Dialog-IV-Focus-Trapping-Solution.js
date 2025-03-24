/*
body {
  font-family: sans-serif;
}

input,
textarea {
  display: block;
  font-family: sans-serif;
  padding: 8px;
}

*:focus {
  outline: 2px solid red;
  outline-offset: 1px;
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

.contents {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
        title="Feedback"
        onClose={() => {
          setOpen(false);
        }}>
        <div className="contents">
          <div>
            Provide your feedback, we will get back in 3-5
            business days.
          </div>
          <input placeholder="john@gmail.com" />
          <textarea
            placeholder="Your message here"
            rows={5}></textarea>
          <button type="button">Submit</button>
        </div>
      </ModalDialog>
    </div>
  );
}

import {
  ComponentProps,
  RefObject,
  useEffect,
  useId,
  useRef,
} from 'react';
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

// * Invokes a function when a key is pressed.
function useOnKeyDown(
    key: string,
    fn: (event: KeyboardEvent) => void,
  ) {
    useEffect(() => {
      function onKeyDown(event: KeyboardEvent) {
        if (event.key === key) {
          fn(event);
        }
      }
  
      document.addEventListener('keydown', onKeyDown);
  
      return () => {
        document.removeEventListener('keydown', onKeyDown);
      };
    }, [fn]);
  }
  
   //* Invokes a function when clicking outside an element.
  function useOnClickOutside(
    elRef: RefObject<HTMLDivElement>,
    fn: () => void,
  ) {
    // Add event handling for close when clicking outside.
    useEffect(() => {
      function onClickOutside(
        event: MouseEvent | TouchEvent,
      ) {
        // No-op if clicked element is a descendant of element's contents.
        if (
          event.target instanceof Node &&
          elRef.current != null &&
          !elRef.current?.contains(event.target)
        ) {
          fn();
        }
      }
  
      document.addEventListener('mousedown', onClickOutside);
      document.addEventListener('touchstart', onClickOutside);
  
      return () => {
        document.removeEventListener(
          'mousedown',
          onClickOutside,
        );
        document.removeEventListener(
          'touchstart',
          onClickOutside,
        );
      };
    }, [fn]);
  }
  
  function getTabbableElements(
    elRef: RefObject<HTMLDivElement>,
  ) {
    if (elRef.current == null) {
      return [];
    }
  
    return elRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
  }
  
   //* Focus on the first tabbable element on mount.
  function useFocusOnFirstTabbableElement(
    elRef: RefObject<HTMLDivElement>,
  ) {
    useEffect(() => {
      const tabbableElements = getTabbableElements(elRef);
      const firstElement = tabbableElements[0];
      if (firstElement instanceof HTMLElement) {
        firstElement.focus();
      }
    }, []);
  }
  

   //* Trap focus within an element.
  function useFocusTrap(elRef: RefObject<HTMLDivElement>) {
    function trapFocus(event: KeyboardEvent) {
      if (elRef.current == null) {
        return;
      }
  
      const tabbableElements = getTabbableElements(elRef);
      const firstElement = tabbableElements[0];
      const lastElement =
        tabbableElements[tabbableElements.length - 1];
  
      if (event.shiftKey) {
        // Shift + Tab event
        if (
          document.activeElement === firstElement &&
          lastElement instanceof HTMLElement
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab event
        if (
          document.activeElement === lastElement &&
          firstElement instanceof HTMLElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  
    useOnKeyDown('Tab', trapFocus);
  }
  
  //  * Retain reference to trigger element and focus that element when closed.
  function useReturnFocusToTrigger() {
    const triggerElRef = useRef<Element | null>(null);
  
    useEffect(() => {
      // Save a reference to the focused element when mounted.
      triggerElRef.current = document.activeElement;
  
      return () => {
        if (triggerElRef.current instanceof HTMLElement) {
          // Focuses on element when unmounted.
          triggerElRef.current.focus();
        }
      };
    }, []);
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
    const dialogRef = useRef<HTMLDivElement>(null);
  
    // Closing-related hooks.
    useOnKeyDown('Escape', onClose);
    useOnClickOutside(dialogRef, onClose);
  
    // Focus-related hooks.
    useReturnFocusToTrigger(); // Has to be called before useFocusOnFirstTabbableElement otherwise the focus is lost.
    useFocusOnFirstTabbableElement(dialogRef);
    useFocusTrap(dialogRef);
  
    return createPortal(
      <div className="modal-overlay">
        <div
          aria-describedby={contentId}
          aria-labelledby={titleId}
          className="modal"
          role="dialog"
          ref={dialogRef}>
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