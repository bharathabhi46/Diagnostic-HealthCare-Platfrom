import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({});
const Cart = mongoose.model("cartSchema", cartSchema);
export default Cart;
