export default function TopBar({ title, funds }) {
  return (
    <div className="topbar">
      <h1>{title}</h1>
      {funds !== undefined && (
        <div className="funds-pill">₹{funds.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</div>
      )}
    </div>
  );
}
