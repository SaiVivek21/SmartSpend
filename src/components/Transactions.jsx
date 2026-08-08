import { useMemo, useState } from "react";

export default function Transactions({ transactions, onChange }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => transactions.filter((t) => {
    const matchesText = t.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || t.category === category;
    return matchesText && matchesCategory;
  }), [transactions, query, category]);

  const remove = (id) => onChange(transactions.filter((t) => t.id !== id));

  return (
    <section className="card">
      <div className="card-title"><h2>Transactions</h2></div>
      <div className="filters">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions..." />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {["All", "Food", "Travel", "Shopping", "Education", "Others"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Type</th><th>Category</th><th>Amount</th><th>Date</th><th /></tr></thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <td>{t.title}</td><td>{t.type}</td><td>{t.category}</td>
                <td className={t.type === "expense" ? "danger-text" : "success-text"}>₹{Number(t.amount).toLocaleString()}</td>
                <td>{t.date}</td>
                <td><button className="delete-btn" onClick={() => remove(t.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
