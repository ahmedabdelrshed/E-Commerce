export interface IProduct {
    id: number
    attributes: {
        title: string;
        price: number;
        description: string;
        category?: {
            data: {
                attributes: {
                    title: string
                }
            }
        }
        thumbnail: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }
}

export interface LoginData {
    identifier: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}