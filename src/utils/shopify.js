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

/**
 * Constructs the GraphQL query to fetch a product by handle.
 *
 * @returns {string} - The GraphQL query string.
 */
function buildProductByHandleQuery() {
  return `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        availableForSale
        title
        description
        descriptionHtml
        productType 
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
          media(first: 20) {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                edges {
                    node {
                        mediaContentType
                        ... on MediaImage {
                            image {
                                originalSrc
                                altText
                                width
                                height
                            }
                        }
                        ... on Video {
                            id
                            sources {
                                url
                            }
                        }
                    }
                }
            }
          ingredientsMetafield: metafield(namespace: "custom", key: "ingredients") {
              id
              value
              type
            }
            
            # Structured FAQs metafield (assuming JSON list format)
            faqsMetafield: metafield(namespace: "custom", key: "faqs") {
              id
              value
              type
            }
            
            # Highlights/benefits metafield
            highlightsMetafield: metafield(namespace: "custom", key: "highlights") {
              id
              value
              type
            }
             relatedProductsMetafield: metafield(namespace: "custom", key: "related") {
                id
                type
                references(first: 10) {
                    edges {
                        node {
                            ... on Product {
                                id
                                title
                                handle
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
                                media(first: 20) {
                                    pageInfo {
                                        hasNextPage
                                        hasPreviousPage
                                    }
                                    edges {
                                        node {
                                            mediaContentType
                                            ... on MediaImage {
                                                image {
                                                    originalSrc
                                                    altText
                                                    width
                                                    height
                                                }
                                            }
                                            ... on Video {
                                                id
                                                sources {
                                                    url
                                                }
                                            }
                                        }
                                    }
                                }
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }
      }
    }
  `;
}

/**
 * Fetches the product details from Shopify by handle.
 *
 * @param {string} handle - The handle of the product to fetch.
 * @returns {Promise<object>} - A promise resolving to the product details.
 */
