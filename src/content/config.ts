import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		post: z.coerce.date(),
		update: z.coerce.date().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional().default(false),
	}),
});

export const collections = { blog };
