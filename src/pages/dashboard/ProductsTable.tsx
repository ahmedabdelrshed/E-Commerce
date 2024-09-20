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
  useToast,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import {
  useDeleteDashBoardProductsMutation,
  useGetDashboardProductsQuery,
  useUpdateDashBoardProductsMutation,
} from "../../app/services/productsApi";
import { Link as LinkRouting } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import AlertDialogComponent from "../../components/AlertDialog";
import { useEffect, useState } from "react";
import ModalShared from "../../components/ModalShared";
import { IProduct, IProductEdit } from "../../interfaces";

const ProductsTable = () => {
  const { isLoading, data } = useGetDashboardProductsQuery(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const toast = useToast();
  const [temProductId, setTemProductId] = useState<number>();
  const [productToEdit, setProductToEdit] = useState<IProductEdit>();
  const [thumbnailEdit, setThumbnailEdit] = useState<File | undefined>(
    undefined
  );
  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashBoardProductsMutation();
  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashBoardProductsMutation();
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setTemProductId(undefined);
      toast({
        position: "top",
        title: "Product deleted successfully",
        status: "success",
        duration: 2000,
      });
    }
    if (isUpdatingSuccess) {
      onCloseEdit();
      setProductToEdit(undefined);
      toast({
        position: "top",
        title: "Product Updated successfully",
        status: "success",
        duration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isUpdatingSuccess]);
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
  // Handlers
  const onChangeEditProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit?.attributes,
        [name]: value ?? " ",
      },
    });
  };
  const onChangePrice = (e: string) => {
    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit?.attributes,
        price: +e,
      },
    });
  };
  const onChangeStock = (e: string) => {
    setProductToEdit({
      ...productToEdit,
      attributes: {
        ...productToEdit?.attributes,
        stock: +e,
      },
    });
  };
  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setThumbnailEdit(files[0]);
    }
  };
  const onSubmitEdit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(productToEdit);
    console.log(thumbnailEdit);
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit?.attributes?.title,
        description: productToEdit?.attributes?.description,
        stock: productToEdit?.attributes?.stock,
        price: productToEdit?.attributes?.price,
      })
    );
    if (thumbnailEdit) {
      formData.append("files.thumbnail", thumbnailEdit);
    }
    updateProduct({ id: productToEdit?.id, body: formData });
  };

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
            {data?.data?.map((product: IProduct) => (
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
                    <Button
                      colorScheme="blue"
                      variant={"solid"}
                      mr={3}
                      onClick={() => {
                        setProductToEdit(product);
                        onOpenEdit();
                      }}
                    >
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
      <ModalShared
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        title="Edit Product"
        confirmText="Update"
        onSubmit={onSubmitEdit}
        isLoading={isUpdating}
      >
        <FormControl>
          <FormLabel>Product Title</FormLabel>
          <Input
            placeholder="Product Title"
            name="title"
            value={productToEdit?.attributes?.title}
            onChange={onChangeEditProduct}
          />
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Product Price</FormLabel>
          <NumberInput
            name="price"
            value={productToEdit?.attributes?.price}
            onChange={onChangePrice}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Product Stock</FormLabel>
          <NumberInput
            name="stock"
            value={productToEdit?.attributes?.stock}
            onChange={onChangeStock}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            placeholder="Product Description"
            name="description"
            value={productToEdit?.attributes?.description}
            onChange={onChangeEditProduct}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Image</FormLabel>
          <Input type="file" h={"full"} p={2} onChange={onChangeThumbnail} />
        </FormControl>
      </ModalShared>
    </>
  );
};

export default ProductsTable;
