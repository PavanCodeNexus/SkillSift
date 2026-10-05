# Product Requirements Document (PRD)

**Project:** AI Course Finder for College Students (working title)
**Owner:** Pavan B C
**Status:** Draft v1
**Date:** 5 Oct 2026

---

## 1. Overview

A website where college students search for a topic (e.g. "Python", "DSA", "AWS"). The site fetches real YouTube courses, uses AI to rank them for the student's level and goal, and shows them in a YouTube-style card grid. Students can save playlists, view watch history, and manage a profile.

## 2. Problem Statement

Students want to learn a programming language or skill, but YouTube returns thousands of videos. They cannot tell which course is good, current, or right for their level, so they waste time or quit.

## 3. Goals

- Help a student find the best course for a topic in under 1 minute.
- Show only real YouTube results (no AI-invented links).
- Give a clear reason why each course is recommended.
- Be a portfolio-quality, finishable full-stack project.

### Non-Goals (V1)
- Hosting videos ourselves.
- Copying YouTube's exact design or logo.
- Mobile app.
- Payments or paid courses.

## 4. Target Users

- Primary: college students (first to final year), especially in engineering.
- Needs: level-based, language-based, goal-based course discovery (placements, exams, projects).

## 5. User Flow

1. User opens the **home page** (search box, trending cards, no login needed).
2. User clicks **Search**.
3. If not logged in, a **login / register popup** appears.
4. Register asks: name, education, college, email, password.
5. After login, **results page** shows course cards.
6. Clicking a card opens the video in an embedded player (or YouTube).
7. User can add to a **playlist**; watched videos go to **history**.
8. User can view/edit **profile**.

## 6. Scope

### V1 (MVP)
| # | Feature | Priority |
|---|---------|----------|
| 1 | YouTube-style home page (card grid) | Must |
| 2 | Register / login (JWT) with profile fields | Must |
| 3 | Search via YouTube Data API | Must |
| 4 | Filters: level, language | Must |
| 5 | AI top 5 with "why this course" reason | Must |
| 6 | Playlists (create, add, remove, view) | Should |
| 7 | Watch history | Should |
| 8 | Profile page | Should |

### V2 (Unique features, one at a time)
1. **Fluff detector**: transcript-based content vs. fluff score.
2. **Jump-to-topic**: exact timestamps inside long courses.
3. **Frankenstein course**: custom playlist from the best videos of different creators.
4. Placement test to detect real level.
5. Outdated course detector.
6. Stuck-and-reroute after a failed quiz.
7. Low-data mode (estimated data usage per hour).

## 7. Functional Requirements

### Authentication
- FR-1: User can register with name, education, college, email, password.
- FR-2: User can log in and receive a JWT.
- FR-3: Search requires login; home page does not.
- FR-4: Passwords stored hashed (BCrypt).

### Search & Results
- FR-5: Backend calls YouTube Data API and returns real videos/playlists only.
- FR-6: AI ranks and explains results using YouTube metadata (title, views, likes, date, duration).
- FR-7: Results cached to save API quota.
- FR-8: Filters for level and language.

### Playlists & History
- FR-9: User can create multiple playlists and add/remove courses.
- FR-10: Watch history records each video opened, with timestamp.
- FR-11: User can clear history.

### Profile
- FR-12: User can view and edit name, education, college.

## 8. Non-Functional Requirements

- **Performance:** results within ~3 seconds for cached queries.
- **Security:** BCrypt, JWT expiry, input validation, API keys only on the backend.
- **Privacy:** collect only needed data; show a short privacy note.
- **Compatibility:** works on mobile and desktop browsers.
- **Reliability:** graceful message when the API quota is exhausted.

## 9. Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React (Vite), CSS |
| Backend | Java, Spring Boot, Spring Security (JWT) |
| Database | PostgreSQL or MySQL |
| External APIs | YouTube Data API v3, Groq (AI) |
| Hosting | Vercel (frontend), Render/Railway (backend) |

## 10. Data Model (draft)

- **User**: id, name, education, college, email, password_hash, created_at
- **Playlist**: id, user_id, name, created_at
- **PlaylistItem**: id, playlist_id, video_id, title, thumbnail
- **WatchHistory**: id, user_id, video_id, title, watched_at
- **SearchCache**: id, query, filters, response_json, cached_at

## 11. API Endpoints (draft)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Get JWT |
| GET | /api/search?q=&level=&lang= | Ranked course results |
| GET/POST | /api/playlists | List / create playlists |
| POST/DELETE | /api/playlists/{id}/items | Add / remove item |
| GET/POST | /api/history | View / add history |
| GET/PUT | /api/profile | View / update profile |

## 12. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| YouTube API quota (~100 searches/day free) | Cache results in DB |
| Transcripts not officially available (needed for V2) | Test an unofficial library early; keep V2 optional |
| AI invents links | Always fetch from YouTube first; AI only ranks |
| Scope too large | Ship V1 first; add V2 features one by one |
| User data security | Hashed passwords, minimal data, HTTPS |
| Watch tracking limited on redirect | Use embedded player (IFrame API) |

## 13. Milestones

| Phase | Deliverable | Est. time |
|-------|-------------|-----------|
| 1 | React home page with dummy data | 1 to 2 weeks |
| 2 | Spring Boot setup + register/login | 2 weeks |
| 3 | YouTube search + result cards | 2 weeks |
| 4 | AI ranking + reasons | 1 to 2 weeks |
| 5 | Playlists, history, profile | 2 to 3 weeks |
| 6 | Deploy + testing | 1 week |
| V2 | Unique features, one by one | ongoing |

## 14. Success Metrics

- A student finds a suitable course in under 1 minute.
- 100% of shown links are real, working YouTube links.
- At least 20 real students (classmates) try it and give feedback.
- V1 deployed and demo-ready for portfolio and interviews.

## 15. Open Questions

- Embedded player or redirect to YouTube?
- Which languages to support first (English, Hindi, Kannada)?
- Can transcripts be reliably fetched for the fluff detector?
- Final project name?
