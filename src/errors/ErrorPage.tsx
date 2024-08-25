import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
// import { FiAlertCircle } from "react-icons/fi";

interface IProps {
  statusCode?: number;
  title?: string;
}

const ErrorHandler = ({ statusCode = 500, title = "Server Error" }: IProps) => {
  const { pathname } = useLocation();

  return (
    <Flex
      position="fixed"
      inset={0}
      alignItems="center"
      justifyContent="center"
      p={5}
      w="full"
    >
      <VStack spacing={5} textAlign="center">
        <Center bg="red.100" rounded="full" p={4}>
          <Center bg="red.200" rounded="full" p={4}>
            {/* <Icon as={FiAlertCircle} w={16} h={16} color="red.600" /> */}
          </Center>
        </Center>
        <Heading as="h2" fontSize={["36px", "50px"]} fontWeight="bold">
          {statusCode} - {title}
        </Heading>
        <Text fontSize={["md", "lg"]}>
          Oops, something went wrong. Try to refresh this page or <br />
          feel free to contact us if the problem persists.
        </Text>
        <HStack justifyContent="center" spacing={4} my={10}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Button variant="solid" bg={"indigo"}>
              Home
            </Button>
          </Link>
          <Link
            as={RouterLink}
            to={pathname}
            _hover={{ textDecoration: "none" }}
          >
            <Button variant="solid">Refresh</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default ErrorHandler;
