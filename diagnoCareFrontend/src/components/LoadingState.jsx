function LoadingState({ label = "Loading" }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
      {label}...
    </div>
  );
}

export default LoadingState;
