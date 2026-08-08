import { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import Budget from "./components/Budget";
import Reports from "./components/Reports";
import Login from "./components/Login";
import { loadTransactions, saveTransactions, loadBudget, saveBudget } from "./services/storage";
import { getInsight } from "./utils/insights";

const initialUser = {
  name: "Vijay",
  email: "vijay@example.com",
};

export default function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState("dashboard");
  const [transactions, setTransactions] = useState(loadTransactions);
  const [budget, setBudget] = useState(loadBudget);

  const refreshTransactions = (next) => {
    setTransactions(next);
    saveTransactions(next);
  };

  const refreshBudget = (value) => {
    setBudget(value);
    saveBudget(value);
  };

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  const insight = useMemo(() => getInsight(transactions), [transactions]);

  if (!user) {
    return <Login onLogin={() => setUser(initialUser)} />;
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">₹</div>
          <span>Smart<span>Spend</span></span>
        </div>

        <nav>
          {[
            ["dashboard", "Dashboard"],
            ["transactions", "Transactions"],
            ["add", "Add Expense"],
            ["budget", "Budget"],
            ["reports", "Reports"],
          ].map(([key, label]) => (
            <button
              key={key}
              className={activePage === key ? "nav-item active" : "nav-item"}
              onClick={() => setActivePage(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <button className="logout" onClick={() => setUser(null)}>Logout</button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>{activePage === "dashboard" ? `Welcome back, ${user.name}!` : "SmartSpend"}</h1>
          </div>
          <div className="profile-chip">
            <div className="avatar">{user.name[0]}</div>
            <span>{user.name}</span>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard
            transactions={transactions}
            budget={budget}
            totals={totals}
            insight={insight}
            onNavigate={setActivePage}
          />
        )}

        {activePage === "transactions" && (
          <Transactions transactions={transactions} onChange={refreshTransactions} />
        )}

        {activePage === "add" && (
          <AddTransaction
            onAdd={(transaction) => {
              refreshTransactions([transaction, ...transactions]);
              setActivePage("transactions");
            }}
          />
        )}

        {activePage === "budget" && (
          <Budget
            budget={budget}
            expenses={totals.expenses}
            onSave={refreshBudget}
          />
        )}

        {activePage === "reports" && (
          <Reports transactions={transactions} />
        )}
      </main>
    </div>
  );
}
