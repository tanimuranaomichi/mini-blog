# naoshi Blog

これは、naoshiの自己紹介ページ兼ブログサービスです。  
目的は、認証・権限設計を学びつつ、安全なアクセス制御付き Web サービスを構築することです。

使用技術は以下です：

- フロントエンド: Astro (SSG) + React Island (CSR)
- バックエンド: Supabase (Auth + Database)
- 記事管理: Markdown形式

---

## 1. 画面構成

### 公開ページ (SSG)

- URL: `/`
- 記事一覧として本文と作成日時を表示

### 管理画面 (React Island, CSR)

- URL: `/admin/posts`  
  記事一覧表示（本文、作成日時・編集ボタン）
- URL: `/admin/posts/new`  
  記事新規作成（本文Markdown入力、公開ボタン）
- URL: `/admin/posts/[id]/edit`  
  記事編集（既存本文編集、保存ボタン）

#### 認証・認可とアクセス制御

- 管理画面は Supabase Auth でログインした管理ユーザーのみが利用可能になるように、フロントエンド側でログイン済みユーザーのチェックを行います。
- アクセス制御は Supabase の RLS（Row Level Security）で `auth.uid()` を `author_id` と照合する形で実現し、フロントエンド側でもログイン状態と対象記事が一致するかをチェックします。

---

## 2. API

### 記事関連

| メソッド | エンドポイント | 説明                                                    |
| -------- | -------------- | ------------------------------------------------------- |
| GET      | `/posts`       | 全記事取得（管理画面・トップページ用）                  |
| GET      | `/posts/{id}`  | 記事1件取得                                             |
| POST     | `/posts`       | 新規作成（Supabase PostgREST。RLS で author_id を検証） |
| PUT      | `/posts/{id}`  | 記事更新（Supabase PostgREST。RLS で author_id を検証） |

---

## 3. データ構造

### posts

| フィールド | 型              | 説明                                                    |
| ---------- | --------------- | ------------------------------------------------------- |
| id         | UUID / 自動採番 | 一意識別子                                              |
| content    | text            | Markdown形式の本文                                      |
| created_at | timestamp       | 作成日時                                                |
| updated_at | timestamp       | 更新日時。DB側で自動更新されます                        |
| author_id  | UUID            | Supabase Auth の `auth.users.id` を参照（JWT から取得） |
