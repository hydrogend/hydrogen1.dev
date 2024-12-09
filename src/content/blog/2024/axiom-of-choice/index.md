---
title: "選択公理といろいろな話"
description: "hydrogen Advent Calender 2024 day 10 / MMA Advent Calender 2024 day 10"
pubDate: "2024-12-10T00:08"
tags: ["hydrogen Advent Calender 2024", "MMA Advent Calender 2024", "数学", "集合論", "ZFC公理系"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の10日目の記事です。[MMA Advent Calender 2024](https://adventar.org/calendars/10770)の10日目の記事でもあります。

昨日の記事はshiragi君による[Catalyst 9300のapp hostingでsshサーバーを構築してみる](https://zenn.dev/shiragi/articles/3ae11b1db956dd)でした。

部内システムの開発と保守を担当している彼には頭が上がりません。

## 選択公理とは

選択公理の主張を再掲しておこう。

$$
\forall x (\forall y (y \in x \Rightarrow y \neq \emptyset) \Rightarrow \exists z \forall y (y \in x \Rightarrow \exists w (w \in y \land w \in z)))
$$

この公理によって、空でない集合のみからなる集合$x$に対して、$x$の要素$y$の1つ1つから要素を取り出して集めた集合$z$が存在することを述べている。そして、$z=f(x)$なる関数$f$を選択関数と呼ぶ。

実は注意すべき事項が1つあり、この公理によって可能となる操作は無限集合から特に明確な条件なく適当に要素を選び出すというものである。取り出す要素がただ1つに定まるような明確な条件が存在するならば選択公理は必要ない。このような操作が可能であることは置換公理によって保証されるからである。

## 選択公理から得られる結果

選択公理と同値な命題として次のものがある。

1. 任意の集合$x$に対して、整列順序$\leq$を導入することができる(整列可能定理)
2. 任意の半順序集合$x$に対して、その全順序な部分集合のすべてが上界を持つならば、$x$には少なくとも1つ極大元が存在する(Zornの補題)
3. 任意のベクトル空間は基底を持つ

また、選択公理から得られる命題として次のものがある。

1. Lebesgue非可測な集合が存在する
2. 任意の体に対して、その代数閉包が存在する

また、選択公理と似たようなことを述べるより弱い公理として次のものがある。

1. $x$を可算濃度の集合に限定した選択公理(可算選択公理)
2. 任意の集合$x$上の関係$R$が$\forall a\in X,\exist b\in X,aRb$を満たすとき、$x_nRx_{n+1}$なる列$\{x_n\}_{n\in\omega}$が存在する(従属選択公理)

なお、$\text{従属選択公理}\Rightarrow\text{可算選択公理}$である。

