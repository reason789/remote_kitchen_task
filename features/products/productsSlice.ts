import { createAsyncThunk, createSlice, PayloadAction  } from "@reduxjs/toolkit";
import getProducts from "./productsApi";
import {createProduct as createProductApi,deleteProduct, updateProduct as updateProductApi, getProductDetails} from "./productsApi";


export interface IProduct {
    _id: string;
    name: string;
    category: string;
    price: number;
    calories: number;
    ingredients: string[];
    quantity: number;
  }
  
  interface IState {
    products: IProduct[];
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    success: string | null;
    selectedProduct: IProduct | null;
  }
  
  const initialState: IState = {
    products: [],
    isLoading: false,
    isError: false,
    error: null,
    success: null,
    selectedProduct: null,
  };

  export const fetchProducts = createAsyncThunk('products/fetchProducts',
    async () => {
        const products = await getProducts()
        return products
    }
  )

  export const fetchProductDetails = createAsyncThunk('products/fetchProductDetails',
    async (id:string) => {
        const product = await getProductDetails(id)
        return product
    }
  )

  export const removeProduct = createAsyncThunk('products/removeProduct', async (productId: string) => {
    await deleteProduct(productId);
    return productId;
  });

  export const createProduct = createAsyncThunk('products/createProduct', async (product: IProduct) => {
    const createdProduct = await createProductApi(product);
    return createdProduct;
  });
  

  export const updateProduct = createAsyncThunk('products/updateProduct', async (product: IProduct) => {
    const updatedProduct = await updateProductApi(product);
    return updatedProduct;
  });



  const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(fetchProducts.pending, (state) =>{
          state.isError = false;
          state.isLoading = true
        }).addCase(fetchProducts.fulfilled,(state, action: PayloadAction<IProduct[]>) =>{
          state.isLoading = false;
          state.products = action.payload
        }).addCase(fetchProducts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.payload as string;
        })
        .addCase(fetchProductDetails.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
          state.selectedProduct = null;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.selectedProduct = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || 'Failed to fetch product details';
        })
        .addCase(createProduct.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(createProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.products.push(action.payload);
          state.success = `Product with ID ${action.payload._id} created successfully.`;
        })
        .addCase(createProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || 'Failed to create product';
        })
        .addCase(updateProduct.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          const updatedProduct = action.payload;
          state.products = state.products.map(product =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
          state.success = `Product with ID ${updatedProduct._id} updated successfully.`;
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || 'Failed to update product';
        })
        .addCase(removeProduct.pending, (state) => {
          state.isError = false;
          state.isLoading = true;
        })
        .addCase(removeProduct.fulfilled, (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.products = state.products.filter(product => product._id !== action.payload);
          state.success = `Product with ID ${action.payload} removed successfully.`;
        })
        .addCase(removeProduct.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message || 'Failed to remove product';
        });
    }
  })

  export default productsSlice.reducer