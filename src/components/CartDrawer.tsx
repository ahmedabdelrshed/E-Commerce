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
const CartDrawer = () => {
  const {isOpenCartDrawer} = useSelector((state:RootState) => state.global)
  const dispatch = useDispatch()
  const onClose= ()=> dispatch(onCloseCartDrawer())
  return (
    <div>
      <Drawer isOpen={isOpenCartDrawer} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart 🛒</DrawerHeader>

          <DrawerBody></DrawerBody>

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
