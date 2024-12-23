---
title: "矛盾からはいかなる命題も証明できる - 爆発律"
description: "hydrogen Advent Calender 2024 day 9"
pubDate: "2024-12-09T00:08"
tags: ["hydrogen Advent Calender 2024", "記号論理学"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の9日目の記事です。

## 爆発律

矛盾からはいかなる命題も証明することができるという論理学上の定理が存在する。これが爆発律といわれるものである。形式的には次のように表される。

$$
A,\neg A \vdash B
$$

この論法を用いれば、例えば東京工業大学が$Science\ Tokyo$であり、尚且つ東京工業大学が$Science\ Tokyo$でないという前提から電気通信大学MMAが総合格闘技サークルであるという命題を導くことができる。

これは数学において矛盾がなぜ許されないのかという問いに関する答えとなる。矛盾が許されると、どんな命題も証明できてしまうからである。そのような体系はまったくもって無意味なものであり、瑣末主義と呼ばれる。ゆえに、数学においては矛盾を許容しないというのが基本的な姿勢となる。

では証明してみよう。

### 証明

1. $A,\neg A$が成立(前提)
2. $A$が成立するので、$A\lor B$も成立(論理和の導入)
3. $\neg A$が成立するので、$A\lor B$に適用して$B$が成立(選言三段論法)

以上で証明が完了した。

## 矛盾許容論理

先ほど、矛盾からはなんでも証明されるがゆえに矛盾を許容しないという話をしたが、逆に言ってしまえばこの爆発律さえ除去してしまえば矛盾を含んでも問題はないはずである。このような論理を矛盾許容論理という。

矛盾許容論理は爆発律を証明するために必要な前提を古典論理から除去している。そのため、矛盾許容論理は古典論理より真に弱い体系となる。ゆえに、矛盾許容論理で示せる命題は古典論理で示せる命題よりも少なくなり、前者で示せる命題は後者でも示せる。

爆発律を除去するためには、それを証明するために必要な前提を除去する必要がある。上の証明で用いたものは論理和の導入と選言三段論法である。そして、選言三段論法は背理法と論理和の除去($A\to C,B\to C,A\lor B\vdash C$)から導かれるので、背理法を除去することで爆発律を除去することができる。

矛盾許容論理においては、無矛盾律($\neg(A\land\neg A)$)を除去しても瑣末主義に陥ることなく、有用な論理体系を構築することができる。というよりも、矛盾許容論理は無矛盾律を除去するために生まれたものであると言ってもよい。
