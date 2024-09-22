import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ModalShared from "../../components/ModalShared";
import { SubmitHandler, useForm } from "react-hook-form";
import {  ICreateCategory } from "../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validation";
import { useCreateDashBoardCategoriesMutation } from "../../app/services/categoriesApi";
import { useEffect } from "react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const CreateCategory = ({ isOpen, onClose }: IProps) => {
    const [createCategory, { isLoading, isSuccess }] =
    useCreateDashBoardCategoriesMutation();
  const toast = useToast();

    useEffect(() => {
        if (isSuccess) {
          onClose();
          reset();
          toast({
            position: "top",
            title: "Category Created successfully",
            status: "success",
            duration: 2000,
          });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSuccess]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCategory>({
    resolver: yupResolver(categorySchema),
  });
  const onSubmitCreate :SubmitHandler<ICreateCategory> = (data:ICreateCategory)=>{
    console.log(data)
    createCategory({data: data});
  }
  return (
    <>
      <ModalShared
        isOpen={isOpen}
        onClose={onClose}
        confirmText="Create"
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmitCreate)}
        title="Create New Category"
      >
        <FormControl>
          <FormLabel>Category Title</FormLabel>
          <Input placeholder="Category Title" {...register("title")} />
          <FormHelperText color={"red.400"}>
            {errors.title?.message}
          </FormHelperText>
        </FormControl>
        <FormControl my={3}>
          <FormLabel>Category Description</FormLabel>
          <Textarea
            placeholder="Category Description"
            {...register("description")}
          />
          <FormHelperText color={"red.400"}>
            {errors.description?.message}
          </FormHelperText>
        </FormControl>
      </ModalShared>
    </>
  );
};

export default CreateCategory;
