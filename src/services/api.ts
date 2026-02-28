const API_BASE_URL = "https://v2.api.noroff.dev";
export const productService = {
  getProduct: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/online-shop`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    const data = await response.json();
    return data.data || [];
  },
};
