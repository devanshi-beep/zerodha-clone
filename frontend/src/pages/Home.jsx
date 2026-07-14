import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import Products from "../components/Products.jsx";
import Pricing from "../components/Pricing.jsx";
import Support from "../components/Support.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
      <Pricing />
      <Support />
      <Footer />
    </div>
  );
}
