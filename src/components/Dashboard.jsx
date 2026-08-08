import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function Dashboard({ transactions, budget, totals, insight, onNavigate }) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const categories = ["Food", "Travel", "Shopping", "Education", "Others"];
  const categoryValues = categories.map((c) =>
    expenses.filter((t) => t.category === c).reduce((s, t) => s + Number(t.amount), 0)
  );

  const doughnut = {
    labels: categories,
    datasets: [{ data: categoryValues }],
  };

  const monthly = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return d.toLocaleString("en-US", { month: "short" });
  });

  const line = {
    labels: monthly,
    datasets: [{
      label: "Expenses",
      data: monthly.map((_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - i));
        return expenses
          .filter((t) => {
            const td = new Date(t.date);
            return td.getMonth() === d.getMonth() && td.getFullYear() === d.getFullYear();
          })
          .reduce((s, t) => s + Number(t.amount), 0);
      }),
      tension: 0.35,
    }],
  };

  const percent = budget ? Math.min(100, (totals.expenses / budget) * 100) : 0;

  return (
    <>
      <section className="stats-grid">
        <Stat title="Total Income" value={totals.income} />
        <Stat title="Total Expenses" value={totals.expenses} danger />
        <Stat title="Remaining Balance" value={totals.balance} />
        <Stat title="This Month Budget" value={budget} />
      </section>

      <section className="content-grid">
        <div className="card chart-card">
          <div className="card-title"><h2>Expenses by Category</h2></div>
          <div className="donut-wrap"><Doughnut data={doughnut} options={{ maintainAspectRatio: false }} /></div>
        </div>

        <div className="card">
          <div className="card-title">
            <h2>Recent Transactions</h2>
            <button className="link-btn" onClick={() => onNavigate("transactions")}>View all</button>
          </div>
          <div className="transaction-list">
            {transactions.slice(0, 5).map((t) => (
              <div className="transaction-row" key={t.id}>
                <div><strong>{t.title}</strong><small>{t.category} · {t.date}</small></div>
                <strong className={t.type === "expense" ? "danger-text" : "success-text"}>
                  {t.type === "expense" ? "-" : "+"} ₹{Number(t.amount).toLocaleString()}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="card">
          <div className="card-title"><h2>Monthly Expense Trend</h2></div>
          <div className="line-wrap"><Line data={line} options={{ maintainAspectRatio: false }} /></div>
        </div>

        <div className="card insight-card">
          <div className="insight-icon">✦</div>
          <div>
            <h2>Smart Insight</h2>
            <p>{insight}</p>
          </div>
        </div>
      </section>

      <section className="card budget-summary">
        <div>
          <h2>Monthly Budget</h2>
          <p className="muted">₹{totals.expenses.toLocaleString()} spent of ₹{budget.toLocaleString()}</p>
        </div>
        <div className="progress"><span style={{ width: `${percent}%` }} /></div>
      </section>
    </>
  );
}

function Stat({ title, value, danger }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <strong className={danger ? "danger-text" : ""}>₹{Number(value).toLocaleString()}</strong>
    </div>
  );
}
