export function getErrorMessage(error, fallback = "Something went wrong") {
  if (error.code === "ERR_NETWORK") {
    return "Unable to reach the backend API. Start the backend server and check the API URL.";
  }

  return error.response?.data?.message || error.response?.data?.error || fallback;
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
