export const fetchData = async () => {
  // Replace the URL with your API endpoint
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  console.log('My Object:', JSON.stringify(data.products[0], null, 2));
  return data;
};
