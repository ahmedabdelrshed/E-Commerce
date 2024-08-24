import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkelton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.600" rounded={"lg"}>
      <SkeletonCircle size="40" mx={"auto"} />

      <SkeletonText
        mt="8"
        noOfLines={1}
        w={120}
        mx={"auto"}
        skeletonHeight="4"
      />
      <SkeletonText
        mt="10"
        noOfLines={4}
        mx={"auto"}
        spacing={4}
        skeletonHeight="3"
      />
      <Skeleton
        height="50px"
        mt={5}
        fadeDuration={4}
        bg="blue.500"
        color="white"
        rounded={"md"}
      ></Skeleton>
    </Box>
  );
};

export default ProductSkelton;
