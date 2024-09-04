import { Grid } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import useQueryHook from "../hooks/useQueryHook";
import ProductSkelton from "./ProductSkelton";
import { IProduct } from "../interfaces";

const ProductsList = () => {
  const { data, isLoading } = useQueryHook({
    queryKey: ["products"],
    url: "/api/products?populate=thumbnail&sort=createdAt:DESC",
  });

  if (isLoading)
    return (
      <Grid
        margin={30}
        templateColumns="repeat(auto-fill,minmax(300px,1fr))"
        gap={6}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <ProductSkelton key={index} />
        ))}
      </Grid>
    );
  return (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill,minmax(300px,1fr))"
      gap={6}
    >
      {data.data.length
        ? data.data.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              id={product.id}
              attributes={product.attributes}
            />
          ))
        : null}
    </Grid>
  );
};

export default ProductsList;
