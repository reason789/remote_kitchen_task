"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { IProduct } from "@/interfaces/IProduct";

interface ProductCardProps {
  product: IProduct;
  handleDelete: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, handleDelete }) => {
  return (
    <Card className=" flex flex-col justify-between w-[48%] md:w-[30%] lg:w-[23%] ">
      <CardMedia
        className=" h-40"
        component="img"
        alt="product image"
        height="40"
        image={
          product.image
            ? product.image
            : "https://images.pexels.com/photos/2725744/pexels-photo-2725744.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
      />
      <CardContent>
        <div className="flex justify-between items-center">
          <Typography gutterBottom variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="primary"
            component="div"
          >
            ${product.price}
          </Typography>
        </div>
        <Typography variant="body2" color="text.secondary">
          Categories: <span className=" font-bold">{product.category}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Calories: <span className=" font-bold">{product.calories}g</span>
        </Typography>

        <div className="flex flex-wrap gap-1 mt-2">
          <Typography className="mt-2" variant="body2" color="text.primary">
            Ingredients:
          </Typography>
          {product.ingredients.map((ing, index) => (
            <p
              key={index}
              className=" text-xs bg-slate-100 rounded-sm px-[3px] space-x-2"
            >
              {ing}
            </p>
          ))}
        </div>
      </CardContent>
      <CardActions className="flex gap-2 sm:justify-end mb-1">
        <Link href={`products/update/${product._id}`} passHref>
          <Button variant="contained" size="small" color="primary">
            <CreateIcon />
          </Button>
        </Link>
        <Button
          variant="outlined"
          size="small"
          color="error"
          className=" bg-red-500 w-[20px] px-0"
          onClick={() => handleDelete(product._id)}
        >
          <DeleteIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
