import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/tests", label: "Tests" },
    { to: "/articles", label: "Articles" },
  ];

  if (isAuthenticated && role === "USER") {
    navItems.push({ to: "/cart", label: "Cart" }, { to: "/orders", label: "Orders" });
  }

  if (isAuthenticated && role === "ADMIN") {
    navItems.push({ to: "/admin", label: "Admin" });
  }

  if (isAuthenticated && role === "COLLECTOR") {
    navItems.push({ to: "/collector", label: "Collector" });
  }

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link to="/" className="text-xl font-bold text-emerald-800">
          DiagnoCare
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <span className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                {role}
              </span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
