import {
  Card,
  CardBody,
  Stack,
  Heading,
  Button,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { IProduct } from "../../interfaces";
import useQueryHook from "../../hooks/useQueryHook";
import { useNavigate, useParams } from "react-router-dom";
import ProductSkelton from "../ProductSkelton";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cartSlice";
const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useQueryHook({
    queryKey: ["product"],
    url: `api/products/${id}?populate=thumbnail,category&sort=createdAt:DESC/`,
  });
  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductSkelton />
      </Box>
    );
  const Product: IProduct = data?.data;
  const { attributes } = Product;
  const { title, price, description, thumbnail, category } = attributes;
  const categoryName = category?.data.attributes.title;
  // Handler
  const handleBack = () => navigate(-1);
  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart(Product));
  };
  return (
    <>
      <Button ml={"37%"} display={"block"} mt={2} onClick={handleBack}>
        <ArrowBackIcon mr={2} /> Back
      </Button>
      <Card
        bg={"none"}
        border={"1px solid white"}
        maxW={"sm"}
        mx={"auto"}
        mt={4}
      >
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
          <Stack mt="4" spacing="2">
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
            <Text color="blue.700" fontSize="xl">
              {categoryName}
            </Text>
            <Text color="blue.600" fontSize="2xl">
              ${price}
            </Text>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductPage;
