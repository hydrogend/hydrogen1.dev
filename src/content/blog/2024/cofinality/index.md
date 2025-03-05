---
title: "順序数の共終"
description: "hydrogen Advent Calender 2024 day 14"
pubDate: "2024-12-14T00:08"
tags: ["hydrogen Advent Calender 2024", "数学", "集合論", "ZFC公理系"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の14日目の記事です。

## 基数

$$
\text{順序数}\alpha\text{が基数}\defeqn|\alpha|=\alpha
$$

濃度が自分自身と等しい順序数を基数と呼ぶ。基数は濃度を表す数である。

例えば、$\omega$は基数である。また、自然数は全て基数である。

## 非有界

以下、$\alpha,\beta$を順序数とする。

$$
X\subseteq\alpha\text{が非有界}\defeqn\forall\beta\in X,\exists\gamma\in\alpha,\beta<\gamma
$$

まあ、言うまでもないことである。上には上がいるという性質をそのまま表しているだけである。

## 共終

関数$f$の共終を次のように定義する。

$$
f:\beta\to\alpha\text{が共終}\defeqn f(\beta)\text{が非有界}
$$

この共終という概念を用いて共終数というものを定義できる。

$$
\cf(\alpha):=\min\{\beta|\exists f:\beta\to\alpha\text{は共終}\}
$$

この$\cf(\alpha)$が$\alpha$の共終数と呼ばれるものである。

そして、$\cf(\alpha)=\alpha$なる順序数$\alpha$を正則順序数と呼ぶ。

### 例

1. $\cf(\omega)=\omega$

共終な$f:n\to\omega$が存在すると仮定する。

$n$は有限であるから、$f(n)$は有限であり、$m=\max f(n)$なる$m$が存在する。

ここで、$m+1\in\omega$であるから、矛盾。

2. $\cf(\omega+\omega)=\omega$

$$
\begin{aligned}
f:&\omega\to\omega+\omega; n\mapsto\omega+n
\end{aligned}
$$

とすると、$f(\omega)$は非有界である。

$\omega$の時と同様に$\cf(\omega+\omega)<\omega$と仮定すると矛盾するので、$\cf(\omega+\omega)=\omega$である。

3. $\cf(\omega\cdot\omega)=\omega$
4. $\cf(\omega^\omega)=\omega$
5. $\cf(\omega_1)=\omega_1$

### 正則性

ここまでの例で何となく察してもらえたかもしれないが、正則順序数というのは$\alpha$個未満の列から得ることのできない順序数である。

注意すべきは基数であれば正則順序数であるとは限らないということである。

例えば、$\cf(\omega_\omega)=\omega$であるが$\omega_\omega$は基数である。

これを用いて、濃度についての議論を進めていきたい。
