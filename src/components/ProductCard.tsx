import {
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import { IProduct } from "../interfaces";

const ProductCard = (Product: IProduct) => {
  const { id, attributes } = Product;
  const { title, price, description, thumbnail } = attributes;

  return (
    <Card bg={"none"} border={"1px solid white"}>
      <CardBody textAlign={"center"}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${
            thumbnail.data.attributes.url
          }`}
          alt="Green double couch with wooden legs"
          borderRadius="50%"
          width={"200px"}
          height={"200px"}
          mx={"auto"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            ${price}
          </Text>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => console.log(id)}
          >
            More Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
