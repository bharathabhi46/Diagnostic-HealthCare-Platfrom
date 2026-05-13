import { useEffect, useState } from "react";
import API from "../api/axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import Field from "../components/Field";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { formatCurrency, formatDate, getErrorMessage } from "../utils/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/user/orders");
      setOrders(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load orders"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateFeedback = (orderId, field, value) => {
    setFeedback({
      ...feedback,
      [orderId]: {
        rating: 5,
        comment: "",
        ...feedback[orderId],
        [field]: value,
      },
    });
  };

  const submitFeedback = async (orderId) => {
    setSavingId(orderId);
    setError("");
    setNotice("");

    try {
      await API.post("/feedback", {
        orderId,
        rating: feedback[orderId]?.rating || 5,
        comment: feedback[orderId]?.comment || "",
      });
      setNotice("Feedback submitted.");
      setFeedback({ ...feedback, [orderId]: { rating: 5, comment: "" } });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to submit feedback"));
    } finally {
      setSavingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Patient"
        title="Orders"
        description="Track bookings, sample status, reports, and feedback."
      />

      <div className="mb-4 space-y-3">
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
      </div>

      {loading ? <LoadingState label="Loading orders" /> : null}

      {!loading && !orders.length ? (
        <EmptyState
          title="No orders yet"
          message="Booked diagnostic orders will appear here."
        />
      ) : null}

      <div className="space-y-4">
        {orders.map((order) => (
          <article
            key={order._id}
            className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Booked {formatDate(order.createdAt)}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Tests
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {order.tests?.map((test) => test.name).join(", ") ||
                    "No tests listed"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-sm font-bold text-slate-950">
                  {formatCurrency(order.totalAmount)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Report
                </p>
                {order.reportUrl ? (
                  <a
                    href={order.reportUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-sm font-semibold text-emerald-700"
                  >
                    Open report
                  </a>
                ) : (
                  <p className="mt-1 text-sm text-slate-600">Pending</p>
                )}
              </div>
            </div>

            {order.status === "COMPLETED" ? (
              <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 md:grid-cols-[140px_1fr_auto] md:items-end">
                <Field label="Rating">
                  <select
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    value={feedback[order._id]?.rating || 5}
                    onChange={(e) =>
                      updateFeedback(order._id, "rating", Number(e.target.value))
                    }
                  >
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Feedback">
                  <input
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    value={feedback[order._id]?.comment || ""}
                    onChange={(e) =>
                      updateFeedback(order._id, "comment", e.target.value)
                    }
                  />
                </Field>
                <Button
                  onClick={() => submitFeedback(order._id)}
                  disabled={savingId === order._id}
                >
                  {savingId === order._id ? "Submitting..." : "Submit"}
                </Button>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export default Orders;
