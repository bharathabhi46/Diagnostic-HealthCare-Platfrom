import Cart from "../models/cart.js";
import Test from "../models/test.js";
export const addCart = async (req, res) => {
  try {
    const { testId } = req.body;
    const userId = req.user.id;
    const testExists = await Test.findById(testId);
    if (!testExists) {
      return res.status(404).json({ message: "Test not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ test: testId }],
      });
    } else {
      cart.items.push({ test: testId });
      await cart.save();
    }

    res.json({ message: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export async function getCart(req, res) {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.test",
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
export async function removeItem(req, res) {
  try {
    const ItemId = req.params.itemId;
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter((item) => {
      return item._id.toString() !== ItemId;
    });
    await cart.save();
    res.json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
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
    res.status(500).json({ message: "Server Error", error });
  }
}
