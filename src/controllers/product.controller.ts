import { AuthenticatedRequest } from "../interfaces/auth.interface";
import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ProductZod } from "../zod/product.zod";

const getAllProducts = asyncHandler( async (req, res) => {
  const products: IProduct[] = await Product.find({});
  if (!products || products.length === 0) {
    throw new ApiError(400, "No product found");
  }

  return res.status(200).json(
    new ApiResponse(200, products, "Products retrieved successfully")
  );
});

const createProduct = asyncHandler( async (req:AuthenticatedRequest , res) => {

  const user = req.user;
  const validateProduct = await ProductZod.parseAsync(req.body);
  const {title, description, price, stocks, category, brand, owner} = validateProduct;

  if( !(title || description || price || stocks || category || brand)){
    throw new ApiError(400, "All fields are required");
  }

  const product = await Product.create({
    title: title.toLowerCase(),
    description: description.toLowerCase(),
    price: price,
    stocks: stocks,
    category: category.toLowerCase(),
    brand: brand.toLowerCase(),
    owner: user?._id
  });

  const createProduct = await Product.findById(product._id);

  if(!createProduct) {
    throw new ApiError(500, "Something went wrong while creating product");
  }
  
  return res.status(200).json(
    new ApiResponse(200, createProduct, "Product created successfully")
  );
});

export { 
  getAllProducts, 
  createProduct 
}
