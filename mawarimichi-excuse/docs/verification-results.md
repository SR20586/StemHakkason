# 検証結果メモ

## 実施日
- 2026-03-22

## 実施コマンド
- `npm run lint`
- `npm audit --omit=dev`

## 結果
- lint: PASS（警告・エラーなし）
- audit: moderate 1件
  - 対象: `next`
  - 内容: 既知アドバイザリ（request smuggling / image cache growth）
  - 対応候補: `npm audit fix` 実行後に回帰確認

## 備考
- Next.js が lockfile 複数検出警告を表示。
- ルート判定警告を抑止する場合は next.config.ts の `outputFileTracingRoot` 設定を検討。
