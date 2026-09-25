import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { toStoreProduct } from "@/lib/product-input";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const records = await db
      .select()
      .from(products)
      .where(eq(products.active, true))
      .orderBy(desc(products.createdAt));
    return NextResponse.json(records.map(toStoreProduct), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Catalogue indisponible." },
      { status: 503 },
    );
  }
}
