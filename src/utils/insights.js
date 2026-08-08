export function getInsight(transactions) {
  const expenses = transactions.filter((t) => t.type === "expense");
  if (!expenses.length) return "Add a few expenses to receive a spending insight.";

  const totals = expenses.reduce((map, t) => {
    map[t.category] = (map[t.category] || 0) + Number(t.amount);
    return map;
  }, {});

  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
  const total = expenses.reduce((sum, t) => sum + Number(t.amount), 0);
  const share = Math.round((top[1] / total) * 100);

  return `${top[0]} is currently your highest expense category, making up about ${share}% of your recorded spending.`;
}
