const statusStyles = {
  BOOKED: "bg-sky-50 text-sky-700 ring-sky-200",
  ASSIGNED: "bg-amber-50 text-amber-700 ring-amber-200",
  SAMPLE_COLLECTED: "bg-violet-50 text-violet-700 ring-violet-200",
  REPORT_READY: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  COMPLETED: "bg-slate-100 text-slate-700 ring-slate-300",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
        statusStyles[status] || "bg-slate-100 text-slate-700 ring-slate-300"
      }`}
    >
      {status?.replaceAll("_", " ") || "UNKNOWN"}
    </span>
  );
}

export default StatusBadge;
