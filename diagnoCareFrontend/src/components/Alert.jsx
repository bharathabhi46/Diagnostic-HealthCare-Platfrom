function Alert({ type = "error", children }) {
  const styles =
    type === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : "border-rose-200 bg-rose-50 text-rose-800";

  if (!children) {
    return null;
  }

  return (
    <div className={`rounded-md border px-4 py-3 text-sm ${styles}`}>
      {children}
    </div>
  );
}

export default Alert;
