# Architecture Document

**Project:** AI Course Finder for College Students (working title)
**Owner:** Pavan B C
**Status:** Draft v1
**Date:** 5 Oct 2026

---

## 1. Architecture Overview

A classic 3-tier web app with two external services.

```
+-----------------+        HTTPS / JSON        +----------------------+
|  React (Vite)   | <------------------------> |  Spring Boot API     |
|  Frontend (SPA) |                            |  (REST + JWT)        |
+-----------------+                            +----------+-----------+
                                                          |
                          +-------------------------------+---------------------+
                          |                               |                     |
                 +--------v--------+            +---------v--------+   +--------v--------+
                 |  PostgreSQL /   |            | YouTube Data API |   |   Groq AI API   |
                 |  MySQL          |            |  (search, meta)  |   | (rank, explain) |
                 +-----------------+            +------------------+   +-----------------+
```

**Key rule:** the browser never talks to YouTube Data API or Groq directly. All API keys stay on the backend.

## 2. Components

### 2.1 Frontend (React + Vite)
| Module | Responsibility |
|--------|----------------|
| Pages | Home, Results, Watch, Playlists, History, Profile |
| Components | Navbar, SearchBar, CourseCard, AuthModal, Filters, Player |
| State | React Context (auth) + React Query (server data) |
| Routing | React Router |
| HTTP | Axios with JWT interceptor |

### 2.2 Backend (Spring Boot)
Layered structure:

```
controller  ->  service  ->  repository  ->  database
                  |
                  +-> client (YouTubeClient, GroqClient)
```

| Package | Responsibility |
|---------|----------------|
| `controller` | REST endpoints, request validation |
| `service` | Business logic (search, ranking, playlists, history) |
| `repository` | Spring Data JPA interfaces |
| `client` | Wrappers for YouTube and Groq APIs |
| `security` | JWT filter, Spring Security config, BCrypt |
| `model` / `dto` | Entities and request/response objects |
| `config` | CORS, caching, environment properties |

### 2.3 Database
PostgreSQL (or MySQL) with these tables: `users`, `playlists`, `playlist_items`, `watch_history`, `search_cache`.

### 2.4 External Services
| Service | Used for | Notes |
|---------|----------|-------|
| YouTube Data API v3 | Search, video details | Free quota (~10,000 units/day, search costs 100) |
| Groq API | Rank courses, write "why this course" | Called only after real YouTube results exist |

## 3. Core Flows

### 3.1 Register / Login
```
User -> React AuthModal -> POST /api/auth/register
     -> AuthService: validate, BCrypt hash, save User
     -> POST /api/auth/login -> JWT returned
     -> React stores token -> sends it in Authorization header
```

### 3.2 Search (main flow)
```
1. User clicks Search (not logged in? -> AuthModal first)
2. React -> GET /api/search?q=python&level=beginner&lang=en
3. SearchService checks search_cache
     - HIT  -> return cached ranked results
     - MISS -> continue
4. YouTubeClient fetches videos/playlists + metadata (views, likes, date, duration)
5. GroqClient receives ONLY these real results and returns:
     ranked top 5 + short reason for each
6. Save to search_cache, return to React
7. React renders CourseCards
```
AI never invents links: it can only rank what YouTube returned.

### 3.3 Watch + History
```
User opens a course -> embedded YouTube IFrame player
-> POST /api/history (video_id, title) -> saved with timestamp
```

### 3.4 Playlists
```
Add to playlist -> POST /api/playlists/{id}/items
View playlists  -> GET  /api/playlists
```

## 4. Data Model

```
users(id, name, education, college, email UNIQUE, password_hash, created_at)

playlists(id, user_id FK, name, created_at)

playlist_items(id, playlist_id FK, video_id, title, thumbnail_url, added_at)

watch_history(id, user_id FK, video_id, title, thumbnail_url, watched_at)

search_cache(id, cache_key UNIQUE, response_json, cached_at)
```

Relationships: one user has many playlists; one playlist has many items; one user has many history rows.

## 5. API Design

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Get JWT |
| GET | /api/search | Yes | Ranked results |
| GET | /api/playlists | Yes | List playlists |
| POST | /api/playlists | Yes | Create playlist |
| POST | /api/playlists/{id}/items | Yes | Add item |
| DELETE | /api/playlists/{id}/items/{itemId} | Yes | Remove item |
| GET | /api/history | Yes | View history |
| POST | /api/history | Yes | Add history entry |
| DELETE | /api/history | Yes | Clear history |
| GET | /api/profile | Yes | View profile |
| PUT | /api/profile | Yes | Update profile |

Standard error format: `{ "status": 400, "message": "..." }`.

## 6. Security

- Passwords hashed with BCrypt, never stored in plain text.
- JWT with expiry; validated in a Spring Security filter.
- API keys in environment variables, never in the frontend or Git.
- CORS limited to the frontend domain.
- Input validation (Bean Validation) on all request bodies.
- HTTPS in production.
- Collect only needed student data; add a short privacy note.

## 7. Caching and Quota Strategy

- Cache key = query + level + language.
- Store ranked response in `search_cache` with a TTL (e.g. 24 hours).
- On quota exhaustion, return cached results or a friendly message.
- Fetch video details in batches to reduce quota use.

## 8. Deployment

| Part | Platform (free tier) |
|------|---------------------|
| Frontend | Vercel or Netlify |
| Backend | Render or Railway (Docker) |
| Database | Supabase / Neon (Postgres) or Railway |
| Secrets | Platform environment variables |

Later option: move the backend to AWS (EC2/Elastic Beanstalk + RDS).

## 9. Suggested Folder Structure

```
course-finder/
  frontend/
    src/
      pages/  components/  api/  context/  hooks/
  backend/
    src/main/java/com/coursefinder/
      controller/ service/ repository/
      client/ security/ model/ dto/ config/
    src/main/resources/application.properties
  docs/
    PRD.md
    Architecture.md
```

## 10. V2 Extension Points

The V1 design leaves room for unique features without rewrites:

| Feature | Where it plugs in |
|---------|-------------------|
| Fluff detector | New `TranscriptService` + score stored per video |
| Jump-to-topic | Transcript chunks + search over timestamps |
| Frankenstein course | New `CourseBuilderService` using Groq + search results |
| Placement test | New `quiz` module and `user_level` field |
| Outdated detector | Added check inside the ranking step |
| Low-data mode | Estimate from duration + quality, shown on cards |

**Note:** transcripts are not provided by the official YouTube Data API. An unofficial library may be needed (possibly a small Python microservice), so test this early.

## 11. Key Decisions

| Decision | Reason |
|----------|--------|
| Spring Boot + React | Industry-standard stack, good for interviews |
| JWT auth | Stateless, simple for an SPA |
| AI ranks only real results | Prevents fake links |
| Cache searches | Protects the small YouTube quota |
| Embedded player | Allows real watch-history tracking |
| Monolith backend first | Simpler than microservices for a solo student |
