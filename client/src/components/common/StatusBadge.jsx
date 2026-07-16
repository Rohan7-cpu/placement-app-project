function StatusBadge({ status }) {
  const colors = {
    Active: "bg-green-500",
    Hiring: "bg-green-500",
    Closed: "bg-red-500",
    Pending: "bg-yellow-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm ${
        colors[status] || "bg-gray-500"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;