/*
body {
  font-family: sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

label {
  font-size: 12px;
}

input,
textarea {
  display: block;
}
*/

const SUBMIT_URL =
    'https://www.greatfrontend.com/api/questions/contact-form';

export default async function submitForm(event) {
    event.preventDefault();
    const form = event.target;

    try {
        if (form.action !== SUBMIT_URL) {
            alert('Incorrect form action value');
            return;
        }

        if (form.method.toLowerCase() !== 'post') {
            alert('Incorrect form method value');
            return;
        }

        const formData = new FormData(form);
        const response = await fetch(SUBMIT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
            }),
        });

        const text = await response.text();
        alert(text);
    } catch (_) {
        alert('Error submitting form!');
    }
}

import submitForm from './submitForm';

export default function App() {
    return (
        <form
            // Ignore the onSubmit prop, it's used by GFE to
            // intercept the form submit event to check your solution.
            onSubmit={submitForm}
            action="https://www.greatfrontend.com/api/questions/contact-form"
            method="post">
            <div>
                <label htmlFor="name-input">Name</label>
                <input id="name-input" name="name" type="text" />
            </div>
            <div>
                <label htmlFor="email-input">Email</label>
                <input id="email-input" name="email" type="email" />
            </div>
            <div>
                <label htmlFor="message-input">Message</label>
                <textarea
                    id="message-input"
                    name="message"></textarea>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}
