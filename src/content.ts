import { type CollectionEntry, getCollection } from "astro:content";

export type BlogPostMeta = CollectionEntry<"blog">;
export type BlogPost = CollectionEntry<"blog">['data'];

export const allBlogPosts: BlogPostMeta[] = await getCollection("blog", ({data}) => import.meta.env.PROD ? !data.draft : true);
export const allPublicBlogPosts: BlogPostMeta[] = allBlogPosts.filter(({data}) => !data.limited);

export const allTags: { tag: string, count: number }[] = 
    Array.from(allPublicBlogPosts.flatMap(post => post.data.tags)
        .reduce((map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1), new Map<string, number>())
        .entries())
    .map(([tag, count]) => ({ tag, count }));

export function getBlogPostsByTag(tag: string): CollectionEntry<"blog">[] {
    return allPublicBlogPosts.filter(post => post.data.tags.includes(tag));
}

export function digestSlug(slug: string): { year: number, rest: string } {
    const match = slug.match(/^(\d{4})\/([^\/]+)$/);
    if (!match) throw new Error(`Invalid slug: ${slug}`);
    const [, yearStr, rest] = match;
    const year = parseInt(yearStr);
    return { year, rest };
}