export async function getProduct(handle) {
  const query = buildProductByHandleQuery();
  //console.log(query);

  try {
    const response = await shopifyFetch({
      query,
      variables: { handle }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    throw error; // Rethrow or handle the error as needed
  }
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

/**
 * Fetches a single collection and its products from Shopify.
 *
 * @param {string} handle - The handle of the collection to fetch.
 * @param {number} firstProducts - Number of products to fetch.
 * @param {string} sortKey - Field by which to sort products.
 * @returns {Promise<object>} - Promise resolving to the collection data.
 */
export async function getCollection(handle, firstProducts = 10, sortKey = 'TITLE') {
  const query = `{
      collectionByHandle(handle: "${handle}") {
        id
        handle
        title
        description
        
        products(first: ${firstProducts}, sortKey: ${sortKey}) {
          edges {
            node {
              id
              handle
              availableForSale
              title
              description
              productType
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
                edges {
                  node {
                    id
                    title
                    sku
                    availableForSale
                    priceV2 {
                      amount
                      currencyCode
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              media(first: 20) {
                edges {
                  node {
                    mediaContentType
                    ... on MediaImage {
                      image {
                        originalSrc
                        altText
                        width
                        height
                      }
                    }
                    ... on Video {
                      sources {
                        url
                      }
                    }
                  }
                }
              }
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
              ingredients: metafield(namespace: "custom", key: "ingredients") {
                id
                value
                type
              }
              faqs: metafield(namespace: "custom", key: "faqs") {
                id
                value
                type
              }
              highlights: metafield(namespace: "custom", key: "highlights") {
                id
                value
                type
              }
              related: metafield(namespace: "custom", key: "related") {
                id
                value
                type
                references(first: 5) {
                  edges {
                    node {
                      ... on Product {
                        id
                        title
                        handle
                        images(first: 1) {
                          edges {
                            node {
                              originalSrc
                              altText
                            }
                          }
                        }
                        priceRange {
                          minVariantPrice {
                            amount
                            currencyCode
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  try {
    const response = await shopifyFetch({ query });

    if (response.body.errors) {
      console.error('GraphQL Errors:', response.body.errors);
      throw new Error(`GraphQL errors: ${response.body.errors.map((e) => e.message).join(', ')}`);
    }

    const collection = response.body.data?.collectionByHandle;

    if (!collection) {
      throw new Error(`Collection ${handle} not found`);
    }

    // Process products
    const processedProducts = collection.products.edges.map(({ node }) => {
      return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        productType: node.productType,
        description: node.description,
        availableForSale: node.availableForSale,
        options: node.options,
        priceRange: node.priceRange,
        variants: node.variants.edges.map(({ node: variant }) => variant),
        images: node.images.edges.map(({ node: image }) => image),
        media: node.media.edges.map(({ node: media }) => ({
          contentType: media.mediaContentType,
          image: media.mediaContentType === 'IMAGE' ? media.image : null,
          video: media.mediaContentType === 'VIDEO' ? media.sources[0] : null
        })),
        ingredients: parseMetafieldValue(node.ingredients),
        faqs: parseMetafieldValue(node.faqs),
        highlights: parseMetafieldValue(node.highlights),
        relatedProducts: node.related
          ? node.related.references?.edges.map(({ node: related }) => related)
          : []
      };
    });

    return {
      id: collection.id,
      handle: collection.handle,
      title: collection.title,
      description: collection.description,
      products: processedProducts
    };
  } catch (error) {
    console.error(`Failed to fetch collection ${handle}:`, error);
    throw error;
  }
}

/**
 * Helper function to parse the metafield values based on their type
 * @param {Object} metafield - The metafield object from Shopify
 * @returns {any} - Parsed metafield value
 */
function parseMetafieldValue(metafield) {
  if (!metafield) return null;

  try {
    switch (metafield.type) {
      case 'json':
        return JSON.parse(metafield.value);
      case 'list.single_line_text_field':
        return JSON.parse(metafield.value);
      case 'single_line_text_field':
      case 'multi_line_text_field':
        return metafield.value;
      case 'list.product_reference':
        return metafield.references?.edges?.map(({ node }) => node) || [];
      case 'product_reference':
        return metafield.references?.edges?.[0]?.node || null;
      default:
        return metafield.value;
    }
  } catch (error) {
    console.error('Error parsing metafield value:', error);
    return null;
  }
}

/**
 * Processes the API response and returns formatted data
 * @param {Object} resOne - First API response with single product
 
 * @returns {Object} - Processed data or throws error
 */
export async function handleShopifyResponse(resOne) {
  if (resOne.status === 200) {
    const rawProduct = resOne.body?.data?.productByHandle;

    // Process main product
    const processedProduct = processProductData(rawProduct);

    if (!processedProduct) {
      throw error(404, 'Product not found');
    }

    return {
      body: {
        product: processedProduct
      }
    };
  } else {
    const status = resOne.status || 500;
    throw error(status, 'Error fetching product data');
  }
}

export async function processProductData(product) {
  if (!product) return null;

  //console.log('Processing product:', product.handle); // Debug line

  // Get custom metafields
  const customMetafields = product.metafields?.edges
    ? product.metafields.edges.reduce((acc, { node }) => {
        if (node?.key) {
          acc[node.key] = parseMetafieldValue(node);
        }
        return acc;
      }, {})
    : {};

  const metafieldsToProcess = [
    //{ key: 'ingredients', fallback: null },
    //{ key: 'highlights', fallback: [] }
  ];

  // Generic metafield processor
  const processMetafields = (fields, customFields) =>
    fields.reduce((acc, { key, fallback }) => {
      acc[key] = parseMetafieldValue(product[`${key}Metafield`]) || customFields[key] || fallback;
      return acc;
    }, {});

  // Process media items
  const processedMedia = (product.media?.edges || [])
    .map(({ node }) => {
      if (node.mediaContentType === 'IMAGE') {
        return {
          type: 'IMAGE',
          id: node.id || null,
          src: node.image?.originalSrc || null,
          alt: node.image?.altText || '',
          width: node.image?.width || null,
          height: node.image?.height || null
        };
      } else if (node.mediaContentType === 'VIDEO') {
        return {
          type: 'VIDEO',
          id: node.id || null,
          src: node.sources?.[0]?.url || null,
          alt: '', // Videos typically don't have alt text
          sources: node.sources || []
        };
      }
      return null;
    })
    .filter(Boolean); // Remove any null entries

  // Process options with default selections
  const processedOptions = (product.options || []).map((option) => ({
    id: option.id || null,
    name: option.name || '',
    values: option.values || [],
    defaultValue: option.values?.[0] || null
  }));

  // Create initial selected options object
  const defaultSelectedOptions = processedOptions.reduce((acc, option) => {
    acc[option.name] = option.defaultValue;
    return acc;
  }, {});

  // Process variants
  const processedVariants = (product.variants?.edges || product.variants || []).map((variant) => {
    const node = variant.node || variant;
    return {
      id: node.id,
      title: node.title,
      price: node.priceV2?.amount || null,
      currency: node.priceV2?.currencyCode || null,
      sku: node.sku || null,
      available: node.availableForSale || false,
      selectedOptions: node.selectedOptions || []
    };
  });

  // Process related products from the metafield
  const relatedProducts =
    product.relatedProductsMetafield?.references?.edges?.map(({ node }) => {
      // Process media for each related product
      const processedMedia = (node.media?.edges || [])
        .map(({ node: mediaNode }) => {
          if (mediaNode.mediaContentType === 'IMAGE') {
            return {
              type: 'IMAGE',
              id: mediaNode.id || null,
              src: mediaNode.image?.originalSrc || null,
              alt: mediaNode.image?.altText || '',
              width: mediaNode.image?.width || null,
              height: mediaNode.image?.height || null
            };
          } else if (mediaNode.mediaContentType === 'VIDEO') {
            return {
              type: 'VIDEO',
              id: mediaNode.id || null,
              src: mediaNode.sources?.[0]?.url || null,
              alt: '',
              sources: mediaNode.sources || []
            };
          }
          return null;
        })
        .filter(Boolean);

      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        image: node.images?.edges?.[0]?.node || null,
        media: processedMedia,
        mediaPageInfo: node.media?.pageInfo || {
          hasNextPage: false,
          hasPreviousPage: false
        },
        price: node.priceRange?.minVariantPrice || null
      };
    }) || [];

  // Store the processed data
  const processedData = {
    id: product.id || null,
    handle: product.handle || null,
    title: product.title || null,
    description: product.description || null,

    // Options and variants
    options: processedOptions,
    defaultSelectedOptions,
    variants: processedVariants,

    // Add media to the processed data
    media: processedMedia,
    mediaPageInfo: product.media?.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false
    },

    ...processMetafields(metafieldsToProcess, customMetafields),
    relatedProducts,
    // Keep the original images processing for backward compatibility
    images: (product.images?.edges || []).map(({ node }) => ({
      src: node.originalSrc,
      alt: node.altText || '',
      width: node.width,
      height: node.height
    })),
    customMetafields
  };

  /* console.log('Processed data for:', product.handle, processedData, {
    hasRelated: processedData.relatedProducts.length > 0,
    relatedCount: processedData.relatedProducts.length
  }); */

  return processedData;
}

// Create a separate utility function for finding variant IDs
export function findVariantId(variants, selectedOptions) {
  if (!variants || !selectedOptions) return null;

  const variant = variants.find((variant) => {
    return variant.selectedOptions.every((option) => selectedOptions[option.name] === option.value);
  });

  return variant?.id || null;
}

/**
 * Formats a given amount as a currency string.
 *
 * @param {number} amount - The amount to format.
 * @param {string} [currency='USD'] - The currency code (e.g., 'USD', 'EUR').
 * @returns {string} - The formatted currency string.
 */
export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}
