const TRANSACTION_KEY = "smartspend_transactions";
const BUDGET_KEY = "smartspend_budget";

const demoTransactions = [
  { id: 1, title: "Grocery Shopping", amount: 850, type: "expense", category: "Food", date: "2026-08-05" },
  { id: 2, title: "Bus Ticket", amount: 120, type: "expense", category: "Travel", date: "2026-08-04" },
  { id: 3, title: "Freelance Work", amount: 2500, type: "income", category: "Others", date: "2026-08-03" },
  { id: 4, title: "Online Course", amount: 699, type: "expense", category: "Education", date: "2026-08-02" },
];

export function loadTransactions() {
  try {
    const saved = localStorage.getItem(TRANSACTION_KEY);
    return saved ? JSON.parse(saved) : demoTransactions;
  } catch {
    return demoTransactions;
  }
}

export function saveTransactions(transactions) {
  localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
}

export function loadBudget() {
  const saved = localStorage.getItem(BUDGET_KEY);
  return saved ? Number(saved) : 30000;
}

export function saveBudget(budget) {
  localStorage.setItem(BUDGET_KEY, String(budget));
}
