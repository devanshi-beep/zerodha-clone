import { Routes, Route } from "react-router-dom";
import Menu from "./Menu.jsx";
import TopBar from "./TopBar.jsx";
import DashboardHome from "./DashboardHome.jsx";
import WatchList from "./WatchList.jsx";
import Holdings from "./Holdings.jsx";
import Positions from "./Positions.jsx";
import Orders from "./Orders.jsx";
import Funds from "./Funds.jsx";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Menu />
      <div className="main-content">
        <TopBar title="Zerodha Dashboard" />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/funds" element={<Funds />} />
        </Routes>
      </div>
    </div>
  );
}
