const accessToken = 'YOUR_ACCESS_TOKEN';

const pageId = 'PAGE_ID';

// Define the fields you want to retrieve for each post
const fields = 'id,message,created_time,picture';

fetch(`https://graph.facebook.com/${pageId}/feed?fields=${fields}&access_token=${accessToken}`)
  .then((response) => response.json())
  .then((data) => {
    // The API response is stored in the 'data' object
    const posts = data.data;

    // Loop through the posts and print their data
    posts.forEach((post) => {
      console.log(`Post ID: ${post.id}`);
      console.log(`Message: ${post.message}`);
      console.log(`Created Time: ${post.created_time}`);
      console.log(`Picture: ${post.picture}`);
      console.log('---');
    });
  })
  .catch((error) => {
    console.error('Error retrieving posts:', error);
  });
