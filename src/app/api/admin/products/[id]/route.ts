import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { parseProductInput, toStoreProduct } from "@/lib/product-input";
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
  const product = parseProductInput(body);
  if (!product)
    return NextResponse.json(
      { error: "Vérifie les champs et les URL d’image." },
      { status: 400 },
    );

  const { id } = await params;
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
