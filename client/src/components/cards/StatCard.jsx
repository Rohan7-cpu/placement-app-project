function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition">

      <div>
        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className={`${color} w-14 h-14 rounded-full`}></div>

    </div>
  );
}

export default StatCard;