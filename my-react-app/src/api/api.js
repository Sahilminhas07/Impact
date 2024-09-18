// https://bouboulena.com/admin/api/product_testing
export const fetchData = async () => {
    const response = await fetch('https://bouboulena.com/admin/api/product_testing');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  