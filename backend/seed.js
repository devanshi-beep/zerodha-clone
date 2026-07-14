// Run with: npm run seed -- <userEmail>
// Populates sample holdings and positions for an existing user, so the
// dashboard has data to show right after signup.
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/UserModel");
const Holdings = require("./models/HoldingsModel");
const Positions = require("./models/PositionsModel");

const holdingsData = [
  { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
  { name: "HDFCBANK", qty: 8, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
  { name: "INFY", qty: 2, avg: 1555.45, price: 1466.05, net: "-5.75%", day: "+0.11%" },
  { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
  { name: "TCS", qty: 5, avg: 3131.0, price: 3134.35, net: "+0.11%", day: "-0.10%" },
];

const positionsData = [
  { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
  { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+0.58%", day: "-1.35%", isLoss: true },
];

async function seed() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npm run seed -- user@example.com");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.error("No user found with that email. Sign up first, then seed.");
    process.exit(1);
  }

  await Holdings.deleteMany({ user: user._id });
  await Positions.deleteMany({ user: user._id });

  await Holdings.insertMany(holdingsData.map((h) => ({ ...h, user: user._id })));
  await Positions.insertMany(positionsData.map((p) => ({ ...p, user: user._id })));

  console.log(`Seeded sample holdings & positions for ${email}`);
  process.exit(0);
}

seed();
