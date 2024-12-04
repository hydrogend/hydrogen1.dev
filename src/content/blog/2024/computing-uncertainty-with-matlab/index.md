---
title: "MATLABで合成不確かさを計算する"
description: "Symbolic Math Toolboxを利用した不確かさの計算の自動化"
pubDate: "2024-12-03T00:00"
#update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "MATLAB", "Symbolic Math Toolbox"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の3日目の記事です。

## 本題

### MATLABとは

MATLABとは数値解析を行うソフトであり、行列計算を高速に行うことができる。そのため、自然科学の分野では広く利用されている。
このツールは、Symbolic Math Toolboxを導入することで微積分や数値解の探索といった数式処理も行うことができる。

今回はこのSymbolic Math Toolboxを利用して、合成不確かさを計算する方法を紹介する。これは実際に自分が1年生の時に基礎科学実験Aという科目で用いていたものである。
いわゆる理系の学生であれば、MATLABは無料で使えることが多いので、この方法を使うことで面倒な合成不確かさの計算をある程度自動化することができる。

### 合成不確かさとは

合成不確かさは、不確かさをもつ複数の測定値から計算された値の不確かさのことである。
例えば、ある物理量$y$が複数の測定値$x_1, x_2, \ldots, x_n$から$y=f(x_1,x_2,\ldots,x_n)$として計算されたとき、その不確かさ$\Delta y$は次のように計算される。

$$
\Delta y = \sqrt{\sum_{i=1}^{n} \left(\frac{\partial f}{\partial x_i}(x_1,x_2,\ldots,x_n)\right)^2(\Delta x_i)^2}
$$

ここで、$\Delta x_i$は$x_i$の不確かさである。

### MATLABで合成不確かさを計算する

実際に僕が書いたコードを示す。

```matlab
% 合成不確かさ計算用
% f: 求めたい値の計算式
% arg_symbols: fに登場する不確かさを含みうる変数の配列
% value: 上の変数のそれぞれの値の配列
% delta: それぞれの不確かさ
function p = uncert(f,arg_symbols,value,delta)
  ds=0;
  for i = 1:numel(arg_symbols)
    df = diff(f,arg_symbols(i));
    dfv = subs(df,arg_symbols,value);
    ds=ds+(vpa(dfv))^2*(delta(i))^2;
  end
  % [そのままの値 不確かさ]
  p=[vpa(subs(f,arg_symbols,value)) sqrt(ds)];
end
```

このコードは、`f`に登場する変数の不確かさを含む変数の配列`arg_symbols`と、それぞれの値`value`、不確かさ`delta`を受け取り、合成不確かさを計算する関数である。

途中の`for`ループでは、各変数について偏微分を計算し、それぞれの不確かさとの積の2乗を取っている。最後にそれらを足し合わせて、求めたい値とその不確かさを返している。

この関数を使うと、例えば次のようにして合成不確かさを計算することができる。

```matlab
syms x y z
f = x*y*z;
arg_symbols = [x y z];
value = [1 2 3];
delta = [0.1 0.2 0.3];
p = uncert(f,arg_symbols,value,delta)
```
