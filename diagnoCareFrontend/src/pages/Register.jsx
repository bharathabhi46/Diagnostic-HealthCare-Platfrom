import { useState } from "react";
import API from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import { getErrorMessage } from "../utils/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
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
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(getErrorMessage(err, "Unable to create account"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <PageHeader
        title="Create account"
        description="Register as a patient, administrator, or sample collector."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-md border border-slate-200 bg-white p-6 shadow-sm"
      >
        <Alert>{error}</Alert>

        <Field label="Full name">
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </Field>

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
            minLength={6}
            required
          />
        </Field>

        <Field label="Role">
          <select
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="COLLECTOR">COLLECTOR</option>
          </select>
        </Field>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create account"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-emerald-700">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Register;
