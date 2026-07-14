import { useEffect, useState } from "react";
import api from "../../api.js";

export default function DashboardHome() {
  const [holdings, setHoldings] = useState([]);
  const [funds, setFunds] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/api/holdings"), api.get("/api/funds")]).then(
      ([h, f]) => {
        setHoldings(h.data);
        setFunds(f.data.funds);
        setLoading(false);
      }
    );
  }, []);

  if (loading) return <p>Loading...</p>;

  const currentValue = holdings.reduce((s, h) => s + h.price * h.qty, 0);
  const investment = holdings.reduce((s, h) => s + h.avg * h.qty, 0);
  const pnl = currentValue - investment;

  return (
    <div>
      <div className="summary-cards">
        <div className="summary-card">
          <div className="label">Available margin</div>
          <div className="value">₹{funds.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">Holdings value</div>
          <div className="value">₹{currentValue.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">P&amp;L</div>
          <div className={`value ${pnl >= 0 ? "profit" : "loss"}`}>
            {pnl >= 0 ? "+" : ""}₹{pnl.toFixed(2)}
          </div>
        </div>
      </div>
      <p>Use the menu on the left to browse the Watchlist, place orders, and check your Holdings, Positions and Orders.</p>
    </div>
  );
}
