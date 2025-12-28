import rss from '@astrojs/rss';
import { allPublicBlogPosts } from '@/content';

export async function GET(context) {
	return rss({
		title: "Hydrogen Home Space",
		description: "Hydrogen's Site",
		site: context.site,
		items: allPublicBlogPosts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
