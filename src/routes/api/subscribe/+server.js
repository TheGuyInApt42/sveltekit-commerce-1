import { json } from '@sveltejs/kit';
import { profile } from 'console';

export async function POST({ request }) {
  const { email } = await request.json();

  if (!email) {
    return json({ error: 'Email is required' }, { status: 400 });
  }

  const apiKey = 'VdFLP5';
  const listId = 'R2qddQ';
  const privateKey = 'pk_b7bbd6f4bec5178ffe26745a0614b2d6bb';

  /*   try {
    const response = await fetch(`https://a.klaviyo.com/api/v2/list/${listId}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Klaviyo-API-Key ${apiKey}`
      },
      body: JSON.stringify({
        profiles: [{ email }]
      })
    });

    console.log(await response.json());

    if (response.ok) {
      return json(
        { success: 'You have successfully subscribed to our newsletter' },
        { status: 200 }
      );
    } else {
      const error = await response.json();
      return json(
        { error: error.error || 'An error occurred while subscribing' },
        { status: response.status }
      );
    }
  } catch (error) {
    return json({ error: 'An error occurred while subscribing' }, { status: 500 });
  }
} */

  try {
    const url = `https://a.klaviyo.com/client/subscriptions/?company_id=${apiKey}`;
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        revision: '2024-07-15',
        'content-type': 'application/json',
        Authorization: `Klaviyo-API-Key ${privateKey}`
      },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            profile: {
              data: {
                type: 'profile'
              }
            },
            custom_source: 'Website Form',
            profile: {
              email: email
            }
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: listId
              }
            }
          }
        }
      })
    };

    const response = await fetch(url, options);
    // Log the response status and headers
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));

    // Try to get the response text
    const responseText = await response.text();
    console.log('Response text:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return json({ success: false, error: 'Invalid JSON response from API' }, { status: 500 });
    }

    if (response.ok) {
      return json({ success: true, data: result });
    } else {
      return json({ success: false, error: result }, { status: response.status });
    }
  } catch (error) {
    console.error('Bulk subscribe error:', error);
    return json({ success: false, error: 'An unexpected error occurred' }, { status: 500 });
  }
}
