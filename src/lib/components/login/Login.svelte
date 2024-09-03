<script>
  import { accessToken } from '../../../store';
  import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
  import '@shopify/shopify-api/adapters/node';

  const shopify = shopifyApi({
    apiKey: '620f7beb1ae387d8d6ab2f9b413c28db',
    apiSecretKey: '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',
    scopes: ['read_products', 'unauthenticated_read_customers'],
    isCustomStoreApp: true,
    //domain: 'playntradetest.myshopify.com',
    privateAppStorefrontAccessToken: 'e52747a7f34bb20083e17f94b797e444',

    //apiVersion: ApiVersion.July22,
    hostName: 'localhost:5175',
    adminApiAccessToken: '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'
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await client.authenticate({
        email,
        password
      });

      accessToken.set(response.access_token);
      localStorage.setItem('shopifyAccessToken', response.access_token);

      // Redirect to the desired page after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      // Handle authentication errors
    }
  };
</script>

<form on:submit={handleSubmit}>
  <label for="email">Email:</label>
  <input id="email" type="email" required />
  <label for="password">Password:</label>
  <input id="password" type="password" required />
  <button type="submit">Login</button>
</form>
