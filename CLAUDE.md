# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

No test runner is configured.

## Architecture

This is a single-component React app (Vite + React 19). All logic lives in `src/App.jsx` — there are no sub-components, routing, or external state management.

**Data model** — each transaction has: `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"` and `amount` is stored as a string (not a number).

**Known bugs** — `amount` is stored as a string, so `totalIncome`, `totalExpenses`, and `balance` computed via `.reduce()` will produce string concatenation instead of numeric sums. This is intentional per the course material.

**State** — all state is in-memory (`useState`); there is no persistence layer. Transactions reset on page reload.

**Styling** — plain CSS in `src/App.css` and `src/index.css`. No CSS framework.
