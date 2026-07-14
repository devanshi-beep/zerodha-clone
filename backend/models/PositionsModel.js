const { Schema, model } = require("mongoose");

const PositionsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: String,
  name: String,
  qty: Number,
  avg: Number,
  price: Number,
  net: String,
  day: String,
  isLoss: Boolean,
});

module.exports = model("Positions", PositionsSchema);
