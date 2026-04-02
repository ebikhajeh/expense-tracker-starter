---
name: Project architecture and conventions
description: Component responsibilities, data model, established patterns, and CSS conventions for the expense tracker app
type: project
---

State lives in App.jsx; all other components are stateless or own only local UI state. No external state management or routing.

Data model: `{ id, description, amount, type, category, date }` — amount is always a number (parseFloat enforced in TransactionForm).

The `categories` array is duplicated in both TransactionForm.jsx and TransactionList.jsx (known DRY violation; not yet extracted to a shared constants file).

CSS uses CSS custom properties (design tokens) defined in index.css under `:root`. Theme is "Midnight Ledger" — dark background (#0c0c10), gold accent (#c9a84c), green for income, red for expenses.

CSS class naming: BEM-ish but informal — `.summary-card`, `.income-amount`, `.expense-amount`, `.balance-amount`, `.delete-btn`, `.no-data`, `.filters`, `.chart-container`, `.add-transaction`, `.transactions`.

SpendingChart uses Recharts (BarChart). COLORS array in SpendingChart uses hardcoded hex values that do not reference CSS custom properties — a known inconsistency.

The `form` element is styled globally (not scoped to a class), which is a known specificity risk.

No media queries exist in App.css or index.css — the layout is not responsive.

**Why:** App is a learning/playground project, not production. Architecture kept intentionally simple.
**How to apply:** Suggestions should stay within the no-library, no-routing, no-state-management constraints.
