# Weather Forecast (Scandinavia) — React + TypeScript

School project for **IT2810 Web Development (Autumn 2023)**.

This repository contains a responsive weather web application built with React + TypeScript. The app fetches weather data from Meteorologisk institutt (met.no) and lets users browse city forecasts, filter by country, and save favorites using browser storage.

This is a course project and is published as a portfolio artifact only (not maintained).

Note on repository history: The original project was developed on a private university GitLab server. This public repository does not include the original commit history.

---

## What the app does

-   **City weather cards:** View current weather/temperature for multiple cities and navigate back/forward through results.
-   **Filter by country:** Reduce the set of displayed cities by country.
-   **Favorites:** Mark cities as favorites and filter to show only favorites. Favorites persist across browser restarts.
-   **List vs. carousel view:** Toggle between list and carousel presentation (session-persisted while the tab is open).
-   **Plan ahead:** By clicking on a weather card you will be sent to a page showing you the weather for the next six hours.
-   **Responsive UI:** Designed to work well on desktop and mobile (including portrait/landscape).

## Course constraints that shaped the implementation

This project was built under explicit course requirements. Several design decisions exist primarily to satisfy those constraints:

-   **No third-party UI component libraries:** All UI components are custom-built (no external component kits).
-   **REST API + TanStack Query:** Data fetching is implemented with TanStack Query (caching, request de-duplication, and loading/error states) to avoid unnecessary calls and keep UI responsive.
-   **Web Storage usage (required):**
    -   **`localStorage`** persists favorites (must survive browser restart).
    -   **`sessionStorage`** persists view mode (list/carousel) for the current session.
    -   Filter selections are persisted to improve “returning user” UX.
-   **React Router:** Routing is used to separate the main overview from the “plan ahead” page.
-   **Dataset scope:** The app uses a fixed set of cities (hard-coded coordinates) to keep the scope focused on core React fundamentals rather than complex search/selection logic.

## Tech stack

-   **Frontend:** React + TypeScript
-   **Build tool:** Vite
-   **Data fetching/cache:** TanStack Query (React Query)
-   **Routing:** React Router DOM
-   **Testing:** Vitest + React Testing Library; MSW for API mocking
-   **Quality tooling:** ESLint + Prettier

## API

Weather data comes from Meteorologisk institutt (met.no) Locationforecast 2.0:

https://api.met.no/weatherapi/locationforecast/2.0/documentation

Core request/mapping logic lives in `src/api/http.ts`.

## Project structure (high level)

-   `weather-app/src/components/` — app UI components (each in its own folder with TSX + CSS)
-   `weather-app/src/api/` — API client logic (TanStack Query + fetch/mapping)
-   `weather-app/src/types/` — shared TypeScript types
-   `weather-app/src/coordinates/Coordinates.ts` — curated city coordinates
-   `weather-app/test/` — tests, mocks, and setup (kept separate from source)

## Run locally (localhost only)

### Prerequisites

-   Node.js v20.5+
-   npm v9.8+

### Install + start dev server

```bash
cd weather-app
npm install
npm run dev
```

Vite will print a local URL to open in your browser.

## Testing

Run unit/UI/service tests:

```bash
cd weather-app
npm run test
```

Coverage report:

```bash
cd weather-app
npm run coverage
```

Tests use mocking (MSW) so they do not call the real API.

## Team project and authorship

This was a 4-person team project for IT2810. The final solution is a shared team deliverable, and several parts were implemented collaboratively during pair-programming sessions.

## Historical course README

The original course/deliverable README has been moved to:

-   `docs/original-readme.md`
