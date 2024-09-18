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
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useDeleteDashBoardProductsMutation,
  useGetDashboardProductsQuery,
} from "../../app/services/productsApi";
import { Link as LinkRouting } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import AlertDialogComponent from "../../components/AlertDialog";
import { useEffect, useState } from "react";

const ProductsTable = () => {
  const { isLoading, data } = useGetDashboardProductsQuery(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [temProductId, setTemProductId] = useState<number>();
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashBoardProductsMutation();
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setTemProductId(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        ml={"250px"}
      />
    );
  return (
    <>
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
                  <Tooltip
                    hasArrow
                    label="View Product"
                    bg="purple.500"
                    rounded={"md"}
                    color={"white"}
                  >
                    <Button
                      as={LinkRouting}
                      to={`/product/${product?.id}`}
                      colorScheme="purple"
                      variant={"solid"}
                      mr={3}
                    >
                      <AiOutlineEye size={12} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label="Edit Product"
                    bg="blue.500"
                    rounded={"md"}
                    color={"white"}
                  >
                    <Button colorScheme="blue" variant={"solid"} mr={3}>
                      <FiEdit2 size={12} />
                    </Button>
                  </Tooltip>
                  <Tooltip
                    hasArrow
                    label="Delete Product"
                    bg="red.500"
                    rounded={"md"}
                    color={"white"}
                  >
                    <Button
                      onClick={() => {
                        setTemProductId(product?.id);
                        onOpen();
                      }}
                      colorScheme="red"
                      variant={"solid"}
                      mr={3}
                    >
                      <RiDeleteBinFill size={12} />
                    </Button>
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialogComponent
        isOpen={isOpen}
        onClose={onClose}
        title="Delete Product"
        description="Are You Sure To Delete This Product"
        cancelText="Cancel"
        confirmText="Delete"
        handleDelete={() => deleteProduct(temProductId)}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ProductsTable;
