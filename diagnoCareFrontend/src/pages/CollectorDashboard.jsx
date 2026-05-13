import { useEffect, useState } from "react";
import API from "../api/axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import { formatCurrency, formatDate, getErrorMessage } from "../utils/api";

function CollectorDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/collector/orders");
      setOrders(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load assigned orders"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const markCollected = async (orderId) => {
    setSavingId(orderId);
    setError("");
    setNotice("");

    try {
      await API.put("/collector/status", { orderId });
      await loadOrders();
      setNotice("Sample marked as collected.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to update sample status"));
    } finally {
      setSavingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Collector"
        title="Assigned orders"
        description="View assigned diagnostic pickups and update sample collection status."
      />

      <div className="mb-4 space-y-3">
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
      </div>

      {loading ? <LoadingState label="Loading assigned orders" /> : null}

      {!loading && !orders.length ? (
        <EmptyState
          title="No assigned orders"
          message="Admin-assigned orders will appear here."
        />
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
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
                  {order.user?.name || "Unknown user"} -{" "}
                  {order.user?.email || "No email"}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                  Booked
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(order.createdAt)}
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
            </div>

            <Button
              className="mt-5 w-full"
              onClick={() => markCollected(order._id)}
              disabled={
                savingId === order._id ||
                order.status === "SAMPLE_COLLECTED" ||
                order.status === "REPORT_READY" ||
                order.status === "COMPLETED"
              }
            >
              {savingId === order._id ? "Updating..." : "Mark sample collected"}
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export default CollectorDashboard;
