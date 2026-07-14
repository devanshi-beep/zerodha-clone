const products = [
  { name: "Kite", desc: "Trading platform for stocks & derivatives" },
  { name: "Console", desc: "Track your portfolio & reports" },
  { name: "Coin", desc: "Invest directly in mutual funds" },
  { name: "Varsity", desc: "Learn about markets, free" },
];

export default function Products() {
  return (
    <section className="section">
      <h2>Products</h2>
      <div className="cards">
        {products.map((p) => (
          <div className="card" key={p.name}>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
