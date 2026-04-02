import { useState } from 'react'
import { CATEGORIES } from './constants'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    const parsedAmount = parseFloat(amount);
    if (!amount) {
      newErrors.amount = "Amount is required.";
    } else if (isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Amount must be a positive number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onAdd({
      id: Date.now(),
      description: description.trim(),
      amount: parsedAmount,
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description" className="sr-only">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          value={description}
          className={errors.description ? "input-error" : ""}
          onChange={(e) => { setDescription(e.target.value); setErrors(prev => ({ ...prev, description: undefined })); }}
        />
        {errors.description && <p className="field-error" role="alert">{errors.description}</p>}

        <label htmlFor="amount" className="sr-only">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={amount}
          className={errors.amount ? "input-error" : ""}
          onChange={(e) => { setAmount(e.target.value); setErrors(prev => ({ ...prev, amount: undefined })); }}
        />
        {errors.amount && <p className="field-error" role="alert">{errors.amount}</p>}

        <label htmlFor="type" className="sr-only">Transaction type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <label htmlFor="category" className="sr-only">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
