---
title: "Javaのリフレクションとコンストラクタ"
description: "hydrogen Advent Calender 2024 day 11"
pubDate: "2024-12-11T16:08"
update: "2024-12-11T16:14"
tags: ["hydrogen Advent Calender 2024", "Java", "Reflection"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の11日目の記事です。

## リフレクション

Javaにおいては、次のようにして動的にメゾットを呼び出したり、フィールドの値を操作したりすることができる。

```java
Hoge.hoge("HOGE");
var hogeMethod = Hoge.class.getDeclaredMethod("hoge", String.class);
hogeMethod.invoke(null, "HOGE");
System.out.println(Hoge.STATIC_HOGE);
var hogeField = Hoge.class.getDeclaredField("STATIC_HOGE");
hogeField.set(null, "FUGA");
System.out.println(Hoge.STATIC_HOGE);
```

リフレクションを利用すると、コンパイル時に存在しないクラスやメゾットを利用することも可能である。また、**適切な設定をすれば**privateなメンバにアクセスしたりfinalなフィールドを書き換えたりすることができる。
事実、Minecraftの基本Modはリフレクションを利用して他のModを動的に読み込んでいる。

これの内部実装を見ていこう。

## リフレクションの内部実装

このコードについて考える。

```java
void main() {
    var constructorVoid = Void.class.getDeclaredConstructor();
    constructorVoid.setAccessible(true);
    Void v = constructorVoid.newInstance();
    System.out.println(v);
}
```

ここで呼び出しているメゾットの内部実装は、大まかに次のようになっている。

```java
public final class Class<T> {
    ...
    public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)
        throws NoSuchMethodException, SecurityException {
        ...
        return getReflectionFactory().copyConstructor(getConstructor0(parameterTypes, Member.DECLARED));
    }
    ...
    private Constructor<T> getConstructor0(Class<?>[] parameterTypes, int which) {
        ReflectionFactory fact = getReflectionFactory();
        Constructor<T>[] constructors = privateGetDeclaredConstructors(which == Member.PUBLIC);
        for (Constructor<T> constructor : constructors) {
            if (arrayContentsEq(parameterTypes, fact.getExecutableSharedParameterTypes(constructor))) {
                return constructor;
            }
        }
        throw new NoSuchMethodException(...);
    }
    ...
    private Constructor<T>[] privateGetDeclaredConstructors(boolean publicOnly) {
        ...
        if(isInterface()) {
            return (Constructor<T>[]) new Constructor<?>[0];
        } else {
            res = getDeclaredConstructors0(publicOnly);
        }
        ...
        return res;
    }
    ...
    private native Constructor<T>[] getDeclaredConstructors0(boolean publicOnly);
    ...
}
```

このコードを見ると、`getDeclaredConstructor`メゾットから返ってくる`Constructor`のインスタンスはコピーであることがわかる。

そして、`Class`インスタンスが指すものがinterfaceでない限りネイティブの方にある実装を呼び出しているので、おそらくここでJVMに情報の問い合わせをしているのだろう。

```java
public final class Constructor<T> extends Executable {
    ...
    public void setAccessible(boolean flag) throws SecurityException {
        ...
        setAccessible0(flag);
    }
    ...
    boolean setAccessible0(boolean flag) {
        this.override = flag;
        return flag;
    }
    ...
    public T newInstance(Object... initargs)
        throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        Class<?> caller = override ? null : Reflection.getCallerClass();
        return newInstanceWithCaller(initargs, !override, caller);
    }
    ...
    T newInstanceWithCaller(Object[] args, boolean checkaccess, Class<?> caller)
        throws InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        if (checkAccess)
            checkAccess(caller, clazz, clazz, modifiers);
        
        ConstructorAccessor ca = constructorAccessor;
        if(ca == null) {
            ca = acquireConstructorAccessor();
        }
        return ca.newInstance(args);
    }
    ...
}
```

privateなメゾットへのアクセスの制御は`Constructor`クラスの方で行われているので、`setAccessible`メゾットは単に`override`フィールドを書き換えるだけのようである。

ここで注目すべきは、コンストラクタに直接アクセスするのは`ConstructorAccessor`インターフェースの実装クラスであることである。

ソースコードを追っていくと、`ConstructorAccessor`インターフェースの最終的な実装はネイティブコードを呼び出すものとJava上でバイトコードを動的に生成して実行するもの、
単にメモリ領域を割り当てるもの、そしてエラーを吐くものの4つに分かれていることがわかる。

そして、`Class`クラスの`ConstructorAccessor`はエラーを吐くものになっている。

試しに、ネイティブコードを呼び出すものに差し替えてインスタンス生成を試みたが、JVMが落ちてしまった。

予想されるのは、`Class`のインスタンスはJVMの情報への端末のようなものであるため、なんの関連もないインスタンスが想定されていないからであると推測される。


