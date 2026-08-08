import { useState } from "react";

export default function Budget({ budget, expenses, onSave }) {
  const [value, setValue] = useState(budget);
  const percent = budget ? Math.min(100, (expenses / budget) * 100) : 0;

  return (
    <section className="card form-card">
      <h2>Monthly Budget</h2>
      <p className="muted">Set a spending limit and track your progress.</p>
      <label>Monthly budget
        <input type="number" min="0" value={value} onChange={(e) => setValue(Number(e.target.value))} />
      </label>
      <button className="primary-btn" onClick={() => onSave(value)}>Save Budget</button>

      <div className="budget-box">
        <strong>₹{expenses.toLocaleString()}</strong>
        <span> spent of ₹{Number(value).toLocaleString()}</span>
        <div className="progress"><span style={{ width: `${percent}%` }} /></div>
      </div>
    </section>
  );
}
