"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/features/products/productsSlice";
import { Button, TextField, Typography, Container, Grid } from "@mui/material";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { success } = useTypedSelector((state) => state.products);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct = {
      name,
      category,
      price: parseFloat(price),
      calories: parseInt(calories),
      quantity: parseInt(quantity),
      ingredients: ingredients
        .split(",")
        .map((ingredient) => ingredient.trim()),
    };

    dispatch(createProduct(newProduct));
    router.push("/");
    toast.success("Product created successfully");
  };

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Create Product
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
          <div className=" mt-6">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
};

export default CreateProductPage;
