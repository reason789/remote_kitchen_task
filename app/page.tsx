"use client";

import { useEffect } from "react";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../lib/store";
import { fetchProducts } from "@/features/products/productsSlice";
import { FaCirclePlus } from "react-icons/fa6";

import Button from "@mui/material/Button";
import ProductCard from "@/components/Card";
import { removeProduct } from "@/features/products/productsSlice";
import Link from "next/link";
import Loader from "@/components/Loader";
import { IProduct } from "@/interfaces/IProduct";
import { toast } from "react-hot-toast";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { products, isLoading, isError, error } = useTypedSelector(
    (state) => state.products
  );
  const { success } = useTypedSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, success]);

  const handleDelete = (id: string) => {
    dispatch(removeProduct(id));
    toast.success("Product deleted successfully");
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (isError) {
      return <h1>{error}</h1>;
    }

    return (
      <div className=" mt-8 px-4 md:px-8 lg:px-16 xl:px-32  max-w-screen-xl m-auto relative">
        <div className=" flex gap-4">
          <Link href="/products/create" passHref>
            <Button variant="outlined" startIcon={<FaCirclePlus />}>
              Add Product
            </Button>
          </Link>
        </div>
        <div className="mt-8">
          {products.length > 0 ? (
            <div className="flex gap-x-2 md:gap-x-4 gap-y-16 flex-wrap">
              {products.map((product: IProduct) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <>
              {isLoading == false && products.length > 0 && (
                <div className="flex justify-center items-center h-64">
                  <p className="text-lg text-gray-600">
                    No products available.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return renderContent();
}
