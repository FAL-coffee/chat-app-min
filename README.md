# はかくらルームとは

プログラミングの授業が始まるけど、付いていけるか不安......

情報処理の勉強が難しい。もしかして、こんなに苦労しているのは私だけ？

ゲーム作りに興味があって、プログラミングを始めてみたいけど、何から始めればいいのかわからない

ネットで見た通りにやったのに、環境構築でつまずいてしまった。

プログラミングの知見を活かして、学生起業を行いたい。仲間をどうやって見つければいいだろうか？

**はかくらルーム（Hacker ClassRoom）** は、そのような悩みを抱えた学生・若手エンジニアのためのチャットコミュニケーションサービスです。

不安を抱えている時、最も力になるのは、「**同じ不安を抱えた仲間**」であったり、「**似た境遇を乗り越えた先輩**」達です。はかくらルームは、**誰もが自由に、気持ちや感情を共有する仲間**を作ることが出来るプラットフォームです。

プログラミングや IT 知識の勉強中につまずいてしまったとき、あなたには手を差し伸べてくれる「**励まし合いながら歩んできた仲間**」がいます。はかくらルームは、**仲間に助けを求めることが、もっと気軽に出来る**環境を提供します。

プログラミングに自信がある、または、成長したいといった理由で、起業やコンクールへの出場を考えている時。仲間を探すのはとても大変で、本来強い運が必要なことです。はかくらルームでは、**容易に同志の仲間を探す**ことが出来ます。

// 画面レイアウト完成次第、画像を添付

# 使用技術

-
-
-

# インフラ構成図

// draw.io

# 機能一覧

// 動作概要

# 非機能一覧

## テスト

// テスト、storybook の起動方法、CICD、OAuth 関連等の実装方法や、実行についてを記述

# UI design resource

// figma url

# コミットルール

## コミットメッセージについて

コミット時のコメントでは、コメントを以下のように分割します。

| 区分    | 意味                                         | 例                                       |
| ------- | -------------------------------------------- | ---------------------------------------- |
| Prefix  | 何をしたか、を短く表すための接頭辞。         | Add、追加、Fix、修正、Improve、etc...    |
| Subject | 何をしたのかを短い文章で表す。               | ◯◯ に △△ を追加、文言の修正、etc...      |
| Body    | 何故それを行ったか、を文章で表す。           | ◯◯ 機能に △△ が必要であるため、etc...... |
| Footer  | コミットの元となった課題の ID 等を記述する。 | Issue#444、バグチケット#000、etc......   |

### Prefix の分類

| 英語    | 日本語 | 意味                                       |
| ------- | ------ | ------------------------------------------ |
| Add     | 追加   | （機能・ファイルなどを）追加する           |
| Fix     | 修正   | （コードなどを）修正する                   |
| Improve | 改善   | （コードなどを）改善する                   |
| Update  | 更新   | （パッケージやドキュメントなどを）更新する |
| Remove  | 削除   | （ファイル名やコードを）除去する           |
| Rename  | 改名   | （ファイル名を）変更する                   |
| Move    | 移動   | （A を B に）移動する                      |
| Change  | 交換   | （A を B に）変更する                      |

### コミットメッセージのフォーマット

**Prefix**：**Subject**

**Body**

**Footer**

Body、Footer については、必要な場合のみ。

## ブランチの運用について

[github-flow](https://tracpath.com/bootcamp/learning_git_github_flow.html)を参照

# 開発手順

## 開発環境構築

docker-compose

```bash
docker-compose //後で書く
```

## 開発サーバー立ち上げ

```bash
npm run dev
# or
yarn dev
```

## ストーリーブック立ち上げ

```bash
npm run storybook
# or
yarn storybook
```