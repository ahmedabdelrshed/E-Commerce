/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useGetDashboardProductsQuery } from "../../app/services/productsApi";
import { Link as LinkRouting } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";

const ProductsTable = () => {
  const { isLoading, data } = useGetDashboardProductsQuery(undefined);
  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mx={"auto"}
      />
    );
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Products Table</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Image</Th>
            <Th>Price</Th>
            <Th>Stoke</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.data?.map((product: any) => (
            <Tr key={product?.id}>
              <Td>{product?.id}</Td>
              <Td>{product?.attributes?.title}</Td>
              <Td>{product?.attributes?.category?.data.attributes.title}</Td>
              <Td>
                <Image
                  borderRadius={"full"}
                  objectFit={"cover"}
                  boxSize={"40px"}
                  src={`${import.meta.env.VITE_SERVER_URL}${
                    product?.attributes?.thumbnail.data.attributes.url
                  }`}
                ></Image>
              </Td>
              <Td>${product.attributes.price}</Td>
              <Td>{product.attributes.stock}</Td>
              <Td>
                <Button
                  as={LinkRouting}
                  to={`/product/${product?.id}`}
                  colorScheme="purple"
                  variant={"solid"}
                  mr={3}
                >
                  <AiOutlineEye size={12} />
                </Button>
                <Button
                  as={LinkRouting}
                  to={`/product/${product?.id}`}
                  colorScheme="blue"
                  variant={"solid"}
                  mr={3}
                >
                  <FiEdit2 size={12} />
                </Button>
                <Button
                  as={LinkRouting}
                  to={`/product/${product?.id}`}
                  colorScheme="red"
                  variant={"solid"}
                  mr={3}
                >
                  <RiDeleteBinFill size={12} />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
