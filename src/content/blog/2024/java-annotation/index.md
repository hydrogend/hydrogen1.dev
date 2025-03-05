---
title: "JavaのAnnotationの処理"
description: "hydrogen Advent Calender 2024 day 12"
pubDate: "2024-12-12T18:01"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "Java"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の12日目の記事です。

## Annotation

JavaにはAnnotation(注釈)という機能がある。これは、次のように定義される。

```java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    String value();
    int number() default 0;
}
```

注釈に与える値の名前の定義はこのように抽象メソッドのように書く。これは、実態としては`java.lang.annotation.Annotation`を継承したインターフェースであるからだ。だが、これは糖衣構文ではなく`Annotation`を継承したインターフェースを素直に書いても注釈として使うことはできない。

また、`value`という名前のメソッドは注釈を付与する際に省略することができる。

また、`@Target`はこの注釈をどこに付けることが可能であるかを、`@Retention`はこの注釈がどの時点まで保持されるかを指定する。

後者について注目しよう。`RetentionPolicy`には次の3つの値がある。

- `SOURCE`: ソースコード上にのみ保持される。コンパイル時には削除される。
- `CLASS`: コンパイル後のバイトコードにも残存するが、実行時には削除される。
- `RUNTIME`: 実行時にも保持される。

`@Retention`が`RUNTIME`である場合、実行時もリフレクションを使ってその注釈を取得することができる。

```java
public class Main {
    @MyAnnotation("Hello, world!")
    public static final int FOO = 42;
    public static final int BAR = 1337;
    public static void main(String[] args) {
        Field[] fields = Main.class.getDeclaredFields();
        for (Field field : fields) {
            if (field.isAnnotationPresent(MyAnnotation.class)) {
                MyAnnotation annotation = field.getAnnotation(MyAnnotation.class);
                System.out.printf("Field %s: %s\n", field.getName(), annotation.value());
            }
        }
        System.out.println("Done.");
    }
}
```

```
Field FOO: Hello, world!
Done.
```

では、`CLASS`や`SOURCE`の場合はどうなるかというと取得することはできない。

なら何のために`CLASS`や`SOURCE`があるのかというと、コンパイル時に指示を出したり、IDEの補完機能を使ったりするために使われる。

例えば、`@SuppressWarnings`は`RetentionPolicy.SOURCE`である。これは、コンパイラに対して警告を抑制する指示を出すために使われる。

また、検査用フレームワークによくある`@NotNull`や`@Nullable`は`RetentionPolicy.CLASS`である。これは、IDEがコードの解析を行う際に使われる。

そしてそのような注釈はAnnotationProcessorというコンパイラの機能を使って処理することができる。

## AnnotationProcessor

アノテーションプロセッサは次のようにして実装できる。

```java
package mypackage;

@SupportedAnnotationTypes("mypackage.MyAnnotation")
@SupportedSourceVersion(SourceVersion.RELEASE_21)
public class MyAnnotationProcessor extends AbstractProcessor {
    @Override
    public boolean process(Set<? extends TypeElement> annotations, RoundEnvironment roundEnv) {
        for (Element element : roundEnv.getElementsAnnotatedWith(MyAnnotation.class)) {
            MyAnnotation annotation = element.getAnnotation(MyAnnotation.class);
            System.out.printf("Element %s: %s\n", element.getSimpleName(), annotation.value());
        }
        return true;
    }
}
```

これは、`MyAnnotation`という注釈が付与された要素を取得して、その値を表示するプロセッサである。
これを使うには、`META-INF/services/javax.annotation.processing.Processor`に次のように書く。

```
mypackage.MyAnnotationProcessor
```

あるいは、`javac`の`-processor`オプションで指定することもできる。

```shell
javac -processor mypackage.MyAnnotationProcessor Main.java
```

これによって、コンパイル時に注釈を処理することができる。これを利用した例として検査用フレームワークや、Lombokなどがある。

Lombokのval型は実は注釈であり、プロセッサーからASTを操作してコードを生成している。
