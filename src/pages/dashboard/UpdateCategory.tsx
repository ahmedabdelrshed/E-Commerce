import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateCategory } from "../../interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "../../validation";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import ModalShared from "../../components/ModalShared";
import { useEffect } from "react";
import { useUpdateDashBoardCategoriesMutation } from "../../app/services/categoriesApi";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  category: ICreateCategory;
}
const UpdateCategory = ({ isOpen, onClose, id, category }: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICreateCategory>({
    resolver: yupResolver(categorySchema),
  });
  const [UpdateCategory, { isLoading, isSuccess }] =
    useUpdateDashBoardCategoriesMutation();
  const toast = useToast();

  useEffect(() => {
    if (isOpen && category) {
      reset(category);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
      toast({
        position: "top",
        title: "Category Updated successfully",
        status: "success",
        duration: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
  // handler
  const onSubmitEdit: SubmitHandler<ICreateCategory> = (
    data: ICreateCategory
  ) => {
    console.log(data);
    const body = { data: data };
    UpdateCategory({ id, body });
  };
  return (
    <>
      <ModalShared
        isOpen={isOpen}
        onClose={onClose}
        confirmText="Update"
        isLoading={isLoading}
        onSubmit={handleSubmit(onSubmitEdit)}
        title="Update Category"
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

export default UpdateCategory;
