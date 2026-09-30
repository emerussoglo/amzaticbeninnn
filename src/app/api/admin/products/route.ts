import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { PRODUCTS_DATA, STATIC_PRODUCT_STORAGE_PREFIX } from "@/lib/catalog";
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
    const storedStaticProducts = new Map(
      records
        .filter((record) => record.id.startsWith(STATIC_PRODUCT_STORAGE_PREFIX))
        .map((record) => [record.id, toStoreProduct(record)]),
    );
    const managedProducts = records
      .filter((record) => !record.id.startsWith(STATIC_PRODUCT_STORAGE_PREFIX))
      .map(toStoreProduct);
    const staticProducts = PRODUCTS_DATA.map((product) => {
      const staticId = `${STATIC_PRODUCT_STORAGE_PREFIX}${product.legacyId ?? product.id}`;
      const storedProduct = storedStaticProducts.get(staticId);
      const images = storedProduct?.images.length
        ? storedProduct.images
        : [storedProduct?.image ?? product.image];
      return {
        id: staticId,
        name: product.name,
        description: "",
        brand: "",
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice ?? null,
        image: images[0],
        images,
        specifications: storedProduct?.specifications ?? {},
        tag: product.tag ?? "",
        stock: 0,
        featured: false,
        active: true,
        staticCatalog: true,
      };
    });
    return NextResponse.json([...managedProducts, ...staticProducts], {
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
