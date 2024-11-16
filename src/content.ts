import { type CollectionEntry, getCollection } from "astro:content";

export const allBlogPosts = await getCollection("blog", ({data}) => import.meta.env.PROD ? !data.draft : true);

export type BlogPost = CollectionEntry<"blog">['data'];

