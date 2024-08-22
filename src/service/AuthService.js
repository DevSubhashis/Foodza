import { removeData } from '../config/utils';
import { BASE_URL, LOGIN_INFO } from '../constants/Config';

class AuthService {
    static async doLogin() {
        try {
            const URL = `${BASE_URL}/products`; 
            const resultJSON = await fetch(URL);
            if (!resultJSON.ok) {
                throw new Error(`HTTP error! status: ${resultJSON.status}`);
            }
            const products = await resultJSON.json();
            products[0].token = "asasasasaasas2112221212121212121121";
            return products[0];
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    static async doLogout() {
        await removeData(LOGIN_INFO);
    }
}

export default AuthService;