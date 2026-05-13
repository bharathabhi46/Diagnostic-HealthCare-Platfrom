import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { formatCurrency, getErrorMessage } from "../utils/api";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const total = useMemo(
    () => cart.items.reduce((sum, item) => sum + Number(item.test?.price || 0), 0),
    [cart.items],
  );

  const loadCart = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cart");
      setCart(res.data || { items: [] });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load cart"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const removeItem = async (itemId) => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      await API.delete(`/cart/${itemId}`);
      await loadCart();
      setNotice("Item removed.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to remove item"));
    } finally {
      setSaving(false);
    }
  };

  const clearCart = async () => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      await API.delete("/cart/clear");
      await loadCart();
      setNotice("Cart cleared.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to clear cart"));
    } finally {
      setSaving(false);
    }
  };

  const bookOrder = async () => {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      await API.post("/orders/book");
      await loadCart();
      setNotice("Order booked successfully.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to book order"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Checkout"
        title="Cart"
        description="Review selected tests before booking a diagnostic order."
        actions={
          cart.items.length ? (
            <Button variant="secondary" onClick={clearCart} disabled={saving}>
              Clear cart
            </Button>
          ) : null
        }
      />

      <div className="mb-4 space-y-3">
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
      </div>

      {loading ? <LoadingState label="Loading cart" /> : null}

      {!loading && !cart.items.length ? (
        <EmptyState
          title="Your cart is empty"
          message="Add diagnostic tests from the tests page to book an order."
        />
      ) : null}

      {!loading && cart.items.length ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">
                    {item.test?.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.test?.category || "Diagnostic"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-slate-950">
                    {formatCurrency(item.test?.price)}
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => removeItem(item._id)}
                    disabled={saving}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Summary</h2>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-sm text-slate-600">Total</span>
              <span className="text-xl font-bold text-slate-950">
                {formatCurrency(total)}
              </span>
            </div>
            <Button onClick={bookOrder} disabled={saving} className="mt-5 w-full">
              {saving ? "Processing..." : "Book order"}
            </Button>
            <Link
              to="/orders"
              className="mt-3 block text-center text-sm font-semibold text-emerald-700"
            >
              View orders
            </Link>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
