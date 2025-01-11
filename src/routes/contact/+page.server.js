import { json } from '@sveltejs/kit';
import { RESEND_API_KEY } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
  mail: async ({ request }) => {
    try {
      const data = await request.formData();
      const email = data.get('email');
      const name = data.get('name');
      const phone = data.get('phone');
      const subject = data.get('subject');
      const message = data.get('message');

      await sendEmail(email, name, phone, message, subject);

      return json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return json({
        message: 'Error sending email. Please try again later.',
        status: 500
      });
    }
  }
};

async function sendEmail(email, name, phone, message, subject) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: 'jarrod@gorhamwebconsulting.com',
      to: 'blackgandalf83@gmail.com',
      subject: subject,
      text: `
        Email: ${email}
        Name: ${name}
        Phone: ${phone}
        Message: ${message}
      `
      // You can also add an HTML version if needed:
      // html: `<h1>Hello!</h1><p>This is an HTML email.</p>`
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Resend error:', errorData);
    throw new Error('Failed to send email');
  }
}
