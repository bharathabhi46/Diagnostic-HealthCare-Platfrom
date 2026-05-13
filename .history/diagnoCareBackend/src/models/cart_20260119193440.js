import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Test",
    required: true;
  },
});
const Cart = mongoose.model("cartSchema", cartSchema);
export default Cart;
