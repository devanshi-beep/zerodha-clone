import { useEffect, useState } from "react";
import api from "../../api.js";

export default function Positions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/positions").then((res) => {
      setPositions(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading positions...</p>;
  if (!positions.length) return <div className="empty-state">No open positions.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Instrument</th>
          <th>Qty</th>
          <th>Avg</th>
          <th>LTP</th>
          <th>P&amp;L</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((p) => {
          const pnl = (p.price - p.avg) * p.qty;
          return (
            <tr key={p._id}>
              <td>{p.product}</td>
              <td>{p.name}</td>
              <td>{p.qty}</td>
              <td>{p.avg.toFixed(2)}</td>
              <td>{p.price.toFixed(2)}</td>
              <td className={pnl >= 0 ? "profit" : "loss"}>{pnl.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
