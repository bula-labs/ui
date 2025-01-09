import path from "node:path";
import $fs, { promises as fs } from "node:fs";

import { serve } from "@hono/node-server";
import { Hono } from "hono/tiny";

const app = new Hono();

async function getComponentsMetadata() {
  const publicPath = path.resolve(process.cwd(), "public");

  const componentsMetadataFile = path.resolve(
    publicPath,
    "components.metadata.json",
  );

  if (!$fs.existsSync(componentsMetadataFile)) {
    console.warn("components metadata file not found");
    return [];
  }

  const metadataContent = await fs.readFile(componentsMetadataFile, "utf-8");
  try {
    return JSON.parse(metadataContent);
  } catch (_err) {
    console.error("Error occurred while parsing metadata object");
    return [];
  }
}

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/components", async (ctx) => {
  const data = await getComponentsMetadata();
  return ctx.json(data);
});

app.get("/component/:componentName", async (ctx) => {
  const { componentName } = ctx.req.param();
  const metadata = await getComponentsMetadata();

  const component = metadata.find(
    (meta: { name: string }) => meta.name === componentName,
  );

  return ctx.json(component ?? {});
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
