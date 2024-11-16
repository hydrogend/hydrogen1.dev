import { type CollectionEntry, getCollection } from "astro:content";

export const allBlogPosts = await getCollection("blog", ({data}) => import.meta.env.PROD ? !data.draft : true);

export type BlogPost = CollectionEntry<"blog">['data'];

export const allTags: { tag: string, count: number }[] = (() => {
    const tagMap = allBlogPosts.flatMap(post => post.data.tags)
        .reduce((map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1), new Map<string, number>());
    return [...tagMap].map(([tag, count]) => ({ tag, count }));
})();

export function getBlogPostsByTag(tag: string) {
    return allBlogPosts.filter(post => post.data.tags.includes(tag));
}