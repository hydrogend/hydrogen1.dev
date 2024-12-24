---
title: "Gradleを使う"
description: "hydrogen Advent Calender 2024 day 24"
pubDate: "2024-12-24T22:52"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "Java", "Gradle"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の24日目の記事です。

## Javaのビルドツール

Java及びJVM言語のビルドツールとしてよく使われるものにMavenやGradleがある。MavenはXMLで設定を書くのだが、ビルド時に追加で別の処理を行いたい場合にはわざわざプラグインを利用して読みづらい設定を書く必要がある。GradleはGroovyやKotlinで設定を書くことができ、プログラムを書くのと同じようにビルド設定を書くことができる。

そのため、昨今のJavaのプロジェクトにおいてGradleの利用は広がりつつある。

## Gradleの導入

IntelliJにおいてはプロジェクトを作成する際にビルドツールとしてGradleを選択すれば導入できる。

それではつまらないのでIDEを使わずにGradleを導入する方法を紹介する。

1. [ここ](https://gradle.org/releases/)からGradleの最新バージョンをダウンロードする。
2. 適当な場所で解凍する。
3. PATHを通す(Windowsの場合は環境変数`PATH`にGradleのbinディレクトリを追加し、Linuxの場合は`~/.bashrc`などに`export PATH=$PATH:/path/to/gradle/bin`を追加する)。
4. `gradle -v`でバージョンが表示されれば導入完了。

なお、SDKMAN!やHomebrewを使えばここまでをコマンド一発で行うことができる。

```bash
sdk install gradle
```

```bash
brew install gradle
```

こうしたらプロジェクトのあるディレクトリで次のコマンドを実行することでGradleプロジェクトを作成できる。

```bash
gradle wrapper
```

これでGradleの導入は完了である。

## Gradleの設定

ビルド時の処理や依存関係の設定は`build.gradle`に書く。

```groovy
plugins {
    id 'java'
}

group 'dev.hydrogen1'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    testImplementation platform('org.junit:junit-bom:5.10.0')
    testImplementation 'org.junit.jupiter:junit-jupiter'
}
```

一つづつ見ていこう。

- `plugins`ブロック: プラグインを適用する。ここではJavaプラグインを適用している。
- `group`と`version`: プロジェクトのグループ名(ドメインなど)とバージョンを指定する。
- `repositories`: ライブラリを保管しているリポジトリを指定する。ここではMaven Centralのみを指定している。
- `dependencies`: 依存関係を指定する。後ほど説明する。

### dependencies

`dependencies`ブロックには依存関係を指定する。GradleはMavenと同様に依存関係を解決してくれる。

指定方法で色々と挙動が変わるので説明していこう。

|指定方法|挙動|
|---|---|
|`compile`|依存関係を伝播させる(非推奨)|
|`implementation`|依存関係を伝播させない|
|`api`|依存関係を伝播させる(要Java Libraryプラグイン)|
|`compileOnly`|コンパイル時のみ利用し、それ以降は除去する|
|`runtimeOnly`|実行時のみ利用し、それ以前は除去する|
|`annotationProcessor`|アノテーションプロセッサを指定する|

これのそれぞれに`test`を冠したテスト時の設定を指定するものもある。

`compileOnly`は特定のコンパイル時に消去されるようなアノテーションを使いたいという場面で使われる。そして、`annotationProcessor`はアノテーションプロセッサを指定するものである。よく`Lombok`などのアノテーションプロセッサを指定する。

### プロジェクト名はどこにあるのか

ここまでを見てもらえれば分かる通り、`build.gradle`のどこを見てもプロジェクト名は含まれていない。これはどこで指定されているのかというと、同じディレクトリにあるはずであろう`settings.gradle`に書かれている。

```groovy
rootProject.name = 'SampleProject'
```

これでプロジェクト名を指定することができる。

## ビルドする

Gradleプロジェクトを作成したら、次のコマンドでビルドすることができる。

```bash
./gradlew build
```

```bat
gradlew build
```

gradlewはGradle Wrapperのことで、Gradleがインストールされていない環境でもビルドできるようにするためのものである。これにより、各環境のGradleのバージョンを気にすることなくビルドすることができる。

そして、ビルドが成功すると`build`ディレクトリが作成され、その中にビルドされたファイルが格納され、`lib`ディレクトリ内にパッケージ化されたjarファイルが格納される。
