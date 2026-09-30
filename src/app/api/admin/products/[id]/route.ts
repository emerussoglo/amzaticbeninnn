import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PRODUCTS_DATA, STATIC_PRODUCT_STORAGE_PREFIX } from "@/lib/catalog";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  isSafeImageSource,
  parseProductInput,
  toStoreProduct,
} from "@/lib/product-input";
import { parseImageList, removeUploadedImages } from "@/lib/product-images";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  const { id } = await params;
  if (id.startsWith(STATIC_PRODUCT_STORAGE_PREFIX)) {
    const staticId = id.slice(STATIC_PRODUCT_STORAGE_PREFIX.length);
    const staticProduct = PRODUCTS_DATA.find(
      (item) => item.id === staticId || String(item.legacyId) === staticId,
    );
    const input =
      body && typeof body === "object"
        ? (body as Record<string, unknown>)
        : null;
    const specifications = input?.specifications;
    const requestedImages = input?.images;
    const hasRequestedImages = requestedImages !== undefined;
    const imageList = Array.isArray(requestedImages) ? requestedImages : null;
    if (
      !staticProduct ||
      !isSpecificationsRecord(specifications) ||
      (hasRequestedImages &&
        (!imageList ||
          imageList.length < 1 ||
          imageList.length > 3 ||
          !imageList.every(isSafeImageSource)))
    ) {
      return NextResponse.json(
        { error: "Vérifie les caractéristiques du produit." },
        { status: 400 },
      );
    }

    const storageId = `${STATIC_PRODUCT_STORAGE_PREFIX}${staticProduct.legacyId ?? staticProduct.id}`;
    const now = new Date();
    try {
      const [previous] = await db
        .select({ image: products.image, images: products.images })
        .from(products)
        .where(eq(products.id, storageId))
        .limit(1);
      const previousImages = previous
        ? parseImageList(previous.images, previous.image)
        : [staticProduct.image];
      const nextImages = hasRequestedImages
        ? (imageList as string[])
        : previousImages;
      const [saved] = await db
        .insert(products)
        .values({
          id: storageId,
          name: staticProduct.name,
          description: "",
          brand: "",
          category: staticProduct.category,
          price: staticProduct.price,
          oldPrice: staticProduct.oldPrice ?? null,
          image: nextImages[0],
          images: JSON.stringify(nextImages),
          specifications: JSON.stringify(specifications),
          tag: staticProduct.tag ?? "",
          stock: 0,
          featured: false,
          active: false,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoUpdate({
          target: products.id,
          set: {
            image: nextImages[0],
            images: JSON.stringify(nextImages),
            specifications: JSON.stringify(specifications),
            active: false,
            updatedAt: now,
          },
        })
        .returning();
      await removeUploadedImages(
        previousImages.filter((image) => !nextImages.includes(image)),
      );
      return NextResponse.json(toStoreProduct(saved));
    } catch {
      return NextResponse.json(
        { error: "Enregistrement des caractéristiques impossible." },
        { status: 503 },
      );
    }
  }

  const product = parseProductInput(body);
  if (!product)
    return NextResponse.json(
      { error: "Vérifie les champs et les URL d’image." },
      { status: 400 },
    );

  try {
    const [previous] = await db
      .select({ image: products.image, images: products.images })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    const [updated] = await db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning();
    if (!updated)
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 404 },
      );
    if (previous) {
      const previousImages = parseImageList(previous.images, previous.image);
      const nextImages = parseImageList(product.images, product.image);
      await removeUploadedImages(
        previousImages.filter((image) => !nextImages.includes(image)),
      );
    }
    return NextResponse.json(toStoreProduct(updated));
  } catch {
    return NextResponse.json(
      { error: "Modification impossible." },
      { status: 503 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }
  const { id } = await params;
  try {
    if (id.startsWith(STATIC_PRODUCT_STORAGE_PREFIX)) {
      await db.delete(products).where(eq(products.id, id));
      return NextResponse.json({ deleted: true });
    }

    const [previous] = await db
      .select({ image: products.image, images: products.images })
      .from(products)
      .where(eq(products.id, id))
      .limit(1);
    const [deleted] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning({ id: products.id });
    if (!deleted)
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 404 },
      );
    if (previous) {
      await removeUploadedImages(
        parseImageList(previous.images, previous.image),
      );
    }
    return NextResponse.json({ deleted: true });
  } catch {
    return NextResponse.json(
      { error: "Suppression impossible." },
      { status: 503 },
    );
  }
}

function isSpecificationsRecord(
  value: unknown,
): value is Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  return (
    entries.length <= 30 &&
    entries.every(
      ([key, item]) =>
        key.trim().length > 0 &&
        key.length <= 80 &&
        typeof item === "string" &&
        item.trim().length > 0 &&
        item.length <= 300,
    )
  );
}
