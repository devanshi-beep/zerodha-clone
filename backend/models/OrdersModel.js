const { Schema, model } = require("mongoose");

const OrdersSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: String,
    qty: Number,
    price: Number,
    mode: { type: String, enum: ["BUY", "SELL"] },
  },
  { timestamps: true }
);

module.exports = model("Orders", OrdersSchema);
