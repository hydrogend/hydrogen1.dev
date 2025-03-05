import rss from '@astrojs/rss';
import { allBlogPosts } from '@/content';

export async function GET(context) {
	return rss({
		title: "Hydrogen Home Space",
		description: "Hydrogen's Site",
		site: context.site,
		items: allBlogPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.slug}/`,
		})),
	});
}
