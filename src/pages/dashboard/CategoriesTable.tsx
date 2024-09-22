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
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinFill } from "react-icons/ri";
import { useGetCategoriesQuery } from "../../app/services/categoriesApi";
import { ICategory } from "../../interfaces";
import CreateCategory from "./createCategory";


const CategoriesTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
    const {isLoading,data} = useGetCategoriesQuery(undefined)
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
           {data?.data?.map((category:ICategory)=> <Tr key={category?.id}>
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
                    onClick={() => {}}
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
                    onClick={() => {}}
                    colorScheme="red"
                    variant={"solid"}
                    mr={3}
                  >
                    <RiDeleteBinFill size={12} />
                  </Button>
                </Tooltip>
              </Td>
            </Tr>)}
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
       <CreateCategory isOpen={isOpen} onClose={onClose}/>
    </>
  );
};

export default CategoriesTable;
