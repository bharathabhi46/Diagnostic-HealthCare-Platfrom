function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-700",
    secondary:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600",
  };

  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
