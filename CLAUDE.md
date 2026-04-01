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

React + Vite app (React 19). No routing, no external state management.

**Components**

- `App.jsx` — holds the `transactions` array in state and passes data/callbacks down. No rendering logic beyond layout.
- `Summary.jsx` — receives `transactions`, computes `totalIncome`, `totalExpenses`, and `balance` internally.
- `TransactionForm.jsx` — owns its own form state; calls `onAdd(transaction)` prop when submitted.
- `TransactionList.jsx` — receives `transactions`, owns filter state (`filterType`, `filterCategory`) internally.

**Data model** — each transaction: `{ id, description, amount, type, category, date }` where `type` is `"income"` or `"expense"` and `amount` is a number.

**Categories** — defined as a constant array in both `TransactionForm.jsx` and `TransactionList.jsx`: `["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`.

**State** — all in-memory (`useState`); no persistence layer. Transactions reset on page reload.

**Styling** — plain CSS in `src/App.css` and `src/index.css`. No CSS framework.
