import { BASE_URL } from '../constants/Config';
//import ProductModel from '../models/ProductModel';

class ProductService {
  static async fetchProducts(offset = 0, limit = 0) {
    try {
      const URL = `${BASE_URL}/products?offset=${offset}&limit=${limit}`;
      console.log(URL);
      const resultJSON = await fetch(URL);
      if (!resultJSON.ok) {
        throw new Error(`HTTP error! status: ${resultJSON.status}`);
      }
      // /** @type {ProductModel[]} */
      /** @type {import('../models/types.d.ts').ProductModel[]} */
      const products = await resultJSON.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async addProduct(product) {
    try {
      const URL = `${BASE_URL}/products`;
      const resultJSON = await fetch(URL);
      if (!resultJSON.ok) {
        throw new Error(`HTTP error! status: ${resultJSON.status}`);
      }
      // /** @type {ProductModel[]} */
      /** @type {import('../models/types.d.ts').ProductModel[]} */
      const products = await resultJSON.json();
      return products[0];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

}

export default ProductService;
