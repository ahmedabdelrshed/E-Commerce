import Cookies, { CookieSetOptions } from "universal-cookie";
const cookies = new Cookies();
class CookieService {
    get(name: string) {
        return cookies.get(name);
    }
    set(name: string, value: string, options: CookieSetOptions) {
        cookies.set(name, value, options);
    }
    remove(name: string) {
        cookies.remove(name);
    }
}

export default new CookieService();