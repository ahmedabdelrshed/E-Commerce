export interface IProduct {

    id: number
    attributes: {
        title: string;
        price: number;
        description: string;
        thumbnail: {
            data: {
                attributes: {
                    url: string;
                }
            }
        }
    }


}