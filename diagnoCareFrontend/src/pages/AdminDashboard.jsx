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

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [collectors, setCollectors] = useState([]);
  const [assignments, setAssignments] = useState({});
  const [reports, setReports] = useState({});
  const [articleForm, setArticleForm] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const [ordersRes, collectorsRes] = await Promise.all([
        API.get("/admin/orders"),
        API.get("/admin/collectors"),
      ]);
      setOrders(ordersRes.data);
      setCollectors(collectorsRes.data);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to load admin dashboard"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const assignCollector = async (orderId) => {
    const collectorId = assignments[orderId];

    if (!collectorId) {
      setError("Select a collector before assigning.");
      return;
    }

    setSaving(`assign-${orderId}`);
    setError("");
    setNotice("");

    try {
      await API.post("/admin/assign", { orderId, collectorId });
      await loadDashboard();
      setNotice("Collector assigned.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to assign collector"));
    } finally {
      setSaving("");
    }
  };

  const uploadReport = async (orderId) => {
    const reportUrl = reports[orderId];

    if (!reportUrl) {
      setError("Enter a report URL before uploading.");
      return;
    }

    setSaving(`report-${orderId}`);
    setError("");
    setNotice("");

    try {
      await API.post("/admin/upload-report", { orderId, reportUrl });
      await loadDashboard();
      setNotice("Report uploaded.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to upload report"));
    } finally {
      setSaving("");
    }
  };

  const addArticle = async (e) => {
    e.preventDefault();
    setSaving("article");
    setError("");
    setNotice("");

    try {
      await API.post("/articles", articleForm);
      setArticleForm({ title: "", category: "", content: "" });
      setNotice("Article published.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to publish article"));
    } finally {
      setSaving("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Dashboard"
        description="Review orders, assign collectors, upload reports, and publish articles."
      />

      <div className="mb-4 space-y-3">
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
      </div>

      {loading ? <LoadingState label="Loading admin dashboard" /> : null}

      {!loading ? (
        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">
              All orders
            </h2>

            {!orders.length ? (
              <EmptyState title="No orders found" />
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <article
                    key={order._id}
                    className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-950">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                          {order.user?.name || "Unknown user"} -{" "}
                          {order.user?.email || "No email"} -{" "}
                          {formatDate(order.createdAt)}
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
                          Collector
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          {order.collector?.name || "Unassigned"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 border-t border-slate-200 pt-5 lg:grid-cols-[1fr_auto_1fr_auto] lg:items-end">
                      <Field label="Assign collector">
                        <select
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                          value={assignments[order._id] || ""}
                          onChange={(e) =>
                            setAssignments({
                              ...assignments,
                              [order._id]: e.target.value,
                            })
                          }
                        >
                          <option value="">Select collector</option>
                          {collectors.map((collector) => (
                            <option key={collector._id} value={collector._id}>
                              {collector.name} ({collector.email})
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Button
                        onClick={() => assignCollector(order._id)}
                        disabled={saving === `assign-${order._id}`}
                      >
                        Assign
                      </Button>

                      <Field label="Report URL">
                        <input
                          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                          value={reports[order._id] || order.reportUrl || ""}
                          onChange={(e) =>
                            setReports({ ...reports, [order._id]: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </Field>
                      <Button
                        variant="secondary"
                        onClick={() => uploadReport(order._id)}
                        disabled={saving === `report-${order._id}`}
                      >
                        Upload
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Add article</h2>
            <form onSubmit={addArticle} className="mt-4 space-y-4">
              <Field label="Title">
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  value={articleForm.title}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, title: e.target.value })
                  }
                  required
                />
              </Field>
              <Field label="Category">
                <input
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  value={articleForm.category}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, category: e.target.value })
                  }
                />
              </Field>
              <Field label="Content">
                <textarea
                  className="min-h-36 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  value={articleForm.content}
                  onChange={(e) =>
                    setArticleForm({ ...articleForm, content: e.target.value })
                  }
                  required
                />
              </Field>
              <Button type="submit" disabled={saving === "article"} className="w-full">
                {saving === "article" ? "Publishing..." : "Publish article"}
              </Button>
            </form>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

export default AdminDashboard;
