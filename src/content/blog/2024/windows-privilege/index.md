---
title: "Windowsの権限周りの話"
description: "hydrogen Advent Calender 2024 day 16"
pubDate: "2024-12-16T15:13"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "Windows"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の16日目の記事です。

## rootとAdministrators

Linux(というよりもUNIX系のシステム)ではrootという特別なユーザーが存在し、ハードウェア的に不可能な操作以外であればすべての操作を行うことができる。そして、このrootユーザーとしてコマンドを実行可能なユーザーを管理者と呼ぶ。基本的にrootとして直接ログインすることはなく、`sudo`や`su`などのコマンドを使って一時的にrootユーザーとしてコマンドを実行するという形を取る。そして、それ以外のユーザーはカーネルではそういった特殊な権限を持たない。

Windowsでは、Administratorsグループに属するユーザーが管理者権限を有する。ただ、そのユーザーとしてログインしただけでは管理者権限を行使することはできない。管理者権限を行使するには基本的にはUACというグラフィカルなダイアログで承認を求められる。
これは、Windowsでの管理者権限がUNIX系のrootとは異なる仕組みであることを示している。

## 特権

Windowsでは、管理者権限を実現する仕組みとして特権というものが備えられている。例えば、シンボリックリンクを作成するには`SeCreateSymbolicLinkPrivilege`という特権が必要である。また、ファイルの所有権を取得するには`SeTakeOwnershipPrivilege`が必要である。
Administratorsグループに属するユーザーが管理者権限を有している理由は、このグループには標準でそういった権限が与えられているからである。

権限の一覧を出力するには、`whoami /priv`というコマンドを実行する。

管理者ユーザー(ログイン後)で実行した場合は次のような出力を得る。
```
PRIVILEGES INFORMATION
----------------------

特権名                        説明                                            状態
============================= =============================================== ====
SeLockMemoryPrivilege         メモリ内のページのロック                        無効
SeShutdownPrivilege           システムのシャットダウン                        無効
SeChangeNotifyPrivilege       走査チェックのバイパス                          有効
SeUndockPrivilege             ドッキング ステーションからコンピューターを削除 無効
SeIncreaseWorkingSetPrivilege プロセス ワーキング セットの増加                無効
SeTimeZonePrivilege           タイム ゾーンの変更                             無効
```

UACで昇格した後に実行すると次のような出力を得る。
```
PRIVILEGES INFORMATION
----------------------

特権名                                    説明                                                   状態
========================================= ====================================================== ====
SeLockMemoryPrivilege                     メモリ内のページのロック                               無効
SeIncreaseQuotaPrivilege                  プロセスのメモリ クォータの増加                        無効
SeSecurityPrivilege                       監査とセキュリティ ログの管理                          無効
SeTakeOwnershipPrivilege                  ファイルとその他のオブジェクトの所有権の取得           無効
SeLoadDriverPrivilege                     デバイス ドライバーのロードとアンロード                無効
SeSystemProfilePrivilege                  システム パフォーマンスのプロファイル                  無効
SeSystemtimePrivilege                     システム時刻の変更                                     無効
SeProfileSingleProcessPrivilege           単一プロセスのプロファイル                             無効
SeIncreaseBasePriorityPrivilege           スケジューリング優先順位の繰り上げ                     無効
SeCreatePagefilePrivilege                 ページ ファイルの作成                                  無効
SeBackupPrivilege                         ファイルとディレクトリのバックアップ                   無効
SeRestorePrivilege                        ファイルとディレクトリの復元                           無効
SeShutdownPrivilege                       システムのシャットダウン                               無効
SeDebugPrivilege                          プログラムのデバッグ                                   有効
SeSystemEnvironmentPrivilege              ファームウェア環境値の修正                             無効
SeChangeNotifyPrivilege                   走査チェックのバイパス                                 有効
SeRemoteShutdownPrivilege                 リモート コンピューターからの強制シャットダウン        無効
SeUndockPrivilege                         ドッキング ステーションからコンピューターを削除        無効
SeManageVolumePrivilege                   ボリュームの保守タスクを実行                           無効
SeImpersonatePrivilege                    認証後にクライアントを偽装                             有効
SeCreateGlobalPrivilege                   グローバル オブジェクトの作成                          有効
SeIncreaseWorkingSetPrivilege             プロセス ワーキング セットの増加                       無効
SeTimeZonePrivilege                       タイム ゾーンの変更                                    無効
SeCreateSymbolicLinkPrivilege             シンボリック リンクの作成                              無効
SeDelegateSessionUserImpersonatePrivilege 同じセッションで別のユーザーの偽装トークンを取得します 無効
```

明らかに特権が増えていることがわかる。これは、ログインしただけの管理者ユーザーは本来持っているべき特権を有していないということを示している。

Windowsはプロセスごとに付与されたトークンによって特権の有無を判断している。管理者ユーザーがログインした際には、いったん持っているべき特権をすべて有した完全なトークンが作成される。
その完全なトークンのうち、`Administrators`グループに由来する特権を削除したものを`explorer.exe`に渡している。そのため、その後に`explorer.exe`から起動されたプロセスは、`Administrators`グループに由来する特権(=管理者権限)を持っていない。
ゆえに、管理者ユーザーでログインしただけでは管理者権限を行使することはできず、UACなしには一般ユーザーと同程度の(厳密には誤差程度に弱い)ことしかできないのである。

## 特権の変更

管理者であればアカウントが有する特権をある程度変更することができる。では、実際に変更してみよう。

```bat
secedit /export /cfg privs.ini /areas USER_RIGHTS
```

`privs.ini`というファイルが作成されるので、それを編集する。今回は、`SeCreateSymbolicLinkPrivilege`を`Users`に与えてみよう。

```ini
[Privilege Rights]
...
SeCreateSymbolicLinkPrivilege = *S-1-5-32-544,*S-1-5-32-545,*S-1-5-83-0
...
```

`*S-1-5-32-545`は`Users`グループを示すSIDである。これで、`Users`グループにもシンボリックリンクを作成する特権が与えられる。

```bat
secedit /configure /db apply.sdb /cfg privs.ini /areas USER_RIGHTS
```

このコマンドで特権の変更が適用される。このコマンドの`apply.sdb`の部分は適当なファイル名でよい。

これで、`Users`グループにもシンボリックリンクを作成する特権が与えられた。実際に、`mklink`コマンドを実行してみよう。

```bat
mklink hoge fuga
```

管理者権限を使うことなくシンボリックリンクを作成することができたはずである。
