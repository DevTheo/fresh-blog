CREATE INDEX IF NOT EXISTS CmsItems_name on CmsItems (name);

CREATE INDEX IF NOT EXISTS BlogPosts_slug on BlogPosts (slug);

CREATE INDEX IF NOT EXISTS BlogPosts_publishedAt_title on BlogPosts (publishedAt, title);
