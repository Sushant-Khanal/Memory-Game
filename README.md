# 🃏 Card Royale

A polished memory card game built with **React + Vite**, featuring a dark luxury casino aesthetic, a live timer, combo streaks, and a persistent leaderboard — all without a backend.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-Custom_Properties-1572B6?style=flat-square&logo=css3)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> **Live demo:** [TODO: add deployment URL]

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Game Rules](#game-rules)
- [Architecture](#architecture)
- [Component Reference](#component-reference)
- [Scoring & Leaderboard](#scoring--leaderboard)
- [Customisation](#customisation)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🎴 **4 × 4 grid** of 16 cards (8 emoji pairs), shuffled fresh each game
- ⏱️ **Live timer** — starts on first card click, stops when the last pair is matched
- 🔥 **Combo system** — consecutive matches trigger a streak popup
- 🏅 **Persistent leaderboard** — top 10 scores saved to `localStorage`, ranked by fewest moves then fastest time
- 👤 **Named players** — enter your name before each session; Play Again reuses the same name, Home lets a new player enter theirs
- 📊 **Real-time stats** — pairs found, move count, elapsed time, and accuracy (%) visible throughout
- ⭐ **Post-game rating** — Legendary / Expert / Novice based on move efficiency
- 🎨 **Premium UI** — dark felt-green casino theme, gold accents, CSS 3D card flip animations, staggered deal-in, and match shine effects
- 📱 **Responsive** — playable on desktop, tablet, and mobile

---

## Screenshots

> TODO: add screenshots or a GIF here

| Name Entry | Gameplay | Win Screen | Leaderboard |
|------------|----------|------------|-------------|
| TODO       | TODO     | TODO       | TODO        |

---

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | React 18 | Hooks-first component model |
| Build tool | Vite 5 | Fast HMR and lean dev/prod pipeline |
| Styling | Vanilla CSS + Custom Properties | Zero runtime overhead, full design control |
| Fonts | Google Fonts (Cinzel + Lato) | Pairs serif elegance with clean body text |
| Persistence | `localStorage` | No backend needed for leaderboard |
| State | `useState` / `useRef` | Sufficient for this scope; no global store needed |

---

## Project Structure

```
card-royale/
├── public/
├── src/
│   ├── components/
│   │   ├── Card.jsx          # Individual card with 3D flip animation
│   │   ├── GameHeader.jsx    # Stats bar, timer, leaderboard button
│   │   ├── Leaderboard.jsx   # Top-10 modal, gold/silver/bronze ranks
│   │   ├── NameEntry.jsx     # Entry screen — collects player name
│   │   └── WinMessage.jsx    # Victory modal with rating and actions
│   ├── hooks/
│   │   └── useGameLogic.js   # All game state, timer, shuffle, match logic
│   ├── App.jsx               # Phase controller, score persistence
│   ├── index.css             # Global styles, design tokens, animations
│   └── main.jsx              # React root mount
├── index.html
├── package.json
├── vite.config.js            # TODO: confirm filename
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js **18+**
- npm **9+** or yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/......
cd folder

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build       # outputs to dist/
npm run preview     # locally preview the production build
```

---

## Game Rules

1. Enter your name on the start screen.
2. Click any card to reveal it.
3. Click a second card — if it matches the first, both stay face-up and your score increases.
4. If they don't match, both cards flip back after a short delay.
5. Match all 8 pairs to win. The timer runs from your first click until the last match.
6. After winning you can **Play Again** (same name) or go **Home** to enter a new player name.

---

## Architecture

### Game Phase Flow

```
[name-entry] ──onStart──▶ [playing] ──isGameComplete──▶ [win screen]
     ▲                        │                               │
     │                        │ onHome / New Game             │ onHome
     └────────────────────────┴───────────────────────────────┘
```

### `useGameLogic` Hook

All game logic is isolated in a single custom hook (`src/hooks/useGameLogic.js`), keeping `App.jsx` purely responsible for phase management and persistence. The hook exposes:

| Return value | Type | Description |
|---|---|---|
| `cards` | `Card[]` | Current card array with `isFlipped` / `isMatched` state |
| `score` | `number` | Number of pairs successfully matched |
| `moves` | `number` | Number of pair attempts made |
| `combo` | `number` | Current consecutive-match streak count |
| `showCombo` | `boolean` | Whether the combo popup should be visible |
| `elapsedTime` | `number` | Seconds elapsed since first card click |
| `isGameComplete` | `boolean` | `true` when all pairs are matched |
| `initializeGame` | `() => void` | Resets and reshuffles the board |
| `handleCardClick` | `(card) => void` | Processes a card selection |

**Timer behaviour:** The timer is driven by a `setInterval` stored in a `useRef` (not state), preventing re-render side-effects. It starts lazily on the first card click and is cleared both on completion and on unmount.

### Leaderboard Persistence

Scores are stored in `localStorage` under the key `card_royale_leaderboard` as a JSON array. On each save:

1. All existing entries have `isLatest` set to `false`.
2. The new entry is pushed with `isLatest: true`.
3. The array is sorted by `moves ASC`, then `time ASC`.
4. Only the top 10 entries are kept.

No server, no account — works offline and across browser sessions.

---

## Component Reference

### `<NameEntry onStart={fn} />`

Full-screen entry modal. Validates that the name is non-empty and ≤ 20 characters. Submits on Enter key or button click.

### `<GameHeader score moves elapsedTime onReset onLeaderboard total playerName />`

Sticky header showing live stats (pairs, moves, time, accuracy) and a progress bar. Contains the ↺ New Game and 🏅 Leaderboard buttons.

### `<Card card onClick index />`

Renders a single card using CSS `preserve-3d` / `rotateY(180deg)` for the flip. The `index` prop drives the staggered deal-in animation delay.

### `<WinMessage moves score elapsedTime onPlayAgain onHome onViewLeaderboard />`

Victory overlay with confetti, a star rating, full stats, and three action buttons.

### `<Leaderboard entries currentPlayer onClose />`

Top-10 table modal. Highlights the current player's latest entry with a "YOU" badge. Click outside or press ✕ to close.

---

## Scoring & Leaderboard

**Star ratings** are based on total moves to complete the board (8 pairs):

| Rating | Moves | Label |
|--------|-------|-------|
| ★★★ | ≤ 16 | Legendary |
| ★★☆ | ≤ 22 | Expert |
| ★☆☆ | > 22 | Novice |

**Leaderboard ranking** uses moves as the primary sort key, elapsed time as the tiebreaker. Lower is better on both.

---

## Customisation

### Changing the card set

Edit the `cardValues` array in `src/App.jsx`. Any even-length array of unique strings or emoji will work — the board size adjusts automatically.

```js
const cardValues = [
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼",
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼",
];
```

### Changing the theme

All colours are CSS custom properties in `:root` at the top of `src/index.css`:

```css
:root {
  --gold:        #c9a84c;
  --felt:        #0d2b1e;
  --bg:          #070d0b;
  /* … */
}
```

### Changing the star rating thresholds

Update the `getRating()` function inside `src/components/WinMessage.jsx`.

---

## Roadmap

- [ ] Sound effects (flip, match, win)
- [ ] Difficulty modes (4×4 / 6×6 grid)
- [ ] Countdown timer mode
- [ ] Multiplayer / hot-seat mode
- [ ] Animated card deck intro sequence
- [ ] PWA support (offline play, installable)
- [ ] Server-side leaderboard (optional backend)

---

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please keep PRs focused — one feature or fix per PR.

---

## License

Distributed under the [MIT License](LICENSE).

---

<p align="center">Built with React · Designed for fun · Open source</p>
