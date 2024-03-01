// Dummy data for action.ts

// Sample product data
const sampleProduct = {
    _id: '1',
    name: 'Sample Product',
    price: 99.99,
    description: 'This is a sample product description',
    image: '/sample-image.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 10,
    rating: 4.5,
    numReviews: 10,
  };
  
  // Dummy user data
  const sampleUser = {
    _id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false,
    token: 'sampleToken123',
  };
  
  // Dummy review data
  const sampleReview = {
    _id: '1',
    name: 'Jane Doe',
    rating: 4,
    comment: 'This is a sample review comment',
    createdAt: '2024-02-24T12:00:00.000Z',
  };
  
  // Dummy product list data
  const productListData = {
    products: [sampleProduct, sampleProduct, sampleProduct], // Array of sample products
    page: 1,
    pages: 3,
  };
  
  // Dummy error message
  const errorMessage = 'Sample error message';
  
  export {
    sampleProduct,
    sampleUser,
    sampleReview,
    productListData,
    errorMessage,
  };