---
title: "整数や実数などの構成"
description: "hydrogen Advent Calender 2024 day 20"
pubDate: "2024-12-20T16:05"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "数学", "代数学"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の20日目の記事です。
$\gdef\eqn{\Leftrightarrow}$

## 同値関係と商集合

まず、集合$A$上の関係$R\subset A\times A$が同値関係であるとは、次の3条件を満たすことを言う。

1. 反射律: $\forall x\in A, xRx$
2. 対称律: $\forall x,y\in A, xRy\Rightarrow yRx$
3. 推移律: $\forall x,y,z\in A, xRy\land yRz\Rightarrow xRz$

この同値関係$R$を用いて、集合$A$を$R$で区分けすることができる。$x\in A$に対して、$R$による同値類$[x]$を次のように定める。

$$
[x] := \{y\in A\mid xRy\}
$$

すると同値類について以下の性質が成り立つ。

1. $\forall x,y\in A, [x]=[y]\lor[x]\cap[y]=\emptyset$
2. $\forall x\in A,\forall a,b\in [x], [a]=[b]$

また、$A$は$R$による同値類の集合$\{[x]\mid x\in A\}$によって分割される。この同値類の集合を商集合といい、$A/R$と書く。

この商集合を使うことで、自然数から整数、整数から有理数、実数から複素数などの構成が可能となる。

自然数自体は[だいぶ前の記事](../ordinal-number-inst/)で空集合と後者関数を用いて構成したので、整数も有理数も集合論上で構成することが出来たといえよう。

また、順序対$(a,b)$を$(a,b):=\{\{a\},\{a,b\}\}$と定義することで、順番のない集合に順序を持たせることができる。これも定義に使う。

なお、自然数の構成をする際に$0:=\emptyset$として$0$を含めて自然数を定義したので、この記事においては$0\in\NN$とする。

## 整数$\ZZ$の構成

整数は自然数$\NN^2$上の同値関係を用いて構成することができる。同値関係$\sim_s$を次のように定める。

$$
(a,b)\sim_s(c,d)\defeqn a+d=b+c
$$

これは、$a-b=c-d\eqn a+d=b+c$という差が等しくなる条件を同値関係にしたものである。この同値関係$\sim_s$を用いて、整数は$\ZZ:=\NN^2/\sim_s$として定義される。

すなわち、$-1=\{(0,1),(1,2),(2,3),\ldots\}$となるわけだ。また、整数には自然数も$[(n,0)]$として埋め込まれているので自然数の拡張としても利用することができる。

## 有理数$\QQ$の構成

有理数は整数$\ZZ\times(\ZZ\backslash\{0\})$上の同値関係$\sim_d$による商集合として定義される。同値関係$\sim_d$は次のように定義される。

$$
(a,b)\sim_d(c,d)\defeqn ad=bc
$$

そして有理数は$\QQ:=\ZZ\times(\ZZ\backslash\{0\})/\sim_d$として定義される。

この同値関係は$\frac{a}{b}=\frac{c}{d}\eqn ad=bc$という商が等しい条件を同値関係にしたものである。そのため、$\frac{1}{2}=\{(1,2),(2,4),(3,6),(-1,-2),\ldots\}$のようにして表されることが分かる。

同様にして、整数も$\frac{n}{1}=[(n,1)]$として有理数に埋め込まれている。

また、定義を見てもらえれば分かるように、ゼロ除算は定義されない。上の定義において$(0,0)$を考えてみよう。

$$
\begin{gathered}
(0,0)\sim_d(a,b)\eqn 0b=0a\eqn 0=0\\
\therefore \forall a,b\in\ZZ, (0,0)\sim_d(a,b)\\
\therefore (1,2)\sim_d(0,0)\land(0,0)\sim_d(2,3)
\end{gathered}
$$

となるので、$\sim_d$が推移律を満たしているならば$(1,2)\sim_d(2,3)$となる必要があるが、実際には成り立っていない。そのため、$\ZZ^2$で$\sim_d$を考えると同値関係にならず、商集合を構成することができないので、片方から$0$を取り除いた$\ZZ\times(\ZZ\backslash\{0\})$を考える必要がある。

## 実数$\RR$の構成

実数の構成は有理数や整数の構成よりもはるかに複雑である。それもそのはず、$|\RR|>|\QQ|$であるから、単に$\QQ^2$などを考えて商集合を取るだけでは実数全体を構成することはできない。ここで、次の事実が知られている。

$$
|\RR|=|\QQ^\NN|
$$

これは、実数の濃度が自然数から有理数への写像全体の濃度と等しいことを示している。この事実を用いて実数を構成する方法の一つとして、Cauchy列を用いる方法がある。

Cauchy列とは、次の性質を持つ数列$\{a_n\in\QQ\}_{n=0}^{\infty}$のことである。

$$
\forall\varepsilon>0,\exists N\in\NN,\forall n,m\geq N,|a_n-a_m|<\varepsilon
$$

これは、十分に大きい領域では数列の値の変動が小さくなるという性質を表している。この性質を持つ数列全体の集合を$\mathcal{C}$とする。

また、数列の極限を次のように定義する。

$$
\lim_{n\to\infty}a_n=\alpha\defeqn\forall\varepsilon>0,\exists N\in\NN,\forall n\geq N,|a_n-\alpha|<\varepsilon
$$

このとき、$\mathcal{C}$上の同値関係$\sim_c$を次のように定義する。

$$
\{a_n\}_{n=0}^{\infty}\sim_c\{b_n\}_{n=0}^{\infty}\defeqn\lim_{n\to\infty}(a_n-b_n)=0
$$

この同値関係による商集合$\RR:=\mathcal{C}/\sim_c$が実数全体を表している。

Archimedesの原理は、一切言及していないが実は成立しているため、実数の性質は全て満たされている。これは、同値な命題$\lim_{n\to\infty}\frac{1}{n}=0$を証明することで確認できる。

$$
\begin{gathered}
    \because&\varepsilon=\frac{a}{b}&(\in\QQ)\\
    &\text{let}\ N>\frac{b}{a}\\
    &\therefore\forall n\geq N,|a_n-0|<\varepsilon\\
    &\therefore\lim_{n\to\infty}\frac{1}{n}=0&\square
\end{gathered}
$$

## 複素数$\CC$の構成

ここまで来てしまえば、後はとても簡単である。

複素数は実数$\RR^2$上に次のように加法$+$と乗法$\cdot$を定義することで構成される。

$$
(a,b)+(c,d):=(a+c,b+d)\\
(a,b)\cdot(c,d):=(ac-bd,ad+bc)
$$

この演算によって、複素数体$\CC:=(\RR,+,\cdot)$が定義される。この体は、実数体$\RR$の代数閉方となっており、任意の多項式方程式に対して解を持つことが知られている。

そして、$a+ib:=(a,b)$と表すわけである。
