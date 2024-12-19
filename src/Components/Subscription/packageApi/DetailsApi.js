import ApiClient from './ApiClient';

// Example API Call
ApiClient.get('/admin/package/subscribers/167')
  .then((response) => {
    console.log('Subscriber Data:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
