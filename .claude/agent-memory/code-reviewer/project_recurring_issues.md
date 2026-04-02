---
name: Recurring issues found in codebase reviews
description: Bugs, anti-patterns, and accessibility gaps discovered during code reviews of this project
type: project
---

## Confirmed issues (first full review, 2026-04-01)

- **Data bug in seed data**: Transaction id=4 ("Freelance Work") is typed as "expense" but categorized as "salary" — logically inconsistent seed data.
- **Amount display bug**: Summary.jsx and TransactionList.jsx display raw floating-point numbers (e.g., $1234.5 instead of $1,234.50). No `.toLocaleString()` or `.toFixed(2)` formatting applied.
- **Balance card color**: balance-amount always renders in `--text` (neutral). A negative balance is visually indistinguishable from a positive one — no conditional coloring.
- **`categories` duplication**: Array defined identically in TransactionForm.jsx and TransactionList.jsx. Should live in a shared `src/constants.js`.
- **`id: Date.now()` collision risk**: If two transactions are added within the same millisecond (e.g., programmatically), IDs will collide. Low risk in manual UI use but worth noting.
- **Missing empty state in TransactionList**: When filters produce zero results, no empty state message is shown — the table renders with an empty tbody.
- **`window.confirm` for delete**: Blocks the browser UI thread; not styleable; poor UX on mobile. Should be replaced with an inline confirmation pattern.
- **No input validation beyond empty check**: Amount field accepts 0, negative numbers, and values like "00.". No minimum value guard or NaN check beyond parseFloat.
- **Cell key uses array index**: SpendingChart uses `key={index}` on `<Cell>` components. Stable — categories don't reorder at runtime — but semantically fragile.
- **SpendingChart COLORS do not use CSS variables**: Chart colors are hardcoded hex values, inconsistent with the rest of the design token system.
- **Global `form` selector**: App.css styles `form`, `form input`, `form select`, `form button` globally. Any future `<form>` outside `.add-transaction` will inherit these styles unintentionally.
- **`td:nth-child()` position-dependent selectors**: Date and category columns are styled by position (nth-child 1 and 3). If column order ever changes, these silently break.
- **No responsive/media queries**: `.middle-grid` uses a fixed two-column layout that will break on narrow viewports. No breakpoints defined anywhere in the CSS.
- **Accessibility gaps**: No `aria-label` on filter selects or delete button; no `role="status"` on empty state; `<h1>/<h2>/<h3>` heading hierarchy skips levels (h1 in App, h2 in panels, h3 in summary cards — acceptable but worth noting); no `scope="col"` on `<th>` elements; form inputs lack `<label>` elements (rely on placeholder only).
- **Google Fonts loaded via @import in CSS**: Should be a `<link>` in index.html for performance (avoids render-blocking import inside stylesheet).
- **No `min` attribute on amount input**: `<input type="number">` should have `min="0.01"` to prevent zero or negative submissions via browser native controls.

**How to apply:** Check these patterns first when reviewing new code in this repo. If a fix has been applied, remove it from this list.
