import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { mediaFiles } from "@/db/schema";
import { isAdminAuthenticated } from "@/lib/admin-session";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const imageTypes = {
  "image/jpeg": {
    signature: (bytes: Buffer) =>
      bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  "image/png": {
    signature: (bytes: Buffer) =>
      bytes
        .subarray(0, 8)
        .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
  },
  "image/webp": {
    signature: (bytes: Buffer) =>
      bytes.toString("ascii", 0, 4) === "RIFF" &&
      bytes.toString("ascii", 8, 12) === "WEBP",
  },
} as const;

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Connexion requise." }, { status: 401 });
  }

  let image: FormDataEntryValue | null;
  try {
    image = (await request.formData()).get("image");
  } catch {
    return NextResponse.json({ error: "Fichier invalide." }, { status: 400 });
  }
  if (
    !(image instanceof File) ||
    image.size === 0 ||
    image.size > MAX_IMAGE_BYTES
  ) {
    return NextResponse.json(
      { error: "Choisis une image de 5 Mo maximum." },
      { status: 400 },
    );
  }

  const type = imageTypes[image.type as keyof typeof imageTypes];
  if (!type) {
    return NextResponse.json(
      { error: "Formats acceptés : JPEG, PNG ou WebP." },
      { status: 400 },
    );
  }

  const bytes = Buffer.from(await image.arrayBuffer());
  if (!type.signature(bytes)) {
    return NextResponse.json(
      { error: "Le contenu du fichier ne correspond pas à une image valide." },
      { status: 400 },
    );
  }

  const id = randomUUID();
  try {
    await db.insert(mediaFiles).values({
      id,
      contentType: image.type,
      data: bytes,
      createdAt: new Date(),
    });
    return NextResponse.json({ url: `/api/media/${id}` }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error:
          "Impossible d’enregistrer l’image. Vérifie le SQL media_files dans Turso.",
      },
      { status: 503 },
    );
  }
}
