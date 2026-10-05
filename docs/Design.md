# Design Document (UI/UX)

**Project:** AI Course Finder for College Students (working title)
**Owner:** Pavan B C
**Status:** Draft v1
**Date:** 5 Oct 2026

---

## 1. Design Goals

- Feel familiar: a clean video-card grid that students already know how to use.
- Be fast to scan: thumbnail, title, channel, and a short AI reason on every card.
- Be mobile-first: most students will use a phone.
- Be original: similar layout idea to video sites, but our own name, logo, colors, and the AI "Why this course?" feature. Do not copy YouTube's logo or branding.

## 2. Design Principles

1. **Search first.** The search box is the hero of the home page.
2. **Clarity over decoration.** Few colors, lots of whitespace.
3. **Show the reason.** Every recommendation explains itself.
4. **Low friction.** Browse without login; sign up only on first search.
5. **Light on data.** Lazy-load thumbnails, small images.

## 3. Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Indigo | `#4F46E5` |
| Primary dark (hover) | Deep indigo | `#4338CA` |
| Accent | Amber | `#F59E0B` |
| Success (good score) | Green | `#16A34A` |
| Warning (outdated) | Orange | `#EA580C` |
| Background (light) | Off-white | `#F9FAFB` |
| Surface (cards) | White | `#FFFFFF` |
| Text main | Slate | `#0F172A` |
| Text muted | Gray | `#64748B` |
| Border | Light gray | `#E2E8F0` |

**Dark mode (optional, V2):** background `#0B1020`, surface `#141B2D`, text `#E5E7EB`.

CSS variables example:

```css
:root {
  --primary: #4F46E5;
  --primary-dark: #4338CA;
  --accent: #F59E0B;
  --bg: #F9FAFB;
  --surface: #FFFFFF;
  --text: #0F172A;
  --muted: #64748B;
  --border: #E2E8F0;
  --radius: 12px;
}
```

## 4. Typography

| Use | Font | Size / Weight |
|-----|------|---------------|
| Headings | Inter | 24 to 32px, 700 |
| Card title | Inter | 16px, 600 (max 2 lines) |
| Body | Inter | 14 to 16px, 400 |
| Small / meta | Inter | 12 to 13px, 400, muted |

Fallback stack: `Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`.

## 5. Spacing and Layout

- Spacing scale: 4, 8, 12, 16, 24, 32, 48 px.
- Card radius: 12px. Button radius: 8px.
- Max content width: 1280px, centered.
- Grid columns for course cards:

| Screen | Width | Columns |
|--------|-------|---------|
| Mobile | < 640px | 1 |
| Tablet | 640 to 1024px | 2 |
| Laptop | 1024 to 1280px | 3 |
| Desktop | > 1280px | 4 |

## 6. Key Components

### 6.1 Navbar
```
[ ☰ ]  [ Logo + Name ]      [ Search box ............ 🔍 ]      [ Login ] / [ Avatar ▾ ]
```
- Sticky at top.
- On mobile: logo + search icon + avatar; search expands on tap.
- Avatar menu: Profile, Playlists, History, Logout.

### 6.2 Course Card
```
+--------------------------------+
|  [ Thumbnail 16:9 ]   [12:30:00]|   <- duration badge
|--------------------------------|
| Python Full Course for Beginners|   <- title (2 lines max)
| freeCodeCamp  •  4.2M views     |   <- channel + views
| 🏷 Beginner   🌐 English        |   <- level + language chips
| ✨ Clear teaching, covers OOP   |   <- AI reason (1 line)
| [ ▶ Watch ]        [ ＋ Save ]  |
+--------------------------------+
```
- Hover (desktop): slight lift + shadow.
- Whole card clickable; Save button stops propagation.
- V2 badges: `Fluff 8%`, `Updated 2025`, `~1.2 GB/hr`.

### 6.3 Filters
Row of chips above results: **Level** (Beginner / Intermediate / Advanced), **Language** (English / Hindi / Kannada / Tamil / Telugu), **Goal** (Placements / VTU / Projects).
- Horizontal scroll on mobile.
- Selected chip: filled primary color.

### 6.4 Auth Modal
- Opens on first Search if not logged in.
- Two tabs: **Login** | **Register**.
- Register fields: Name, Education, College, Email, Password.
- Inline validation, show/hide password, loading state on button.
- Close button (✕) and click outside to dismiss; the search resumes after login.

