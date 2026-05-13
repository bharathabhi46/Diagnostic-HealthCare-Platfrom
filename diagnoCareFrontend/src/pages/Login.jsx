import { useState } from "react";
import API from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import { useAuth } from "../context/auth";
import { getErrorMessage } from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      const fallbackPath =
        res.data.role === "ADMIN"
          ? "/admin"
          : res.data.role === "COLLECTOR"
            ? "/collector"
            : "/tests";
      navigate(location.state?.from?.pathname || fallbackPath, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to sign in"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <PageHeader
        title="Sign in"
        description="Access bookings, reports, and role-specific work queues."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-md border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Alert>{error}</Alert>

        <Field label="Email">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Field>

        <Field label="Password">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </Field>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          New to DiagnoCare?{" "}
          <Link to="/register" className="font-semibold text-emerald-700">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
