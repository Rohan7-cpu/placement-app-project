function DataTable({ columns, children }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            {columns.map((col) => (
              <th
                key={col}
                className="text-left p-4"
              >
                {col}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>{children}</tbody>

      </table>

    </div>
  );
}

export default DataTable;