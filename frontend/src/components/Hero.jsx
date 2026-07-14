import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Invest in everything.</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more. Open a free demat account in minutes — this is a learning
          clone, not a real brokerage.
        </p>
        <Link to="/signup" className="btn-filled" style={{ padding: "12px 24px", borderRadius: 4 }}>
          Sign up for free
        </Link>
      </div>
      <div className="hero-image">📈</div>
    </section>
  );
}
