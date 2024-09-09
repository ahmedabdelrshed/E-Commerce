import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { onCloseCartDrawer } from "../app/features/globalSlice";
import CartItem from "./CartITem";
const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const onClose = () => dispatch(onCloseCartDrawer());
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  return (
    <div>
      <Drawer isOpen={isOpenCartDrawer} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart 🛒</DrawerHeader>

          <DrawerBody>
            {cartProducts.map((product) => (
              <CartItem
                key={product.id}
                id={product.id}
                title={product.attributes.title}
                price={product.attributes.price}
                quantity={product.quantity}
                image={product.attributes.thumbnail.data.attributes.url}
              />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              colorScheme="red"
              onClick={() => {}}
            >
              Clear All Products
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
