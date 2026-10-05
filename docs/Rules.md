# Project Rules

**Project:** AI Course Finder for College Students (working title)
**Owner:** Pavan B C
**Status:** Draft v1
**Date:** 5 Oct 2026

These rules keep the project clean, secure, and finishable. Follow them for every feature.

---

## 1. Golden Rules

1. **V1 first.** Finish the MVP before any V2 feature.
2. **One feature at a time.** Build, test, commit, then move on.
3. **Real data only.** AI may rank and explain YouTube results. It must never invent courses or links.
4. **No secrets in code.** API keys and passwords live in environment variables only.
5. **Docs stay updated.** If the plan changes, update PRD, Architecture, Structure, or Design the same day.

## 2. Scope Rules

- Anything not in the V1 table of the PRD is **out of scope** until V1 is deployed.
- New ideas go into a `docs/ideas.md` list, not straight into code.
- If a feature takes more than 2 weeks, split it into smaller tasks.

## 3. Security Rules

| Rule | Detail |
|------|--------|
| Passwords | Always hash with BCrypt. Never log or return them |
| JWT | Set an expiry (e.g. 24h). Keep the secret in env variables |
| API keys | YouTube and Groq keys only on the backend, never in React |
| Git | Add `.env`, `application-dev.properties`, and keys to `.gitignore` |
| If a key leaks | Revoke it immediately and create a new one |
| Input | Validate every request body (Bean Validation) |
| CORS | Allow only the frontend domain |
| HTTPS | Required in production |
| User data | Collect only what is needed (name, education, college, email) |
| Privacy | Show a short privacy note on the register form |

## 4. Coding Rules

### General
- Write clear names. No single-letter variables except loop counters.
- One function does one job. Keep functions short (aim under 30 lines).
- No copy-paste blocks. Extract a function or component instead.
- Remove unused code and `console.log` / debug prints before committing.
- Comment the **why**, not the obvious **what**.

### Frontend (React)
- Functional components and hooks only.
- One component per file, PascalCase file names.
- API calls only inside `src/api/`, never directly in components.
- Handle three states on every data fetch: loading, error, success.
- Use CSS variables from `variables.css` for colors and spacing. No random hex codes.
- Every image has `alt` text. Every button has clear text or `aria-label`.

### Backend (Spring Boot)
- Follow the layers: Controller → Service → Repository / Client.
- Controllers never touch the database or external APIs directly.
- Use DTOs for requests and responses. Never return entities with passwords.
- Use `GlobalExceptionHandler` for errors with a consistent JSON format.
- Use constructor injection, not field injection.
- Log useful info with a logger. Never log passwords, tokens, or keys.

## 5. AI Rules

- Call the AI **after** YouTube returns real results.
- Send only the needed fields (title, channel, views, likes, date, duration, description snippet).
- Ask for structured JSON output and validate it before using it.
- If the AI fails or times out, fall back to a simple score (views, likes, recency).
- Keep the "why this course" reason to one short sentence.
- Never present AI output as guaranteed. Label it "AI suggestion".

## 6. API and Quota Rules

- Cache every search (default TTL 24 hours).
- Batch video detail requests instead of one call per video.
- Track daily quota use; show a friendly message when exhausted.
- Respect YouTube API Terms of Service: use the embedded player, do not download videos, do not hide ads or branding.
- Do not scrape YouTube pages. Use the official API (and test any transcript library carefully before relying on it).

## 7. Git Rules

| Item | Rule |
|------|------|
| Branches | `main` (stable), `dev` (daily), `feature/<name>` |
| Commits | Small and frequent, with a clear message |
| Message style | `feat:`, `fix:`, `docs:`, `refactor:`, `test:` |
| Merge | Only merge working code into `dev`; only tested code into `main` |
| Push | At least once at the end of every coding day |

Examples: `feat: add login modal`, `fix: handle empty search results`.

## 8. Testing Rules

- Test each feature manually before committing.
- Backend: write unit tests for services (auth, ranking, playlists).
- Test edge cases: empty search, wrong password, expired token, API quota error.
- Check the UI on a 360px phone width and on desktop.
- Do not merge code that breaks the build.

## 9. UI/UX Rules

- Follow `Design.md` colors, fonts, and spacing.
- Mobile-first layout.
- Always show loading skeletons, empty states, and friendly errors.
- Text contrast at least 4.5:1; touch targets at least 44px.
- Do not copy YouTube's logo or branding. Use our own name and logo.

## 10. Documentation Rules

- Keep `README.md` with: what it is, how to run frontend, how to run backend, env variables needed.
- Keep docs in the `docs/` folder.
- Update the docs when structure, APIs, or scope change.
- Write short, simple sentences.

## 11. Definition of Done (per feature)

A feature is done only when:

- [ ] It works end to end (frontend + backend)
- [ ] Loading, error, and empty states are handled
- [ ] No secrets or debug code in the commit
- [ ] Tested manually (and unit tests for backend logic)
- [ ] Works on mobile and desktop
- [ ] Committed with a clear message
- [ ] Docs updated if needed

## 12. Working Style (Pavan + Claude)

- Build **step by step**, confirming after each step.
- Keep each step small enough to finish in one sitting.
- Understand the code before pasting it. If you don't understand a line, ask.
- When stuck for more than 30 minutes, ask for help with the exact error message and the related code.
- Take notes on what you learn; it helps in interviews.

## 13. Ethics and Legal

- Be honest: don't claim "nobody in the world does this".
- Respect creators: always link back to the original YouTube video.
- Protect student data; never sell or share it.
- Follow YouTube API Terms and Google API Services policies.
- Give credit to libraries and tools used.

## 14. Quick Do and Don't

| Do ✅ | Don't ❌ |
|------|---------|
| Cache search results | Call YouTube API on every keystroke |
| Hash passwords | Store plain-text passwords |
| Use env variables | Hard-code API keys |
| Build V1 first | Start all 7 unique features at once |
| Commit small and often | Commit once a week |
| Test on phone width | Only test on your laptop |
| Ask when stuck | Copy code you don't understand |
