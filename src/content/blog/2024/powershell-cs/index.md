---
title: "PowershellにC#のコードを埋め込める話"
description: "hydrogen Advent Calender 2024 day 22"
pubDate: "2024-12-22T22:02"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "Windows", "Powershell", "CSharp"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の22日目の記事です。

## Add-Typeコマンド

Powershellは知っての通り、シェルの癖してオブジェクト指向であったり、内部コマンドがケバブケースでやたらと長かったりと、おおよそ我々の想像する一般的なシェルとはかけ離れたものとなっている。~~これは果たしてシェルと呼んでいいものなのであろうか。~~

そのPowershellのあまりにも多種多様な内部コマンドの1つに`Add-Type`コマンドがある。これは、Powershell上で扱えるオブジェクトの型を追加するコマンドである。ここで注目すべきは、この型をどう定義するのかということである。

結論から言ってしまうと次のように定義する。

```powershell
> $Source = @"
using System;

public class Test
{
  public static void MethodStatic(string name)
  {
    Console.WriteLine("Static {0}!",name);
  }
  public void MethodInstance(string name)
  {
    Console.WriteLine("Instance {0}!",name);
  }
}
"@
> Add-Type -TypeDefinition $Source
> [Test]::MethodStatic("Shell!");
Static Shell!!
> $objTest = New-Object Test
> $objTest.MethodInstance("HOGE")
Instance HOGE!
```

なんと、型定義はC#のコードをそのまま書くことで行うのである。そして、C#のメゾットを呼び出したり、引数としてシェルの変数をそのまま引き渡すことすらできてしまうのである。

なお、流石にunsafeなコードは書けない。

```powershell
> $Source = @"
using System;

public class UnsafeTest
{
  public static void Test(string name)
  {
    unsafe
    {
      string* p = &name;
      Console.WriteLine((int)p);
    }
  }
}
"@
> Add-Type -TypeDefinition $Source
Add-Type : c:\Users\HOGE\AppData\Local\Temp\vtx2umil.0.cs(7) : アンセーフ コードは /unsafe でコンパイルした場合のみ有効です。
c:\Users\HOGE\AppData\Local\Temp\vtx2umil.0.cs(6) :   {
c:\Users\HOGE\AppData\Local\Temp\vtx2umil.0.cs(7) : >>>     unsafe
c:\Users\HOGE\AppData\Local\Temp\vtx2umil.0.cs(8) :     {
...
```

エラーログを見てもらえれば分かる通り、内部的にC#のコンパイラーが動いていることが分かる。これはつまり、`extern`なメゾットを用意することでCのライブラリを呼び出すことも可能であるということである。例えば、次のようにして`Kernel32.dll`の`Beep`関数を呼び出すことができる。

```powershell
> $Signature = @"
[DllImport("Kernel32.dll")]
public static extern bool Beep(int dwFreq, int dwDuration);
"@
> $addTypeSplat = @{
MemberDefinition = $Signature
Name = "Win32Beep"
Namespace = "Win32API"
PassThru = $true
}
> $Beep = Add-Type @addTypeSplat
> $Beep::Beep(5000,2000)
True
```

このコードを実行すると、PCのスピーカーから5000Hzの音が2秒ほどなるはずである。

あまりにも好き放題できるので、例えば[Windows API上の型や関数をPowershell上で扱えるようにしたライブラリ](https://github.com/mattifestation/PSReflect)があったり、この仕様を使った攻撃手法がいくつもあったりする。
