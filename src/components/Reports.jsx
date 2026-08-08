import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Reports({ transactions }) {
  const categories = ["Food", "Travel", "Shopping", "Education", "Others"];
  const data = {
    labels: categories,
    datasets: [{
      label: "Expense",
      data: categories.map((c) =>
        transactions.filter((t) => t.type === "expense" && t.category === c)
          .reduce((sum, t) => sum + Number(t.amount), 0)
      ),
    }],
  };

  return (
    <section className="card report-card">
      <h2>Expense Reports</h2>
      <p className="muted">Category-wise expense summary.</p>
      <div className="bar-wrap"><Bar data={data} options={{ maintainAspectRatio: false }} /></div>
    </section>
  );
}
