/**
 * Sends a fetch request to Shopify's Storefront API.
 *
 * @param {object} options - Fetch options including the query and variables.
 * @returns {Promise<object>} - Promise resolving to the API response.
 */
export async function shopifyFetch({ query, variables }) {
  const endpoint = 'https://playntradetest.myshopify.com/api/2024-04/graphql.json';
  const key = 'e52747a7f34bb20083e17f94b797e444';

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: { query, variables } && JSON.stringify({ query, variables })
    });

    return {
      status: result.status,
      body: await result.json()
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      status: 500,
      error: 'Error receiving data'
    };
  }
}

export async function getAllProducts() {
  const query = `{
      products(sortKey: TITLE, first: 100) {
          edges{
            node {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                    id
                    name
                    values
                }
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                variants(first: 250) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                            id
                            title
                            sku
                            availableForSale
                            requiresShipping
                            selectedOptions {
                                name
                                value
                            }
                            priceV2 {
                                amount
                                currencyCode
                            }
                            compareAtPriceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                images(first: 20) {
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    edges {
                        node {
                        originalSrc
                        altText
                        width
                        height
                        }
                    }
                }
            }
        }
      }
    }`;

  return shopifyFetch({
    query: query
  });
}

export async function getAllCollections() {
  return shopifyFetch({
    query: `{
        collections(first: 100) {
             edges {
                node {
                    handle
                    products(
                        first: 100,
                        sortKey: TITLE

                    ) {
                        edges{
                            node {
                                id
                                handle
                                availableForSale
                                title
                                description
                                descriptionHtml
                                options {
                                    id
                                    name
                                    values
                                }
                                priceRange {
                                    maxVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 250) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            id
                                            title
                                            sku
                                            availableForSale
                                            requiresShipping
                                            selectedOptions {
                                                name
                                                value
                                            }
                                            priceV2 {
                                                amount
                                                currencyCode
                                            }
                                            compareAtPriceV2 {
                                                amount
                                                currencyCode
                                            }
                                        }
                                    }
                                }
                                images(first: 20) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            originalSrc
                                            altText
                                            width
                                            height
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }`
  });
}

export async function loadCart(cartId) {
  return shopifyFetch({
    query: `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            checkoutUrl
              estimatedCost {
                  totalAmount {
                  amount
                  }
              }
              lines(first: 100) {
                  edges {
                  node {
                      id
                      quantity
                      estimatedCost {
                      subtotalAmount {
                          amount
                          currencyCode
                      }
                      totalAmount {
                          amount
                          currencyCode
                      }
                      }
                      merchandise {
                      ... on ProductVariant {
                          id
                          title
                          product {
                              images(first: 1) {
                                  edges {
                                    node {
                                      originalSrc
                                      altText
                                      width
                                      height
                                    }
                                  }
                                }
                              title
                          }
                      }
                      }
                  }
                  }
              }
            }
        }
      `,
    variables: { cartId }
  });
}

export async function getProduct(handle) {
  return shopifyFetch({
    query: ` 
        query getProduct($handle: String!) {
            productByHandle(handle: $handle) {
                id
                handle
                availableForSale
                title
                description
                descriptionHtml
                options {
                id
                name
                values
                }
                priceRange {
                maxVariantPrice {
                    amount
                    currencyCode
                }
                minVariantPrice {
                    amount
                    currencyCode
                }
                }
                variants(first: 250) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    id
                    title
                    sku
                    availableForSale
                    requiresShipping
                    selectedOptions {
                        name
                        value
                    }
                    priceV2 {
                        amount
                        currencyCode
                    }
                    compareAtPriceV2 {
                        amount
                        currencyCode
                    }
                    }
                }
                }
                images(first: 20) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                    originalSrc
                    altText
                    width
                    height
                    }
                }
                }
            }
        }
    `,
    variables: {
      handle
    }
  });
}

export async function createCart() {
  return shopifyFetch({
    query: `
      mutation calculateCart($lineItems: [CartLineInput!]) {
        cartCreate(input: { lines: $lineItems }) {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    variables: {}
  });
}

export async function updateCart({ cartId, lineId, variantId, quantity }) {
  return shopifyFetch({
    query: `
      mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      cartId: cartId,
      lines: [
        {
          id: lineId,
          merchandiseId: variantId,
          quantity: quantity
        }
      ]
    }
  });
}

export async function addToCart({ cartId, variantId }) {
  return shopifyFetch({
    query: `
      mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,

    variables: {
      cartId: cartId,
      lines: [
        {
          merchandiseId: variantId,
          quantity: 1
        }
      ]
    }
  });
}

/**
 * Logs in a customer and retrieves an access token.
 *
 * @param {string} email - The email address of the customer.
 * @param {string} password - The password of the customer.
 * @returns {Promise<void>} - Promise resolving when the login process is complete.
 */
export async function loginCustomer(email, password) {
  const query = `
        mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
                customerAccessToken {
                    accessToken
                    expiresAt
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

  const variables = {
    input: {
      email: email,
      password: password
    }
  };

  try {
    const response = await shopifyFetch({ query, variables });
    console.log('response: ', response.body);
    handleLoginResponse(response);
  } catch (error) {
    console.error('Error during login:', error);
  }
}

/**
 * Handles the response from the login request.
 *
 * @param {object} response - The response object from the API.
 */
function handleLoginResponse(response) {
  const { data } = response;
  const { customerAccessTokenCreate } = data;

  if (customerAccessTokenCreate.customerAccessToken) {
    console.log('Login successful!', customerAccessTokenCreate.customerAccessToken.accessToken);
    // Store the access token in your session or local storage
  } else {
    console.error('Login error:', customerAccessTokenCreate.userErrors);
  }
}

/**
 * Logs out a customer by deleting their access token.
 *
 * @param {string} accessToken - The access token of the customer to be logged out.
 * @returns {Promise<void>} - Promise resolving when the logout process is complete.
 */
export async function logoutCustomer(accessToken) {
  const query = `
        mutation customerAccessTokenDelete($input: CustomerAccessTokenDeleteInput!) {
            customerAccessTokenDelete(input: $input) {
                deletedAccessToken
                userErrors {
                    field
                    message
                }
            }
        }
    `;

  const variables = {
    input: {
      customerAccessToken: accessToken
    }
  };

  try {
    const response = await shopifyFetch({ query, variables });
    handleLogoutResponse(response);
  } catch (error) {
    console.error('Error during logout:', error);
  }
}

/**
 * Handles the response from the logout request.
 *
 * @param {object} response - The response object from the API.
 */
function handleLogoutResponse(response) {
  const { data } = response;
  const { customerAccessTokenDelete } = data;

  if (customerAccessTokenDelete.deletedAccessToken) {
    console.log('Logout successful!');
    // Clear the access token from your session or local storage
  } else {
    console.error('Logout error:', customerAccessTokenDelete.userErrors);
  }
}
