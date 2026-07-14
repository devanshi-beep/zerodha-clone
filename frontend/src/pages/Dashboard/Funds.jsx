import { useEffect, useState } from "react";
import api from "../../api.js";

export default function Funds() {
  const [funds, setFunds] = useState(null);

  useEffect(() => {
    api.get("/api/funds").then((res) => setFunds(res.data.funds));
  }, []);

  if (funds === null) return <p>Loading...</p>;

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="label">Available margin</div>
        <div className="value">₹{funds.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
      </div>
    </div>
  );
}
