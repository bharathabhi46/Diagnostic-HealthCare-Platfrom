import mongoose from "mongoose";
const cartItemSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
});
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    items: [cartItemSchema],
  },
  {
    timestamps:true
  }

});
const Cart = mongoose.model("cartSchema", cartSchema);
export default Cart;
