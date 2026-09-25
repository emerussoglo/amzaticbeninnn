import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  brand: text("brand").notNull().default(""),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  image: text("image").notNull(),
  images: text("images").notNull().default("[]"),
  specifications: text("specifications").notNull().default("{}"),
  tag: text("tag").notNull().default(""),
  stock: integer("stock").notNull().default(0),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const mediaFiles = sqliteTable("media_files", {
  id: text("id").primaryKey(),
  contentType: text("content_type").notNull(),
  data: blob("data", { mode: "buffer" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export type ProductRecord = typeof products.$inferSelect;
export type NewProductRecord = typeof products.$inferInsert;
