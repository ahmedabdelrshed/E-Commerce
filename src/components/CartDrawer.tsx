import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { onCloseCartDrawer } from "../app/features/globalSlice";
import ConfirmModal from "./ConfirmModal";
import { clearCart } from "../app/features/cartSlice";
import CartItem from "./CartItem";
const CartDrawer = () => {
  const { isOpenCartDrawer } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onCloseDrawer = () => dispatch(onCloseCartDrawer());
  const { cartProducts } = useSelector((state: RootState) => state.cart);
  // Handlers
  const handleConfirmClear = () => {
    dispatch(clearCart());
    onClose();
  };
  return (
    <div>
      <Drawer
        isOpen={isOpenCartDrawer}
        placement="right"
        onClose={onCloseDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart 🛒</DrawerHeader>

          <DrawerBody>
            {cartProducts.length ? (
              cartProducts.map((product) => (
                <CartItem
                  key={product.id}
                  id={product.id}
                  title={product.attributes.title}
                  price={product.attributes.price}
                  quantity={product.quantity}
                  image={product.attributes.thumbnail.data.attributes.url}
                />
              ))
            ) : (
              <Text fontSize={"lg"}>You Cart is empty !!</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            {cartProducts.length > 0 && (
              <Button
                variant="outline"
                mr={3}
                colorScheme="red"
                onClick={onOpen}
              >
                Clear All Products
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Remove All Products"
        text="Are You Sure to Delete All Products From Cart ?"
      >
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleConfirmClear}>
            Confirm
          </Button>
          <Button bg={"gray"} color={"black"} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ConfirmModal>
    </div>
  );
};

export default CartDrawer;
