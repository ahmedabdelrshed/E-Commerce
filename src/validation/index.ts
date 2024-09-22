import * as yup from "yup";

export const loginSchema = yup.object({
    identifier: yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid Email."),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
})

export const registerSchema = yup.object({
    email: yup.string().required("Email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please Enter a valid Email."),
    username: yup.string().required("Username is required").min(5, 'username must be at least 5 characters'),
    password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters long"),
})

export const productSchema = yup.object({
    title: yup.string().required("Product Title is required").min(5, "Product Title must be at least 5 characters"),
    description: yup.string().required("Product Description is required").min(20, "Product Description must be at least 20 characters"),
    price: yup.number().required("Product Price is required").min(1, "Product Price must be Greater than zero."),
    stock: yup.number().required("Product Stock is required").min(1, "Product Stock must be Greater than zero."),
})
export const categorySchema = yup.object({
    title: yup.string().required("Category Title is required").min(5, "Category Title must be at least 5 characters"),
    description: yup.string().required("Category Description is required").min(20, "Category Description must be at least 20 characters"),
})