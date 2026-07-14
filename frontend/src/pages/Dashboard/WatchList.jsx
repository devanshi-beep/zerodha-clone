import { useState } from "react";
import api from "../../api.js";
import stockList from "../../stockData.js";

export default function WatchList() {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const placeOrder = async (mode) => {
    if (!selected) return;
    setSubmitting(true);
    setMessage("");
    try {
      await api.post("/api/newOrder", {
        name: selected.name,
        qty: Number(qty),
        price: selected.price,
        mode,
      });
      setMessage(`${mode} order placed for ${qty} × ${selected.name}`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Instrument</th>
            <th>LTP</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {stockList.map((s) => (
            <tr
              key={s.name}
              style={{ cursor: "pointer", background: selected?.name === s.name ? "#f0f6ff" : "transparent" }}
              onClick={() => setSelected(s)}
            >
              <td>{s.name}</td>
              <td>{s.price.toFixed(2)}</td>
              <td className={s.isDown ? "loss" : "profit"}>{s.change}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="order-form" style={{ marginTop: 20 }}>
          <label>
            Instrument
            <input value={selected.name} disabled />
          </label>
          <label>
            Price
            <input value={selected.price} disabled />
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </label>
          <button className="buy-btn" disabled={submitting} onClick={() => placeOrder("BUY")}>
            Buy
          </button>
          <button className="sell-btn" disabled={submitting} onClick={() => placeOrder("SELL")}>
            Sell
          </button>
        </div>
      )}
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
