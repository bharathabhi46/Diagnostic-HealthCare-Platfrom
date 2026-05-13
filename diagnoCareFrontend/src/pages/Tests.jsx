import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Alert from "../components/Alert";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/auth";
import { formatCurrency, getErrorMessage } from "../utils/api";

function Tests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTests = async () => {
      try {
        const res = await API.get("/tests");
        setTests(res.data);
      } catch (err) {
        setError(getErrorMessage(err, "Unable to load tests"));
      } finally {
        setLoading(false);
      }
    };

    loadTests();
  }, []);

  const addToCart = async (testId) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/tests" } } });
      return;
    }

    if (role !== "USER") {
      setError("Only USER accounts can add tests to cart.");
      return;
    }

    setError("");
    setNotice("");
    setSavingId(testId);

    try {
      await API.post("/cart/add", { testId });
      setNotice("Test added to cart.");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to add test to cart"));
    } finally {
      setSavingId("");
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Book diagnostics"
        title="Tests"
        description="Browse active diagnostic tests and add them to your cart."
      />

      <div className="mb-4 space-y-3">
        <Alert>{error}</Alert>
        <Alert type="success">{notice}</Alert>
      </div>

      {loading ? <LoadingState label="Loading tests" /> : null}

      {!loading && !tests.length ? (
        <EmptyState
          title="No tests available"
          message="Active tests will appear here when the backend returns them."
        />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {tests.map((test) => (
          <article
            key={test._id}
            className="flex flex-col rounded-md border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase text-emerald-700">
              {test.category || "Diagnostic"}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">
              {test.name}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
              {test.description || "No description provided."}
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-lg font-bold text-slate-950">
                {formatCurrency(test.price)}
              </p>
              <Button
                onClick={() => addToCart(test._id)}
                disabled={savingId === test._id}
              >
                {savingId === test._id ? "Adding..." : "Add to cart"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Tests;
