import { useState } from 'react'
import { CATEGORIES } from './constants'

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <label htmlFor="filter-type" className="sr-only">Filter by type</label>
        <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="filter-category" className="sr-only">Filter by category</label>
        <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="no-data" role="status">No transactions match the selected filters.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td className="col-date">{t.date}</td>
                <td>{t.description}</td>
                <td className="col-category">{t.category}</td>
                <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                  {t.type === "income" ? "+" : "-"}{fmt(Math.abs(t.amount))}
                </td>
                <td>
                  {pendingDelete === t.id ? (
                    <div className="action-cell">
                      <button className="confirm-btn" onClick={() => { onDelete(t.id); setPendingDelete(null); }}>Confirm</button>
                      <button className="cancel-btn" onClick={() => setPendingDelete(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button className="delete-btn" onClick={() => setPendingDelete(t.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList
