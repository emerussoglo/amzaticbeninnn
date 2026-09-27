import type { NewProductRecord, ProductRecord } from "@/db/schema";

export type StoreProduct = Omit<ProductRecord, "images" | "specifications"> & {
  images: string[];
  specifications: Record<string, string>;
};

export type ProductInput = Omit<
  NewProductRecord,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "description"
  | "brand"
  | "oldPrice"
  | "images"
  | "specifications"
  | "tag"
  | "stock"
  | "featured"
  | "active"
> & {
  description: string;
  brand: string;
  oldPrice: number | null;
  images: string;
  specifications: string;
  tag: string;
  stock: number;
  featured: boolean;
  active: boolean;
};

export function createProductSlug(name: string): string {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "produit";
}

function isSafeImageSource(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 2048) return false;
  if (
    value.startsWith("/img/") ||
    value.startsWith("/uploads/") ||
    /^\/api\/media\/[0-9a-f-]{36}$/i.test(value)
  )
    return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function parseProductInput(value: unknown): ProductInput | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const textFields = [
    "name",
    "category",
    "description",
    "brand",
    "tag",
  ] as const;
  if (textFields.some((field) => typeof input[field] !== "string")) return null;

  const name = (input.name as string).trim();
  const category = (input.category as string).trim();
  const description = (input.description as string).trim();
  const brand = (input.brand as string).trim();
  const tag = (input.tag as string).trim();
  const price = input.price;
  const oldPrice = input.oldPrice;
  const stock = input.stock;
  const images = input.images;
  const specifications = input.specifications;

  if (
    !name ||
    name.length > 160 ||
    !category ||
    category.length > 80 ||
    description.length > 10000 ||
    brand.length > 80 ||
    tag.length > 80 ||
    !Number.isSafeInteger(price) ||
    Number(price) < 0 ||
    !(
      oldPrice === null ||
      oldPrice === undefined ||
      (Number.isSafeInteger(oldPrice) && Number(oldPrice) >= 0)
    ) ||
    !Number.isSafeInteger(stock) ||
    Number(stock) < 0 ||
    !Array.isArray(images) ||
    images.length < 1 ||
    images.length > 8 ||
    !images.every(isSafeImageSource) ||
    !specifications ||
    typeof specifications !== "object" ||
    Array.isArray(specifications)
  ) {
    return null;
  }

  const specificationEntries = Object.entries(
    specifications as Record<string, unknown>,
  );
  if (
    specificationEntries.length > 30 ||
    specificationEntries.some(
      ([key, item]) =>
        !key.trim() ||
        key.length > 80 ||
        typeof item !== "string" ||
        item.length > 300,
    )
  )
    return null;

  return {
    name,
    category,
    description,
    brand,
    tag,
    price: Number(price),
    oldPrice:
      oldPrice === null || oldPrice === undefined ? null : Number(oldPrice),
    stock: Number(stock),
    image: images[0],
    images: JSON.stringify(images),
    specifications: JSON.stringify(Object.fromEntries(specificationEntries)),
    featured: input.featured === true,
    active: input.active !== false,
  };
}

export function toStoreProduct(product: ProductRecord): StoreProduct {
  let images: string[] = [];
  let specifications: Record<string, string> = {};
  try {
    images = JSON.parse(product.images) as string[];
  } catch {
    images = [product.image];
  }
  try {
    specifications = JSON.parse(product.specifications) as Record<
      string,
      string
    >;
  } catch {
    specifications = {};
  }
  return { ...product, images, specifications };
}
