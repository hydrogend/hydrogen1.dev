---
title: "濃度のお話"
description: "hydrogen Advent Calender 2024 day 13"
pubDate: "2024-12-13T00:08"
tags: ["hydrogen Advent Calender 2024", "数学", "集合論", "ZFC公理系"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の13日目の記事です。

## 本題

有限集合における要素の個数の概念を拡張したものとして、集合の濃度というものが定義される。これは、集合の要素の「数え方」という点に着目して拡張したものである。

以下において、$X,Y$を集合とする。

### 濃度の比較の定義

$$
\begin{aligned}
|X| = |Y| &\Leftrightarrow \exists f: X\to Y, f\text{は全単射}\\
|X| \leq |Y| &\Leftrightarrow \exists f: X\to Y, f\text{は単射}\\
\end{aligned}
$$

このようにして、濃度が実際にどのような集合であるかを気にすることなく、濃度の比較を行うことができる。$|X|=|Y|$で1つの記号とみなすことで$|X|$自体を気にする必要がなくなる。

ただ、濃度に演算を導入したりしたいときにはこれでは不十分であり、直接$|X|$が何者であるかを論ずる必要がある。

有限集合においては、濃度は自然数で表現される。では、無限集合においては自然数の拡張である順序数を用いて濃度を定義するのがよさそうである。

### 濃度の定義

集合$X$の濃度を$|X|$と書く。

$$
|X|:=\min\{\alpha: \text{順序数}|\exists f: \alpha\to X, f\text{は全単射}\}
$$

このようにすると、濃度は順序数で表現される。また、濃度の比較も順序数の比較に帰着される。

例えば、可算濃度$\aleph_0$は$\omega$で表現される。また、最小の非可算順序数$\omega_1$の濃度は$\aleph_1$で表現される。

$\omega$とは、自然数全体の集合であったから$|\mathbb{N}|=\aleph_0$である。また、簡単に$|\mathbb{Z}|=|\mathbb{Q}|=\aleph_0$である。

では、$|\mathbb{R}|$はどうであろうか。対角線論法から$|\mathbb{R}|>\aleph_0$であることと、$|\mathbb{R}|=|\mathcal{P}(\mathbb{N})|$はわかっているが、具体的に$|\mathbb{R}|=\aleph_\alpha$となる$\alpha$は何であろうか。

実は、これはZFCからは決定できない問題である。

しかし、ZFC上でも$\alpha$としてあり得ないものは存在する。

これを解説するために、次回以降の記事で共終という概念を扱っていきたい。
