import { useEffect, useState } from "react";
import api from "../../api.js";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/holdings").then((res) => {
      setHoldings(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading holdings...</p>;
  if (!holdings.length) return <div className="empty-state">You don't own any stocks yet. Buy some from the Watchlist.</div>;

  const totalInvestment = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const currentValue = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const pnl = currentValue - totalInvestment;

  const chartData = {
    labels: holdings.map((h) => h.name),
    datasets: [
      {
        data: holdings.map((h) => h.price * h.qty),
        backgroundColor: ["#387ed1", "#27a35d", "#e5344a", "#f6a623", "#8e44ad", "#16a085"],
      },
    ],
  };

  return (
    <div>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="label">Total investment</div>
          <div className="value">₹{totalInvestment.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">Current value</div>
          <div className="value">₹{currentValue.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">P&amp;L</div>
          <div className={`value ${pnl >= 0 ? "profit" : "loss"}`}>
            {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>Qty</th>
            <th>Avg cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&amp;L</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const p = (h.price - h.avg) * h.qty;
            return (
              <tr key={h._id}>
                <td>{h.name}</td>
                <td>{h.qty}</td>
                <td>{h.avg.toFixed(2)}</td>
                <td>{h.price.toFixed(2)}</td>
                <td>{(h.price * h.qty).toFixed(2)}</td>
                <td className={p >= 0 ? "profit" : "loss"}>{p.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ maxWidth: 320, margin: "32px auto" }}>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}
