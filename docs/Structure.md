# Project Structure

**Project:** AI Course Finder for College Students (working title)
**Owner:** Pavan B C
**Status:** Draft v1
**Date:** 5 Oct 2026

---

## 1. Root Layout

```
course-finder/
├── frontend/              # React (Vite) app
├── backend/               # Spring Boot (Java) API
├── docs/                  # PRD, Architecture, Structure
│   ├── PRD.md
│   ├── Architecture.md
│   └── Structure.md
├── .gitignore
└── README.md
```

## 2. Frontend Structure (React + Vite)

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                    # Axios setup + API calls
│   │   ├── axiosClient.js      # base URL + JWT interceptor
│   │   ├── authApi.js
│   │   ├── searchApi.js
│   │   ├── playlistApi.js
│   │   ├── historyApi.js
│   │   └── profileApi.js
│   │
│   ├── assets/                 # images, logos, icons
│   │
│   ├── components/             # reusable UI pieces
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CourseCard.jsx
│   │   ├── CourseGrid.jsx
│   │   ├── Filters.jsx
│   │   ├── AuthModal.jsx       # login + register popup
│   │   ├── VideoPlayer.jsx     # YouTube IFrame embed
│   │   ├── AddToPlaylist.jsx
│   │   ├── Loader.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # user + token state
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useDebounce.js
│   │
│   ├── pages/
│   │   ├── Home.jsx            # YouTube-style grid + search box
│   │   ├── Results.jsx         # AI-ranked top results
│   │   ├── Watch.jsx           # player + course details
│   │   ├── Playlists.jsx
│   │   ├── History.jsx
│   │   ├── Profile.jsx
│   │   └── NotFound.jsx
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css       # colors, spacing
│   │
│   ├── utils/
│   │   └── formatters.js       # views, duration, dates
│   │
│   ├── App.jsx                 # routes
│   └── main.jsx
│
├── .env                        # VITE_API_URL (never commit secrets)
├── index.html
├── package.json
└── vite.config.js
```

### Routes

| Path | Page | Login needed |
|------|------|--------------|
| `/` | Home | No |
| `/results?q=` | Results | Yes (popup on first search) |
| `/watch/:videoId` | Watch | Yes |
| `/playlists` | Playlists | Yes |
| `/history` | History | Yes |
| `/profile` | Profile | Yes |

## 3. Backend Structure (Spring Boot)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/coursefinder/
│   │   │   ├── CourseFinderApplication.java
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── CorsConfig.java
│   │   │   │   ├── CacheConfig.java
│   │   │   │   └── AppProperties.java
│   │   │   │
│   │   │   ├── security/
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JwtUtil.java
│   │   │   │   ├── JwtAuthFilter.java
│   │   │   │   └── CustomUserDetailsService.java
│   │   │   │
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java
│   │   │   │   ├── SearchController.java
│   │   │   │   ├── PlaylistController.java
│   │   │   │   ├── HistoryController.java
│   │   │   │   └── ProfileController.java
│   │   │   │
│   │   │   ├── service/
│   │   │   │   ├── AuthService.java
│   │   │   │   ├── SearchService.java
│   │   │   │   ├── RankingService.java
│   │   │   │   ├── PlaylistService.java
│   │   │   │   ├── HistoryService.java
│   │   │   │   └── ProfileService.java
│   │   │   │
│   │   │   ├── client/
│   │   │   │   ├── YouTubeClient.java
│   │   │   │   └── GroqClient.java
│   │   │   │
│   │   │   ├── repository/
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── PlaylistRepository.java
│   │   │   │   ├── PlaylistItemRepository.java
│   │   │   │   ├── WatchHistoryRepository.java
│   │   │   │   └── SearchCacheRepository.java
│   │   │   │
│   │   │   ├── model/               # JPA entities
│   │   │   │   ├── User.java
│   │   │   │   ├── Playlist.java
│   │   │   │   ├── PlaylistItem.java
│   │   │   │   ├── WatchHistory.java
│   │   │   │   └── SearchCache.java
│   │   │   │
│   │   │   ├── dto/                 # request / response objects
│   │   │   │   ├── RegisterRequest.java
│   │   │   │   ├── LoginRequest.java
│   │   │   │   ├── AuthResponse.java
│   │   │   │   ├── CourseResult.java
│   │   │   │   ├── PlaylistRequest.java
│   │   │   │   └── ProfileDto.java
│   │   │   │
│   │   │   └── exception/
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       └── ApiException.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-dev.properties
│   │
│   └── test/java/com/coursefinder/
│       ├── service/
│       └── controller/
│
├── pom.xml
└── Dockerfile
```

### Layer Rules

| Layer | Allowed to call | Never does |
|-------|-----------------|------------|
| Controller | Service | Touch the database or external APIs |
| Service | Repository, Client | Handle HTTP details |
| Client | External APIs | Contain business logic |
| Repository | Database only | Contain business logic |

## 4. Database Tables

```
users            (id, name, education, college, email, password_hash, created_at)
playlists        (id, user_id, name, created_at)
playlist_items   (id, playlist_id, video_id, title, thumbnail_url, added_at)
watch_history    (id, user_id, video_id, title, thumbnail_url, watched_at)
search_cache     (id, cache_key, response_json, cached_at)
```

## 5. Environment Variables

**Backend (`application.properties` reads from env):**

```
DB_URL=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
YOUTUBE_API_KEY=
GROQ_API_KEY=
FRONTEND_URL=http://localhost:5173
```

**Frontend (`.env`):**

```
VITE_API_URL=http://localhost:8080/api
```

Never commit real keys. Add `.env` and `application-dev.properties` to `.gitignore`.

## 6. Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| React components | PascalCase | `CourseCard.jsx` |
| Hooks | camelCase with `use` | `useAuth.js` |
| Java classes | PascalCase | `SearchService` |
| Java methods / variables | camelCase | `findTopCourses()` |
| DB tables / columns | snake_case | `watch_history` |
| REST endpoints | lowercase, plural | `/api/playlists` |
| Git branches | `feature/name` | `feature/login-modal` |

## 7. Git Workflow

```
main        # stable, deployable
dev         # daily work merges here
feature/*   # one branch per feature
```

Commit style: `feat: add login modal`, `fix: cache key bug`, `docs: update PRD`.

## 8. Build Order (follow the structure)

| Step | What to create |
|------|----------------|
| 1 | `frontend/` with Navbar, SearchBar, CourseCard, CourseGrid, Home (dummy data) |
| 2 | `backend/` setup, `User`, `AuthController`, JWT security |
| 3 | `AuthModal` + AuthContext connected to backend |
| 4 | `YouTubeClient` + `SearchController` + Results page |
| 5 | `GroqClient` + `RankingService` |
| 6 | Playlists, History, Profile (backend then frontend) |
| 7 | Deploy, test, V2 features |

## 9. V2 Additions (later)

```
backend/.../service/
├── TranscriptService.java       # fluff detector, jump-to-topic
├── CourseBuilderService.java    # Frankenstein course
├── QuizService.java             # placement test, reroute
└── OutdatedCheckService.java

frontend/src/pages/
├── PlacementTest.jsx
└── CourseBuilder.jsx
```
