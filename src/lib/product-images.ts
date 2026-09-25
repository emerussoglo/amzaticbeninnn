import "server-only";

import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { mediaFiles } from "@/db/schema";

export function parseImageList(
  serializedImages: string,
  fallbackImage: string,
) {
  try {
    const images = JSON.parse(serializedImages) as unknown;
    return Array.isArray(images) &&
      images.every((image) => typeof image === "string")
      ? (images as string[])
      : [fallbackImage];
  } catch {
    return [fallbackImage];
  }
}

export async function removeUploadedImages(imageUrls: string[]) {
  const mediaIds = imageUrls.flatMap((url) => {
    const match = url.match(/^\/api\/media\/([0-9a-f-]{36})$/i);
    return match ? [match[1]] : [];
  });
  if (mediaIds.length > 0) {
    await db.delete(mediaFiles).where(inArray(mediaFiles.id, mediaIds));
  }
}
