---
title: "Windowsでsuしたい"
description: "hydrogen Advent Calender 2024 day 19"
pubDate: "2024-12-19T18:56"
# update: "2024-11-19T16:00"
tags: ["hydrogen Advent Calender 2024", "Windows"]
---

この記事は[hydrogen Advent Calender 2024](https://adventar.org/calendars/10672)の19日目の記事です。

## Windows API

Windowsでsuしたい。単に管理者権限で実行するのではなく、ユーザーを切り替えて実行したい。`runas`コマンドがあるだろとは言われるが、`runas`は管理者権限が失われる上に、管理者権限で起動してもパスワードの入力が必須となる。

だが、条件付きではあるもののパスワードの入力なしに別のユーザーでプロセスを起動する方法がある。既存のプロセスからログイン情報を拝借すればいいのである。

### OpenProcessTokenとDuplicateTokenEx

`OpenProcessToken`関数を使うことで、プロセスから実行しているユーザーの情報が入ったトークンを取得することができる。

但し、普通にやると利用可能な形で得られないので`SeDebugPrivilege`特権を使って、複製可能な形で得る必要がある。`DuplicateTokenEx`関数を使うことで、そのトークンを複製し、プロセスを起動できる形にすることができる。

なお、プロセスを起動できるようにするために`PrimaryToken`に変換し、`ImpersonationLevel`は`SecurityAnonymous`を指定する。

### CreateProcessWithTokenW

`CreateProcessWithTokenW`関数を使うことで、複製したトークンを使ってプロセスを起動することができる。

但し、この操作には`SeAssignPrimaryTokenPrivilege`特権が必要である。

以上から分かる通りこの操作は管理者権限を要する。

## 実装例

Rustで実装したものが[こちら](https://github.com/hydrogend/token-steal-sample/blob/master/src/main.rs)である。

```rust
    let res= unsafe { OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, false, pid) };
    ...
    let handle: HANDLE = res.unwrap();
    let r2 = unsafe { OpenProcessToken(handle, TOKEN_DUPLICATE, &mut token) };
    ...
    let r3 = unsafe { DuplicateTokenEx(token,
        TOKEN_ALL_ACCESS,
        None,
        SecurityAnonymous,
        TokenPrimary,
        &mut prim_token) };
    ...
    let lpstartupinfo: STARTUPINFOW = STARTUPINFOW {
        cb: std::mem::size_of::<STARTUPINFOW>() as u32,
        lpReserved: PWSTR::null(),
        lpDesktop: PWSTR::null(),
        lpTitle: PWSTR::null(),
        dwX: 0,
        dwY: 0,
        dwXSize: 0,
        dwYSize: 0,
        dwXCountChars: 0,
        dwYCountChars: 0,
        dwFillAttribute: 0,
        dwFlags: STARTUPINFOW_FLAGS::default(),
        wShowWindow: 0,
        cbReserved2: 0,
        lpReserved2: null_mut(),
        hStdInput: stdin,
        hStdOutput: stdout,
        hStdError: stderr,
    };
    ...
    let r4 = unsafe { CreateProcessWithTokenW(prim_token,
        LOGON_WITH_PROFILE,
        None,
        PWSTR::from_raw(cmd),
        CREATE_NEW_CONSOLE,
        None,
        None,
        &lpstartupinfo,
        &mut info) };
    ...
```

このプログラムは引数としてプロセスIDを受け取り、そのプロセスのユーザーで`cmd.exe`を対話可能な状態で起動する。

実際に起動してみよう。管理者権限で起動したコマンドプロンプトから、`winlogon.exe`のプロセスIDを指定してこのプログラムを実行する。

```cmd
token_steal.exe 25800
```

すると別ウィンドウが立ち上がり、このウィンドウでコマンドを実行してみよう。

```cmd
> whoami
nt authority\system
```

無事成功した。

## 条件について

このプログラムで切り替えられるユーザーは、実行中のプロセスが存在するものに限られる。それゆえにまだログインしていないユーザーに切り替えることはできない。

Windowsにおいては、ログインしていないユーザーに切り替えることは通常の手段では不可能である。
