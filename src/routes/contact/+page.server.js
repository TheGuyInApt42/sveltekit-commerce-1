import sgMail from '@sendgrid/mail';
import { json } from '@sveltejs/kit';
import { SENDGRID_KEY } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
  mail: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');
    const name = data.get('name');
    const phone = data.get('phone');
    const subject = data.get('subject');
    const message = data.get('message');

    let sendMsg = sendEmail(email, name, phone, message, subject);

    return {
      success: true
    };

    //return {success: true};
  }
};

//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email, name, phone, message, subject) {
  sgMail.setApiKey(SENDGRID_KEY);
  const template = `
		Email: ${email}
		Name: ${name}
		Phone: ${phone}
		Message: ${message}
					`;
  const msg = {
    to: 'tremaineg@pntmail.com', // Change to your recipient
    from: 'jarrod@gorhamwebconsulting.com', // Change to your verified sender
    subject: subject,
    text: template
    //html: '<strong>and easy to do anywhere, even with Node.js</strong>'
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      return json({
        message: 'success'
      });
    })
    .catch((error) => {
      console.error(error);
      return json({
        message: 'failed',
        status: 404
      });
    });
}
