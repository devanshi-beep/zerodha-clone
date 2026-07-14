import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Zerodha</div>
      <ul>
        <li>Products</li>
        <li>Pricing</li>
        <li>Support</li>
      </ul>
      <div className="actions">
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/signup" className="btn-filled">Sign up</Link>
      </div>
    </nav>
  );
}
