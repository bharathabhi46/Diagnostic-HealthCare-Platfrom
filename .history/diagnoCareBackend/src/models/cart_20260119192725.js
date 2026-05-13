import mongoose from "mongoose";
const cartSchema = mongoose.Schema({});
const Cart = mongoose.model("cartSchema", cartSchema);
export default Cart;
