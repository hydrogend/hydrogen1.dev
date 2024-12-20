import type { Root } from 'hast';[
  
]
import { visit } from 'unist-util-visit';

export function rehypeEmbed() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href && typeof(node.properties.href) === 'string') {
        const url = new URL(node.properties.href);
        if (url.hostname === 'www.youtube.com') {
          node.tagName = 'iframe';
          node.properties = {
            src: `https://www.youtube.com/embed/${url.searchParams.get('v')}`,
            title: 'YouTube video player',
            frameborder: 0,
            allowfullscreen: true,
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          };
          node.children = [];
        } else if (url.hostname === 'twitter.com' || url.hostname === 'x.com') {
          node.tagName = 'blockquote';
          node.properties = {
            class: 'twitter-tweet',
            'data-lang': 'en',
          };
          node.children = [
            {
              type: 'text',
              value: 'Loading tweet...',
            },
          ];
        }
      }
    });
  };
}