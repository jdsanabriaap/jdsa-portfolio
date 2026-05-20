import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    clean: true,
  },
  collections: {
    projects: {
      name: "Project",
      pattern: "projects/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(120),
          slug: s.slug("projects"),
          status: s.enum(["active", "completed", "archived"]),
          period: s.string(),
          client: s.string(),
          tags: s.array(s.string()),
          summary: s.string(),
          teaser: s.array(s.string()).default([]),
          featured: s.boolean().default(false),
          order: s.number(),
          lang: s.enum(["es", "en"]),
          code: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          permalink: `/projects/${data.slug}`,
        })),
    },
  },
});