### 6.5 Video Player (Watch page)
- Embedded YouTube IFrame, 16:9, full width on mobile.
- Below: title, channel, AI reason, Save to playlist button.
- Right side (desktop): "Related" or "Next in this roadmap".

### 6.6 Empty, Loading, Error States
| State | Design |
|-------|--------|
| Loading | Skeleton cards (gray shimmer) |
| No results | Illustration + "Try a different topic" |
| Error | Friendly message + Retry button |
| Quota exhausted | "Too many searches today, showing saved results" |

## 7. Page Wireframes

### 7.1 Home (`/`)
```
+------------------------------------------------------+
| Navbar                                               |
+------------------------------------------------------+
|        Find the best course. Not just any course.    |
|        [ What do you want to learn?     ] [Search]   |
|        Popular: Python · DSA · Java · AWS · AI/ML    |
+------------------------------------------------------+
|  Trending for students                               |
|  [Card] [Card] [Card] [Card]                         |
|  [Card] [Card] [Card] [Card]                         |
+------------------------------------------------------+
| Footer                                               |
+------------------------------------------------------+
```

### 7.2 Results (`/results?q=python`)
```
+------------------------------------------------------+
| Navbar                                               |
| Results for "python"                                 |
| Filters: [Level ▾] [Language ▾] [Goal ▾]             |
|                                                      |
| ⭐ AI Top 5                                          |
| [Card #1 ✨ reason]  [Card #2]  [Card #3] ...        |
|                                                      |
| More results                                         |
| [Card] [Card] [Card] [Card]                          |
+------------------------------------------------------+
```

### 7.3 Watch (`/watch/:id`)
```
+--------------------------------+---------------------+
| [        Video player        ] | Related / Next up   |
| Title                          | [thumb] title       |
| Channel • views                | [thumb] title       |
| ✨ Why this course?            | [thumb] title       |
| [＋ Save to playlist]          |                     |
+--------------------------------+---------------------+
```

### 7.4 Playlists (`/playlists`)
- Grid of playlist cards (cover = first video thumbnail, name, item count).
- "＋ New playlist" button.
- Open a playlist to see its videos with a remove option.

### 7.5 History (`/history`)
- List grouped by day: Today, Yesterday, Earlier.
- Each row: thumbnail, title, time watched, remove icon.
- "Clear history" button at top.

### 7.6 Profile (`/profile`)
- Avatar (initials), name, email.
- Editable: education, college.
- Stats: playlists count, videos watched.
- Logout button.

## 8. User Flows

```
Home → Click Search → (not logged in?) → Auth Modal → Login/Register
     → Results (AI Top 5 + more) → Click card → Watch page
     → Save to playlist / auto-added to History
```

## 9. Responsive Behavior

| Element | Mobile | Desktop |
|---------|--------|---------|
| Navbar | Logo, search icon, avatar | Full search bar |
| Grid | 1 column | 3 to 4 columns |
| Filters | Horizontal scroll chips | Inline row |
| Watch page | Player on top, details below | Player left, related right |
| Sidebar | Hidden (hamburger) | Optional collapsible |

## 10. Accessibility

- Color contrast at least 4.5:1 for text.
- All images have `alt` text; icons have `aria-label`.
- Full keyboard navigation and visible focus ring.
- Modal traps focus and closes with `Esc`.
- Touch targets at least 44x44px.
- Respect `prefers-reduced-motion`.

## 11. Motion

- Transitions 150 to 250ms, ease-out.
- Card hover lift, modal fade + scale, skeleton shimmer.
- No heavy animations (keeps it fast on low-end phones).

## 12. Branding

- Name: to be decided (ideas: *CourseRadar*, *LearnLens*, *SkillSift*, *StudyPick*).
- Logo: simple icon + wordmark, indigo primary.
- Tagline: "Find the best course. Not just any course."
- Do not use YouTube's logo or red/white play-button branding as our own identity.

## 13. Icons and Assets

- Icon set: Lucide React (free, light).
- Thumbnails: from YouTube API, lazy-loaded.
- Fallback thumbnail: gradient with a play icon.

## 14. Design Checklist (before launch)

- [ ] Works on a 360px wide phone
- [ ] Skeleton loaders on all lists
- [ ] Empty and error states designed
- [ ] Contrast and keyboard checks pass
- [ ] Lighthouse score above 90 for performance
- [ ] Privacy note visible in register form
