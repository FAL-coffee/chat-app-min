# はかくらとは

プログラミングの授業が始まるけど、付いていけるか不安......

情報処理の勉強が難しい。もしかして、こんなに苦労しているのは私だけ？

ゲーム作りに興味があって、プログラミングを始めてみたいけど、何から始めればいいのかわからない

ネットで見た通りにやったのに、環境構築でつまずいてしまった。

プログラミングの知見を活かして、学生起業を行いたい。仲間をどうやって見つければいいだろうか？

**はかくら（Hacker ClassRoom）** は、そのような悩みを抱えた学生・若手エンジニアのためのチャットコミュニケーションサービスです。

不安を抱えている時、最も力になるのは、「**同じ不安を抱えた仲間**」であったり、「**似た境遇を乗り越えた先輩**」達です。はかくらルームは、**誰もが自由に、気持ちや感情を共有する仲間**を作ることが出来るプラットフォームです。

プログラミングや IT 知識の勉強中につまずいてしまったとき、あなたには手を差し伸べてくれる「**励まし合いながら歩んできた仲間**」がいます。はかくらルームは、**仲間に助けを求めることが、もっと気軽に出来る**環境を提供します。

プログラミングに自信がある、または、成長したいといった理由で、起業やコンクールへの出場を考えている時。仲間を探すのはとても大変で、本来強い運が必要なことです。はかくらルームでは、**容易に同志の仲間を探す**ことが出来ます。

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

以下を参照
[github-flow](https://tracpath.com/bootcamp/learning_git_github_flow.html)
[Issueドリブン開発](https://gist.github.com/Enchan1207/0ea2c7a7d6a3c16aea5683435d1972f8)

# 開発手順

## 開発環境構築

1. Firebaseのプロジェクトを作成する
  - firebase authentication( google providerを有効化する )
  - firestore
2. .env.localファイルを作成する
  ```.env
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
  ```
3. cypress.env.jsonを作成する
  ```json
  {}
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

# LICENCE
はかくらは[MIT LICENCE](https://github.com/FAL-coffee/hacker-class-room/blob/main/LICENSE)です。

# 未来図（妄想）
## 1.0.0
本番リリース1.0.0では、自走可能なコミュニティサービスとしての役割を持つものを目指します。

**自走可能なコミュニティサービス**

  ユーザーがコミュニティとしてチャットルームを作成し、招待を行ったり、ユーザーが検索によってたどり着くことでコミュニティが形成されるというサービスの形を指しています。

(現在、電子事業開通届を提出するべく活動中です。)

## 2.0.0
2.0.0では、各種SNSやプラットフォームとの連携を行い、若手のエンジニアがインターネットを使う上でのポータル的な役割を持たせていきたいと考えます。

連携予定
- twitter
- Instagram
- facebook
- GitHub
- Zenn
- Qiita

### タイムライン機能
twitter, Instagram, facebookから、日常的な投稿を収集し、はかくらのプロフィール画面を表示すればそれらの投稿を一覧表示できる形にします。

GitHubでのstarやfork,repositoryの作成情報を収集し、GitHubでの活動を一覧表示可能な形にします。

Zenn, Qiita等からは技術記事投稿の情報を収集し、どのような発信を行っているか、どのように活動しているかを一覧表示します。

それらをフォロワーのタイムラインとして表示し、HOME画面を豊かにします。

## 3.0.0
3.0.0では、ユーザーのポートフォリオや、希望単価、技術レベル等をプロフィールに設定可能にし、「企業が有望な学生を発掘し、気軽に情報交換が出来るプラットフォーム」としての役割を持ちます。

また、エンジニアのための機能の一つとして、「GitHub上のRepositoryを紹介したり、オススメし合うことの出来る機能」を追加します。

それには以下のような特徴があります。
- リポジトリ名や、使用言語やlocale、star数からOSSのプロジェクトを検索することが可能。
- 勿論、はかくら上でリポジトリにstarを付けたりすることも可能。
- 紹介したいリポジトリを選択し、タグを設定、タイトルや紹介文を掲載しフォロワーのタイムラインに共有することが可能。

どのリポジトリを紹介しているか、どのような紹介投稿をお気に入りとして保持するかをサマリー化しプロフィールに表示することで、「どのような技術に興味があるのか」を簡単にほかのユーザーや企業にアピールすることが可能になります。
