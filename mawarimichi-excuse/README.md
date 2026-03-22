# まわりみち・エクスキューズ 🌀

**全宇宙まわりみち機構・時空管理局** が運営する、言い訳証明書 電子申請システムです。

あなたの「遅刻した」「課題が終わらなかった」などの些細な事実を、AIが壮大な宇宙的不可抗力として認定し、重厚な公文書風の「言い訳証明書」を発行します。

## セットアップ

### 1. 依存関係のインストール

```bash
cd mawarimichi-excuse
npm install
```

### 2. 環境変数の設定

`.env.local` ファイルに GLM API キーを設定してください：

```
GLM_API_KEY=your_glm_api_key_here
```

GLM API キーは BigModel コンソールで取得してください。

### 3. 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開いてアプリを使用できます。

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router) + TypeScript
- **スタイリング**: カスタムCSS（2000年代初頭の日本の役所風デザイン） + Tailwind CSS
- **画像生成**: html2canvas（証明書をPNG画像としてダウンロード）
- **AI**: GLM API（glm-4.7-flash / OpenAI互換API）

## ディレクトリ構成

```
mawarimichi-excuse/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts        # GLM API連携エンドポイント
│   │   ├── globals.css             # 役所風グローバルCSS
│   │   ├── layout.tsx              # ルートレイアウト
│   │   └── page.tsx                # メインページ
│   ├── components/
│   │   ├── ApplicationForm.tsx     # 申請フォーム
│   │   ├── CertificatePreview.tsx  # 証明書プレビュー＋画像DL
│   │   └── LoadingOverlay.tsx      # ローディング表示
│   └── types/
│       └── index.ts                # 型定義
├── .env.local                      # 環境変数（要設定）
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 注意事項

※ 本システムで発行される証明書は、3次元空間における法的効力を一切有しません。  
※ ジョークアプリです。実際の遅刻の言い訳に使用しないでください（使用しても当局は責任を負いません）。
