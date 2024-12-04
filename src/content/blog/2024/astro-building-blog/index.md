---
title: "Astroでブログを作った話"
description: "maccha Advent Calender 2024 day 6"
pubDate: "2024-12-06T12:15"
# update: "2024-11-19T16:00"
tags: ["maccha Advent Calender 2024", "Astro"]
---

この記事は[maccha Advent Calender 2024](https://adventar.org/calendars/10199)の6日目の記事です。

昨日は(null)さんによる「(null)」でした。いやー、(null)さん史上一番面白い記事でしたね。

## 本題

実は、このブログを作ったのは今年の11月のことだ。その時の記録を残しておこう。

### きっかけ

去年ぐらいからブログ予定地としてGitHub Pagesを使ったページを公開していたが、単に`UNDER CONSTRUCTION`と書かれているだけのページであった。ここから一切手を付けずに放置して今年の11月になってしまった。

8月ごろにとある理由で新たなドメイン名`hydrogen1.dev`を取得した私は、ついでにこのブログも新しく作り直そうと思い立った。そこで友人の[ryota2357](https://ryota2357.com)君が使っているAstroという静的サイトジェネレーターを使ってみることにした。

このサイトのデザインの大部分はryota2357君のサイトを参考に作ったといっても過言ではない。感謝。

### 準備

まず、GitHubのリポジトリから`UNDER CONSTRUCTION`のページを消し飛ばし次のコマンドを実行した。

```bash
npm create astro@latest
```

テンプレートは公式が提供しているブログ用のものを選択した。その後、`npm run dev`を実行してローカルでサイトを確認した。

開発の準備として、`tsconfig.json`を編集して`@/aaa`を`src/aaa`と解釈するようにした。

```json
    "paths": {
      "@/*": ["./src/*"]
    }
```

また、僕は[今日のhydrogen Advent Calenderの記事](../axiom-of-regularity/)にもある通り数式を使うことが多いので、$\LaTeX$を使えるようにするためにremark-mathとrehype-katexをインストールした。

```bash
npm install remark-math rehype-katex
```

`astro.config.mjs`に以下のように設定を追加した。

```javascript
import { remarkMath } from 'remark-math'
import rehypeKatex from 'rehype-katex'
...
export default {
  ...
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
  ...
}
```

以前から使ってみたいと思っていたtailwindも導入した。

```bash
npx astro add tailwind
```

`astro.config.mjs`に以下のように設定を追加した。

```javascript
import { tailwind } from '@astro/tailwind'
...
export default {
  ...
  plugins: [
    ...,
    tailwind()
  ],
  ...
}
```

tailwindのデフォルトの設定では、番号付きリストタグ`<ol>`の要素に番号がつかないので、`tailwind.config.js`に以下の設定を追加した。

```javascript
import plugin from 'tailwindcss/plugin'

export default {
  ...
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'ol': {
          listStyleType: theme('listStyleType.decimal'),
          listStylePosition: 'inside',
        },
      })
    }),
  ]
  ...
}
```

これで、記事本体のMarkdownに番号付きリストを使うことができるようになった。

### 記事をMarkdownで書く

記事の一覧を管理するためAstroのcollectionを使って次のように属性を定義した。

```ts
const blog = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce().date(),
        tags: z.array(z.string()),
        draft: z.boolean().optional(),
    }),
})
```

そして、ブログ記事を表示できるようにすべく`[year]/[slug].astro`を作成し、`getStaticPaths`を定義した。

このメゾットは`params`に`[year]`などのカッコ内の文字列としてあり得るものを、その時に`props`に渡す値の配列を返す。
このようにして、柔軟にページを生成することができる。

そして、記事の属性自体はMarkdownファイルの先頭に次のように記述することで、Astroが自動的に認識する。

```mdx
---
title: "Astroでブログを作った話"
description: "maccha Advent Calender 2024 day 6"
pubDate: "2024-12-06T11:15"
tags: ["maccha Advent Calender 2024", "Astro"]
---
```

### タグで整理

記事をタグで整理するために、記事のtags属性で指定したタグをもとに記事を分類するページを作成した。

```ts
const allTags = Array.from(allBlogPosts.flatMap(post => post.data.tags)
        .reduce((map, tag) => map.set(tag, (map.get(tag) ?? 0) + 1), new Map<string, number>())
        .entries())
    .map(([tag, count]) => ({ tag, count }));
```

このようにして、各タグの名前と記事数を取得し、それをもとにタグ一覧ページを作成した。

### まとめ

こんな感じでこのブログを作った。まだまだ改善点は多いが、とりあえずはこれでいいだろう。

明日はUdon君によるアドカレ乱立2024についての記事です。
