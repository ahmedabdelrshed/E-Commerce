import { createStandaloneToast } from "@chakra-ui/react";
import { IProductCart } from "../app/features/cartSlice";
/**
 * Adds a product to the cart. If the product already exists in the cart, it increases the quantity by one.
 * If the product does not exist, it adds the product to the cart with a quantity of one.
 * 
 * @param {IProductCart} product - The product to be added to the cart. 
 * @param {IProductCart[]} cartProducts - The current list of products in the cart.
 * @returns {IProductCart[]} The updated list of products in the cart.
 */

export const addProductToCart = (product: IProductCart, cartProducts: IProductCart[]) => {
    const isProductExist = cartProducts.find(item => item.id === product.id);
    const { toast } = createStandaloneToast()
    if (isProductExist) {
        toast({
            position: 'top',
            title: "Product already added to cart",
            description: "Quantity of this product will be increase by one",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
        return cartProducts.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    }
    toast({
        position: 'top',
        title: "Product added successfully to your cart",
        status: "success",
        duration: 2000,
        isClosable: true,
    })

    return [...cartProducts, { ...product, quantity: 1 }]
}