const express = require("express");
const Holdings = require("../models/HoldingsModel");
const Positions = require("../models/PositionsModel");
const Orders = require("../models/OrdersModel");
const User = require("../models/UserModel");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth);

// ---------- HOLDINGS ----------
router.get("/holdings", async (req, res) => {
  const holdings = await Holdings.find({ user: req.userId });
  res.json(holdings);
});

// ---------- POSITIONS ----------
router.get("/positions", async (req, res) => {
  const positions = await Positions.find({ user: req.userId });
  res.json(positions);
});

// ---------- ORDERS ----------
router.get("/orders", async (req, res) => {
  const orders = await Orders.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(orders);
});

// Place a new order: BUY adds/updates a holding, SELL reduces it.
// Also records the order in the Orders collection.
router.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;
    if (!name || !qty || !price || !mode) {
      return res.status(400).json({ error: "name, qty, price and mode are required" });
    }

    const user = await User.findById(req.userId);
    const cost = qty * price;

    if (mode === "BUY") {
      if (user.funds < cost) return res.status(400).json({ error: "Insufficient funds" });
      user.funds -= cost;

      let holding = await Holdings.findOne({ user: req.userId, name });
      if (holding) {
        const totalQty = holding.qty + Number(qty);
        holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
        holding.qty = totalQty;
        holding.price = price;
        await holding.save();
      } else {
        holding = await Holdings.create({
          user: req.userId,
          name,
          qty,
          avg: price,
          price,
          net: "+0.00%",
          day: "+0.00%",
        });
      }
    } else if (mode === "SELL") {
      const holding = await Holdings.findOne({ user: req.userId, name });
      if (!holding || holding.qty < qty) {
        return res.status(400).json({ error: "Not enough quantity to sell" });
      }
      holding.qty -= Number(qty);
      user.funds += cost;
      if (holding.qty === 0) {
        await Holdings.deleteOne({ _id: holding._id });
      } else {
        await holding.save();
      }
    } else {
      return res.status(400).json({ error: "mode must be BUY or SELL" });
    }

    await user.save();
    const order = await Orders.create({ user: req.userId, name, qty, price, mode });
    res.status(201).json({ order, funds: user.funds });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------- FUNDS ----------
router.get("/funds", async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ funds: user.funds });
});

module.exports = router;
