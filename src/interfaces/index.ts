export interface IProduct {
    id: number
    attributes: {
        title: string;
        price: number;
        stock?: number;
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
export interface IProductEdit {
    id?: number
    attributes?: {
        title?: string;
        price?: number;
        stock?: number;
        description?: string;
        category?: {
            data: {
                attributes: {
                    title: string
                }
            }
        }
        thumbnail?: {
            data?: {
                attributes?: {
                    url?: string;
                }
            }
        }
    }
}
export interface ICategory {
    id: number;
    attributes: {
        title: string;
        description: string;
    };
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
export interface ICreateProduct {
    title: string;
    price: number;
    stock: number;
    description: string;
}
export interface ICreateCategory {
    title: string;
    description: string;
}