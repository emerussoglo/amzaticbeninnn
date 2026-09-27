import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-session";
import {
  createProductSlug,
  parseProductInput,
  toStoreProduct,
} from "@/lib/product-input";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }
  try {
    const records = await db
      .select()
      .from(products)
      .orderBy(desc(products.createdAt));
    return NextResponse.json(records.map(toStoreProduct), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Base indisponible. Vérifie que le SQL a été exécuté dans Turso.",
      },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
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

  const now = new Date();
  try {
    const existingProducts = await db
      .select({ id: products.id })
      .from(products);
    const existingIds = new Set(existingProducts.map(({ id }) => id));
    const baseSlug = createProductSlug(product.name);
    let id = baseSlug;
    let duplicateNumber = 2;
    while (existingIds.has(id)) {
      id = `${baseSlug}-${duplicateNumber}`;
      duplicateNumber += 1;
    }

    const [created] = await db
      .insert(products)
      .values({
        id,
        ...product,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    return NextResponse.json(toStoreProduct(created), { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Enregistrement impossible. Vérifie que le SQL a été exécuté dans Turso.",
      },
      { status: 503 },
    );
  }
}
