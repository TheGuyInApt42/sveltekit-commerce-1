import { Klaviyo } from 'klaviyo-api';

export async function load({ request, context }) {
  const data = context.data;
  const email = data.email;

  const klaviyo = new Klaviyo('VdFLP5'); // Replace with your Klaviyo API key

  try {
    const response = await klaviyo.lists('R2qddQ').subscribe({
      email: email
    });

    if (response.status === 200) {
      // Handle successful subscription
      return {
        status: 200,
        body: {
          success: 'You have successfully subscribed to our newsletter'
        }
      };
    } else {
      // Handle error
      return {
        status: 500,
        body: {
          error: 'An error occurred while subscribing'
        }
      };
    }
  } catch (error) {
    // Handle other errors
    return {
      status: 500,
      body: {
        error: 'An error occurred while subscribing'
      }
    };
  }
}
