---
title: "正則性公理と集合論の世界"
description: "hydrogen Advent Calender 2024 day 6"
pubDate: "2024-12-06T12:15"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "数学", "集合論", "ZFC公理系"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の6日目の記事です。

## そもそも正則性公理とは

正則性公理とは、空でない集合は自身と交わらない元を持つという次のような主張である。

$$
\forall x (\exists a \in x \Rightarrow \exists y (y \in x \land \forall z (z \in x \Rightarrow z \notin y)))
$$

## $x \notin x$

ここから、$x \notin x$が次のようにして導かれる。

集合$\{x\}$に対して、正則性公理を適用すると

$$
\exists y (y \in \{x\} \land \forall z (z \in \{x\} \Rightarrow z \notin y))
$$

$\{x\}$は$x$以外の元を持たないので$y$及び$z$は$x$以外を取りえないから

$$
x \notin x
$$

## 累積的階層

一昨日の記事では、この正則性公理が極めて重大な意味を持つことを述べた。それについて解説していこう。

順序数$\alpha$に対して$V_\alpha$を次のように定義する。順序数については[昨日の記事](../ordinal-number-inst/)を参照してほしい。

$$
\begin{align*}
V_0 &:= \emptyset \\
V_{\alpha+1} &:= \mathcal{P}(V_\alpha) \\
V_\lambda &:= \bigcup_{\beta<\lambda}V_\beta &(\lambda\text{は極限順序数})
\end{align*}
$$

この$V_\alpha$は空集合から始まり、そのひとつ前の$V_\alpha$の冪集合を取ることで次の$V_{\alpha+1}$を定め、極限順序数の場合はそれまでの$V_\beta$を取りまとめることで$V_\lambda$を定める。

そして、正則性公理は次のような主張と同値である。

$$
\forall x \exists \alpha (x \in V_\alpha)
$$

これは、どんな集合であってもそれが何らかの$V_\alpha$の元であるということを述べている。

そして、$V_\alpha$は空集合から冪集合を取り続けてまとめていくことで得られるものであるから、すなわちいかなる集合も空集合から作られるということを意味している。

そのため、一昨日の記事では空集合は全ての集合の「親」であるとも言えると述べたのだ。

因みに、$x\in V_\alpha$を満たすような最小の$\alpha$を$x$の階数と呼び、$\operatorname{rank}(x)$と書く。
