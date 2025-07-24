import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({pattern: "**/[^_]*.md", base : './src/content/blog'}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		update: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = { blog };
