"use client";

import { useEffect, useState } from "react";
import type { StoreProduct } from "@/lib/product-input";

export function useStoreProducts() {
  const [products, setProducts] = useState<StoreProduct[]>([]);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((response) =>
        response.ok ? (response.json() as Promise<StoreProduct[]>) : [],
      )
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  return products;
}
