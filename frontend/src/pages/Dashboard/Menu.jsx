import { NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext.jsx";

export default function Menu() {
  const { logout } = useAuth();
  return (
    <div className="menu">
      <div className="brand">Zerodha</div>
      <ul>
        <li><NavLink to="/dashboard" end className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/dashboard/watchlist" className={({isActive}) => isActive ? "active" : ""}>Watchlist</NavLink></li>
        <li><NavLink to="/dashboard/positions" className={({isActive}) => isActive ? "active" : ""}>Positions</NavLink></li>
        <li><NavLink to="/dashboard/holdings" className={({isActive}) => isActive ? "active" : ""}>Holdings</NavLink></li>
        <li><NavLink to="/dashboard/orders" className={({isActive}) => isActive ? "active" : ""}>Orders</NavLink></li>
        <li><NavLink to="/dashboard/funds" className={({isActive}) => isActive ? "active" : ""}>Funds</NavLink></li>
      </ul>
      <div className="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
