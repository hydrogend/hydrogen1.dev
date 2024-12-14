---
title: "連続体仮説"
description: "hydrogen Advent Calender 2024 day 15"
pubDate: "2024-12-15T02:28"
tags: ["hydrogen Advent Calender 2024", "数学", "集合論", "ZFC公理系"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の15日目の記事です。

## 連続体仮説

連続体仮説とは、次のような命題である。

$$
|\RR|=\aleph_1
$$

この命題は、実数全体の集合$\RR$の濃度が可算濃度$\aleph_0$より大きい最小の濃度$\aleph_1$であるというものである。

この命題が、ZFC公理系から独立であることは広く知られた事実である。そして、実は$|\RR|=|\mathcal{P}(\NN)|$であるからこれは冪集合の濃度がZFC公理系から導けないことを意味している。

このことは、たとえば次のように仮定しても矛盾しないということであろうか。

$$
|\RR|=\aleph_\omega
$$

こんなに大きな濃度を持つと仮定しても矛盾しないということは、本当にあるのであろうか。

実は、ZFC公理系の範囲内でも冪集合の濃度に対するある程度の制約を与えることは可能である。

## 共終数

次のような命題が成り立つ。

$$
\cf(\aleph_\alpha)=\omega\Rightarrow|\RR|\neq\aleph_\alpha
$$

この命題は、共終数が$\omega$であるような濃度$\aleph_\alpha$を用いて$|\RR|=\aleph_\alpha$と仮定すると矛盾するというものである。

それゆえに、$|\RR|=\aleph_\omega$ではないということが示される。だが、$|\RR|=\aleph_{\omega+1}$とした場合はどうであろうか。

この場合、$\cf(\aleph_{\omega+1})=\aleph_{\omega+1}$であるから、上の命題が適用できない。ゆえに、$|\RR|=\aleph_{\omega+1}$と仮定しても矛盾しない。

そう。別に$\RR$の濃度が極端に大きすぎないというような制限はないのである。

そして、ZFCにおいて正則基数$\lambda$の冪集合の濃度に対する制約は次の2つしか存在しない。

1. $\forall \kappa\leq\lambda,|\mathcal{P}(\kappa)|\leq|\mathcal{P}(\lambda)|$
2. $\cf(|\mathcal{P}(\lambda)|)>\lambda$

正直、成り立っていて当然のような制約である。だが、これ以外の制約は存在しないのである。

それゆえに、[だいぶ前](../zfc-axioms/)で冪集合を取るという操作はある種超越的であると述べたのである。
