import { useState } from "react";

const categories = ["Food", "Travel", "Shopping", "Education", "Others"];

export default function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().slice(0, 10),
  });

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || Number(form.amount) <= 0) return;
    onAdd({ ...form, amount: Number(form.amount), id: Date.now() });
  };

  return (
    <section className="card form-card">
      <h2>Add Transaction</h2>
      <p className="muted">Record your income or expense.</p>

      <form onSubmit={submit} className="form-grid">
        <label>Title<input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Grocery Shopping" /></label>
        <label>Amount<input type="number" min="1" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="Enter amount" /></label>
        <label>Type
          <select value={form.type} onChange={(e) => update("type", e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>
        <label>Category
          <select value={form.category} onChange={(e) => update("category", e.target.value)}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Date<input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
        <div className="form-actions"><button className="primary-btn" type="submit">Add Transaction</button></div>
      </form>
    </section>
  );
}
