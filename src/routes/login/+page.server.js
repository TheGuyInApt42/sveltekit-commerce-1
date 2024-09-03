import { loginCustomer } from '$utils/shopify';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function load({ url, fetch }) {
  const response = await fetch('/api/shop');
  const data = await response.json();
  console.log('data: ', data);

  // Return the fetched data as props to the component
  return {
    props: {
      data: data.shop
    }
  };
}
