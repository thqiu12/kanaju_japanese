# 神奈川柔整鍼灸専門学校 日本語学科 — 公式サイト

> 🚀 Live: https://hirai-jls.vercel.app — auto-deploys from `main`.

文部科学省認定日本語教育機関の公式ウェブサイト。Next.js 16 (App Router) + next-intl で構築。

- **本番ドメイン (予定):** `https://jls.hirai-gakuen.ac.jp`
- **開校予定:** 2026年10月1日
- **サイト公開予定:** 2026年7月1日

## 対応言語

- 🇯🇵 日本語 (`/ja`) — master content
- 🇨🇳 中文 (简体) (`/zh`)
- 🇬🇧 English (`/en`)
- 🇳🇵 नेपाली (`/ne`)

## 技術スタック

| 用途 | 採用 |
|---|---|
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 (CSS-first theming) |
| i18n | next-intl 4 |
| Fonts | Noto Sans JP / Noto Serif JP / Inter / Noto Sans Devanagari / Noto Sans SC |
| Deploy | Vercel (推奨) |

## ローカル開発

```bash
npm install
npm run dev
# http://localhost:3000
```

## 主要ファイル構成

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # ルートレイアウト + メタデータ
│   │   ├── globals.css             # Tailwind theme + brand tokens
│   │   ├── page.tsx                # トップページ
│   │   └── info-disclosure/        # 情報公開ページ (法定 9 項目)
│   ├── sitemap.ts                  # 多言語 sitemap (hreflang 付)
│   └── robots.ts
├── components/
│   ├── Header.tsx, Footer.tsx, NoticeBar.tsx, SectionLabel.tsx
│   ├── LanguageSwitcher.tsx
│   └── sections/                   # トップページ各セクション
├── i18n/
│   ├── routing.ts                  # ロケール定義
│   ├── navigation.ts               # ロケール対応 Link / Router
│   └── request.ts                  # メッセージファイル読込
├── messages/
│   ├── ja.json                     # 日本語 (master)
│   ├── zh.json                     # 中文
│   ├── en.json                     # English
│   └── ne.json                     # नेपाली
└── proxy.ts                        # ロケール検出 / リダイレクト
```

## ブランドカラー

| 用途 | 色 |
|---|---|
| Primary (母校 `hirai-gakuen.ac.jp` 準拠) | `#0ea082` |
| Primary Dark | `#0B7862` |
| Primary Light | `#14B898` |
| Primary Pale (背景アクセント) | `#E6F7F3` |
| Accent (CTA) | `#D97757` |
| Gold (深緑上の強調) | `#FFD879` |
| 認定マーク (公式・改変不可) | `#992D2D` + 金色麦穂 |

## 認定マーク

`public/cert/` に文部科学省認定マーク 4 形式を配置:

- `mark-symbol.png` — シンボルのみ
- `mark-horizontal.jpg` — 横並びテキスト
- `mark-en.jpg` — 英語テキスト
- `mark-full.jpg` — 全種類組合せ (フッター用)

これらは公式マークのため、色・形の改変は禁止。

## 法定情報公開 (MEXT 認定要件)

`/[locale]/info-disclosure` ページに以下 9 項目を掲載 (省令第15条):

1. 設置者の氏名及び住所
2. 認定日本語教育機関の名称及び所在地
3. 日本語教育課程の授業科目及びその内容
4. 生徒、教員及び職員の数
5. 授業料その他の費用
6. 学則
7. 日本語教育機関としての特色
8. 課外活動の記録と紹介
9. 卒業後の進路状況

## デプロイ

### Vercel (推奨)

```bash
# Vercel CLI
npm i -g vercel
vercel
```

または GitHub 連携で自動デプロイ。`vercel.json` は不要(`next.config.ts` のみで動作)。

### 環境変数

`.env.example` をコピーして `.env.local` を作成し、以下を設定してください。
API キーが未設定でもサイトは動作します(モックデータ + コンソールにフォーム内容をログ出力)。

| 変数 | 用途 | 必須 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン(例: `hirai-jls`) | 本番のみ |
| `MICROCMS_API_KEY` | microCMS API キー | 本番のみ |
| `RESEND_API_KEY` | Resend API キー(問合せフォーム送信) | 本番のみ |
| `RESEND_FROM_EMAIL` | Resend 検証済み送信元アドレス | 本番のみ |
| `SCHOOL_CONTACT_EMAIL` | 問合せの宛先(既定: `gakuen@hirai-gakuen.ac.jp`) | 任意 |

### microCMS スキーマ (endpoint `news`)

```
slug         text          required, unique
category     select        announcement | event | press
publishedAt  datetime
title_ja     text          required
title_zh     text          optional (→ ja にフォールバック)
title_en     text          optional
title_ne     text          optional
content_ja   richEditorV2  required
content_zh   richEditorV2  optional
content_en   richEditorV2  optional
content_ne   richEditorV2  optional
thumbnail    image         optional
```

### Resend セットアップ

1. https://resend.com/ で登録
2. Domains → Add Domain → `hirai-gakuen.ac.jp` を追加 → DNS レコードを反映
3. API Keys → Create API Key → `.env.local` の `RESEND_API_KEY` に設定

## 完成ページ

- [x] トップ
- [x] 学校紹介 (`/about`)
- [x] 課程・カリキュラム (`/programs`)
- [x] 学生生活 (`/campus-life`)
- [x] 入学案内 (`/admissions`)
- [x] お問合せ (`/contact`) — Resend メール連携 + Google Maps
- [x] お知らせ (`/news`, `/news/[slug]`) — microCMS 連携
- [x] 情報公開 (`/info-disclosure`) — MEXT 法定 9 項目

## ロードマップ (Phase 3)

- [ ] 学則 PDF アップロード
- [ ] 卒業生実績 (2027 年度〜)
- [ ] ニュース個別ページ用 OG 画像自動生成
- [ ] お問合せフォームに reCAPTCHA / Cloudflare Turnstile

## 翻訳について

- 日本語: PDF 原本に準拠した正式表記 (募集要項・機関案内・選考要領 等)
- 中文 / English / नेपाली: 教育機関にふさわしい自然な本地化。機械翻訳は不可
- नेपाली はネイティブレビューを推奨

## 連絡先

- 〒252-0313 神奈川県相模原市南区松が枝町 7-5
- TEL: 042-740-7222 / FAX: 042-740-7221
- Email: gakuen@hirai-gakuen.ac.jp
- 運営: 学校法人 平井学園
