#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import { blogConfig } from "./blog-config.ts";

blogConfig.readOnly = false;
await blogConfig.loadTheme();

await dev(import.meta.url, "./main.ts");
