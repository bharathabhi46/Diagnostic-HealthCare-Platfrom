import Cart from "../models/Cart.js";
import Test from "../models/test.js";
export async function addCart(req, res) {
  try {
    const { testId } = req.body;
    const userId = req.user.id;
    const testExists = Test.findById(testId);
    if (!testExists) {
      res.status(404).json({ message: "Test does not exists" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = cart.create({
        user: userId,
        items: [{ test: testId }],
      });
    } else {
      cart.items.push({ test: testId });
      await cart.save();
    }
    res.json({ message: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}
export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.test",
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
export async function removeItem(req, res) {
  try {
    const ItemId = req.body;
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items = cart.items.filter((item) => {
      item.id.toString() !== ItemId;
    });
    await cart.save();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
export async function clearCart(req, res) {
  try {
    await Cart.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { items: [] },
    );
    res.json({ message: "Carts is Cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
