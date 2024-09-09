import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
interface ICartItem {
  title: string;
  image: string;
  quantity: number;
  price: number;
}

const CartItem = ({ image, price, quantity, title }: ICartItem) => {
  return (
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
          >
            <AddIcon fontSize={8} />
          </Button>
          <Button variant={"outline"} colorScheme="red" size={"sm"}>
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
        <Button variant={"outline"} colorScheme="red" size={"sm"}>
          <DeleteIcon fontSize={14} />
        </Button>
      </Flex>
    </Box>
  );
};

export default CartItem;
