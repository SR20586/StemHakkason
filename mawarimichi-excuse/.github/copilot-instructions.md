# Copilot Workspace Instructions

## Project Intent
- Build and maintain a joke web app that generates bureaucratic-style excuse certificates.
- Preserve the intentional "2000s Japanese e-government" visual identity.

## Coding Priorities
- Keep App Router structure in `src/app`.
- Prefer small, typed React components and explicit TypeScript interfaces.
- Keep API routes resilient: validate inputs, validate model outputs, and return actionable errors.
- Do not leak secrets in logs or committed files.

## UI/UX Constraints
- Main UI uses MS Gothic-style sans font and old-school table layout patterns.
- Certificate area uses Mincho/serif style and paper-like background.
- Keep dense annotation text (`※`) for parody tone.

## AI Integration Rules
- System prompt is source-of-truth and must be versioned in git.
- Require strict JSON output contract:
  - `title`
  - `reference_number`
  - `subject`
  - `content`
  - `rank`
- If model output is malformed, return 502 with user-safe guidance.

## Quality Checks Before Merge
- `npm run lint`
- Manual flow check: form submit -> generation -> certificate preview -> PNG download
- Confirm `.env.local` is ignored and no API key appears in tracked files
