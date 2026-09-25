import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
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
    if (!product)
      return NextResponse.json(
        { error: "Produit introuvable." },
        { status: 404 },
      );
    return NextResponse.json(toStoreProduct(product), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Catalogue indisponible." },
      { status: 503 },
    );
  }
}
