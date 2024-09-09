import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  ModalFooter,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeFromCart,
} from "../app/features/cartSlice";
import ConfirmModal from "./ConfirmModal";
interface ICartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

const CartItem = ({ id, image, price, quantity, title }: ICartItem) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Handlers
  const handleConfirmDelete = () => {
    dispatch(removeFromCart(id));
  };
  const handleIncreaseQuantity = () => {
    dispatch(increaseProductQuantity(id));
  };
  const handleDecreaseQuantity = () => {
    if (quantity === 1) dispatch(removeFromCart(id));

    dispatch(decreaseProductQuantity(id));
  };

  return (
    <>
      <Box rounded={"md"} border={"1px solid gray"} my={2}>
        <Flex
          alignItems={"center"}
          py={2}
          px={2}
          justifyContent={"space-between"}
        >
          <Box>
            <Image
              src={`${import.meta.env.VITE_SERVER_URL}${image}`}
              w={"65px"}
              objectFit={"cover"}
              mr={5}
              mb={1}
            />
            <Text
              color={"gray.300"}
              fontSize={10}
              marginLeft={-5}
              textAlign={"center"}
            >
              {title}
            </Text>
          </Box>
          <Box>
            <Text
              as={"span"}
              color={"gray.300"}
              fontSize={12}
              textAlign={"center"}
            >
              Quantity: {quantity}
            </Text>
            <Button
              mx={2}
              p={1}
              variant={"outline"}
              colorScheme="green"
              size={"sm"}
              onClick={handleIncreaseQuantity}
            >
              <AddIcon fontSize={8} />
            </Button>
            <Button
              variant={"outline"}
              colorScheme="red"
              size={"sm"}
              onClick={handleDecreaseQuantity}
            >
              <MinusIcon fontSize={8} />
            </Button>
          </Box>
        </Flex>
        <Divider />
        <Flex
          alignItems={"center"}
          py={2}
          px={2}
          justifyContent={"space-between"}
        >
          <Text color={"gray.300"} fontSize={12} textAlign={"center"}>
            Total Price: ${price * quantity}
          </Text>
          <Button
            variant={"outline"}
            colorScheme="red"
            size={"sm"}
            onClick={onOpen}
          >
            <DeleteIcon fontSize={14} />
          </Button>
        </Flex>
      </Box>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Delete"
        text="Are You Sure to Delete this Product"
      >
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
            Confirm
          </Button>
          <Button bg={"gray"} color={"black"} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ConfirmModal>
    </>
  );
};

export default CartItem;
