import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Tooltip,
  Spinner,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import {
  useDeleteDashBoardCategoriesMutation,
  useGetCategoriesQuery,
} from "../../app/services/categoriesApi";
import { ICategory, ICreateCategory } from "../../interfaces";
import CreateCategory from "./createCategory";
import AlertDialogComponent from "../../components/AlertDialog";
import { useEffect, useState } from "react";
import UpdateCategory from "./UpdateCategory";

const CategoriesTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleting,
    onOpen: onOpenDeleting,
    onClose: onCloseDeleting,
  } = useDisclosure();
  const [tempCategoryId, setTempCategoryId] = useState<number>(0);
  const [categoryToEdit, setCategoryToEdit] = useState<ICreateCategory>({
    title: "",
    description: "",
  });
  const [deleteCategory, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashBoardCategoriesMutation();
  const { isLoading, data } = useGetCategoriesQuery(undefined);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      onCloseDeleting();
      toast({
        position: "top",
        title: "Category Deleted successfully",
        status: "success",
        duration: 2000,
      });
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
      <Flex flexDirection={"column"} maxW={"85%"} mx={"auto"}>
        <Button
          colorScheme="blue"
          ml={"auto"}
          w={"fit-content"}
          onClick={onOpen}
        >
          Create New Category
        </Button>
        <TableContainer
          border={"1px solid #2d3748"}
          rounded={"lg"}
          p={3}
          mt={6}
        >
          <Table variant="simple">
            <TableCaption>Total Entries : {data?.data?.length}</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>DESCRIPTION</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.data?.map((category: ICategory) => (
                <Tr key={category?.id}>
                  <Td>{category?.id}</Td>
                  <Td>{category?.attributes?.title}</Td>
                  <Td>{category?.attributes?.description}</Td>
                  <Td>
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
                          setCategoryToEdit(category?.attributes);
                          setTempCategoryId(category?.id);
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
                          setTempCategoryId(category?.id);
                          onOpenDeleting();
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
            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>TITLE</Th>
                <Th>DESCRIPTION</Th>
                <Th>Action</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Flex>
      <CreateCategory isOpen={isOpen} onClose={onClose} />
      <AlertDialogComponent
        cancelText="Cancel"
        confirmText="Delete"
        description="Are you sure to Delete this Category?"
        handleDelete={() => {
          deleteCategory(tempCategoryId);
        }}
        title="Delete Category"
        isOpen={isOpenDeleting}
        onClose={onCloseDeleting}
        isLoading={isDeleting}
      />
      <UpdateCategory
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        id={tempCategoryId}
        category={categoryToEdit}
      />
    </>
  );
};

export default CategoriesTable;
