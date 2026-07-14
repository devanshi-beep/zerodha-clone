import { useEffect, useState } from "react";
import api from "../../api.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/orders").then((res) => {
      setOrders(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (!orders.length) return <div className="empty-state">You haven't placed any orders yet.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Instrument</th>
          <th>Mode</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <tr key={o._id}>
            <td>{o.name}</td>
            <td className={o.mode === "BUY" ? "profit" : "loss"}>{o.mode}</td>
            <td>{o.qty}</td>
            <td>{o.price.toFixed(2)}</td>
            <td>{new Date(o.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
