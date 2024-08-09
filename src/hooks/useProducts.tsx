"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";

export const useProduct = () => {
  const useGetAllProducts = () =>
    useQuery({
      queryKey: ["products"],
      queryFn: () => getAllProducts(),
    });

  return {
    useGetAllProducts,
  };
};
