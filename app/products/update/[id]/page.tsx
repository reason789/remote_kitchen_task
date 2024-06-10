"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  updateProduct,
} from "@/features/products/productsSlice";
import { RootState } from "@/store";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProductPage = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const productId = params.id;
  const router = useRouter();

  const { selectedProduct, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setCategory(selectedProduct.category);
      setPrice(selectedProduct.price.toString());
      setCalories(selectedProduct.calories.toString());
      setIngredients(selectedProduct.ingredients.join(", "));
      setQuantity(selectedProduct.quantity.toString());
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      _id: productId,
      name,
      category,
      price: parseFloat(price),
      calories: parseInt(calories),
      quantity: parseInt(quantity),
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };

    dispatch(updateProduct(updatedProduct));
    router.push("/"); // Redirect to products list after submission
    toast.success("Product updated successfully");
  };

  // if (isLoading) {
  //   return (
  //     <Container>
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Category"
                variant="outlined"
                fullWidth
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Calories"
                variant="outlined"
                fullWidth
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Ingredients (comma separated)"
                variant="outlined"
                fullWidth
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </Grid>
          </Grid>
          <div className="mt-6">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default EditProductPage;
