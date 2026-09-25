CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  description TEXT DEFAULT '' NOT NULL,
  brand TEXT DEFAULT '' NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  old_price INTEGER,
  image TEXT NOT NULL,
  images TEXT DEFAULT '[]' NOT NULL,
  specifications TEXT DEFAULT '{}' NOT NULL,
  tag TEXT DEFAULT '' NOT NULL,
  stock INTEGER DEFAULT 0 NOT NULL,
  featured INTEGER DEFAULT 0 NOT NULL,
  active INTEGER DEFAULT 1 NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS products_active_idx ON products (active);
CREATE INDEX IF NOT EXISTS products_featured_idx ON products (featured, active);

CREATE TABLE IF NOT EXISTS media_files (
  id TEXT PRIMARY KEY NOT NULL,
  content_type TEXT NOT NULL,
  data BLOB NOT NULL,
  created_at INTEGER NOT NULL
);