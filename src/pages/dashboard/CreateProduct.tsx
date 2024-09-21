import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ModalShared from "../../components/ModalShared";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateProduct } from "../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { productSchema } from "../../validation";
import { useEffect, useState } from "react";
import { useCreateDashBoardProductsMutation } from "../../app/services/productsApi";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateProduct = ({ isOpen, onClose }: IProps) => {
  const [thumbnailEdit, setThumbnailEdit] = useState<File | undefined>(
    undefined
  );
  const [errorImage, setErrorImage] = useState("");
  const toast = useToast();
  const [createProduct, { isLoading, isSuccess }] =
    useCreateDashBoardProductsMutation();
  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateProduct>({
    resolver: yupResolver(productSchema),
  });
  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
      toast({
        position: "top",
        title: "Product Created successfully",
        status: "success",
        duration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  // Handlers
  const onChangeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setThumbnailEdit(files[0]);
    }
  };
  const onSubmitCreate: SubmitHandler<ICreateProduct> = (
    data: ICreateProduct
  ) => {
    if (!thumbnailEdit) {
      setErrorImage("Please select a thumbnail image");
      return;
    }
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        stock: data.stock,
        price: data.price,
        category:1
      })
    );
    formData.append("files.thumbnail", thumbnailEdit);
    createProduct(formData);
  };
  return (
    <ModalShared
      isOpen={isOpen}
      onClose={onClose}
      confirmText="Create"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmitCreate)}
      title="Create New Product"
    >
      <FormControl>
        <FormLabel>Product Title</FormLabel>
        <Input placeholder="Product Title" {...register("title")} />
        <FormHelperText color={"red.400"}>
          {errors.title?.message}
        </FormHelperText>
      </FormControl>
      <FormControl my={3}>
        <FormLabel>Product Price</FormLabel>
        <NumberInput>
          <NumberInputField
            onChange={(e) => {
              const validResult = e.target.value === "" ? 0 : e.target.value;
              setValue("price", +validResult);
              trigger("price");
            }}
            placeholder="Product price"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText color={"red.400"}>
          {errors.price?.message}
        </FormHelperText>
      </FormControl>
      <FormControl my={3}>
        <FormLabel>Product Stock</FormLabel>
        <NumberInput>
          <NumberInputField
            onChange={(e) => {
              const validResult = e.target.value === "" ? 0 : e.target.value;
              setValue("stock", +validResult);
              trigger("stock");
            }}
            placeholder="Product stock"
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormHelperText color={"red.400"}>
          {errors.stock?.message}
        </FormHelperText>
      </FormControl>
      <FormControl my={3}>
        <FormLabel>Product Description</FormLabel>
        <Textarea
          placeholder="Product Description"
          {...register("description")}
        />
        <FormHelperText color={"red.400"}>
          {errors.description?.message}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Product Image</FormLabel>
        <Input
          type="file"
          accept="image/*"
          h={"full"}
          p={2}
          onChange={onChangeThumbnail}
        />
        {errorImage && (
          <FormHelperText color={"red.400"}>{errorImage}</FormHelperText>
        )}
      </FormControl>
    </ModalShared>
  );
};

export default CreateProduct;
