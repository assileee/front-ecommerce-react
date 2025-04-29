const uri = `${import.meta.env.VITE_API_URL}/api/products/seeproduct`;

export const fetchProducts = async () => {
  try {
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
