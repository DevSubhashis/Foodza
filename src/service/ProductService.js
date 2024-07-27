import { BASE_URL } from '../constants/Config';
// import ProductModel from '../models/ProductModel';

class ProductService {
  static async fetchProducts() {
    try {
      const resultJSON = await fetch(`${BASE_URL}/products`);
      if (!resultJSON.ok) {
        throw new Error(`HTTP error! status: ${resultJSON.status}`);
      }
      // /** @type {ProductModel[]} */
      // /** @type {import('../models/types.d.ts').ProductModel[]} */
      const products = await resultJSON.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default ProductService;
