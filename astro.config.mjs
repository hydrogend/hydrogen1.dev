// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.hydrogen1.dev',
    integrations: [mdx(), sitemap(), tailwind()],
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [[rehypeKatex, {
            macros: {
                "\\RR": "\\mathbb{R}",
                "\\CC": "\\mathbb{C}",
                "\\ZZ": "\\mathbb{Z}",
                "\\NN": "\\mathbb{N}",
                "\\QQ": "\\mathbb{Q}",
                "\\cf": "\\mathrm{cf}",
                "\\dom": "\\mathrm{dom}",
                "\\cod": "\\mathrm{cod}",
                "\\id": "\\mathrm{id}",
                "\\Im": "\\mathrm{Im}",
                "\\Re": "\\mathrm{Re}",
                "\\Hom": "\\mathrm{Hom}",
                "\\Ker": "\\mathrm{Ker}",
                "\\eps": "\\epsilon",
                "\\defeqn": "\\overset{\\mathrm{def}}{\\Leftrightarrow}",
                "\\defequiv": "\\stackrel{\\mathrm{def}}{\\equiv}",
                "\\eqn": "\\Leftrightarrow",
            },
            strict: "ignore",
            trust: (context) => context.command === "\\htmlStyle"
        }]],
    },
});