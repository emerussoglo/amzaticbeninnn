import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PRODUCTS_DATA, STATIC_PRODUCT_STORAGE_PREFIX } from "@/lib/catalog";
import { toStoreProduct } from "@/lib/product-input";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const [product] = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.active, true)))
      .limit(1);
    if (product)
      return NextResponse.json(toStoreProduct(product), {
        headers: { "Cache-Control": "no-store" },
      });

    const staticProduct = PRODUCTS_DATA.find((item) => String(item.id) === id);
    const [storedSpecifications] = staticProduct
      ? await db
          .select()
          .from(products)
          .where(
            and(
              eq(
                products.id,
                `${STATIC_PRODUCT_STORAGE_PREFIX}${staticProduct.id}`,
              ),
              eq(products.active, false),
            ),
          )
          .limit(1)
      : [];

    if (!staticProduct || !storedSpecifications)
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 404 },
      );

    const storedProduct = toStoreProduct(storedSpecifications);
    return NextResponse.json(
      {
        ...storedProduct,
        id,
        name: staticProduct.name,
        category: staticProduct.category,
        price: staticProduct.price,
        oldPrice: staticProduct.oldPrice ?? null,
        image: staticProduct.image,
        images: [staticProduct.image],
        tag: staticProduct.tag ?? "",
      },
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Catalogue indisponible." },
      { status: 503 },
    );
  }
}
