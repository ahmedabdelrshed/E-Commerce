import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductsList = () => {
  return (
    <Grid margin={30} templateColumns='repeat(auto-fill,minmax(300px,1fr))' gap={6}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Grid>
  );
};

export default ProductsList;
