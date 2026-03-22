# 依存関係仕様

## Runtime
- next: ^15.1.0
- react: ^19.0.0
- react-dom: ^19.0.0
- html2canvas: ^1.4.1

## Development
- typescript: ^5.7.0
- tailwindcss: ^4.0.0
- @tailwindcss/postcss: ^4.0.0
- eslint: ^9.0.0
- eslint-config-next: ^15.1.0

## AI Model / API
- Provider: BigModel (ZhipuAI)
- Endpoint: OpenAI互換 Chat Completions
- Model: glm-4.7-flash
- Env var: GLM_API_KEY

## バージョン管理方針
- `package-lock.json` をコミットして再現性を担保する。
- 依存更新時は `npm audit` と手動動作確認を同時に実施する。
