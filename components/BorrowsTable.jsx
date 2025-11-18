"use client";

export default function BorrowsTable() {
  const borrows = [
    { id: 1, user: "radit", book: "Clean Code", date: "2024-01-01", status: "progress" },
    { id: 2, user: "natsu", book: "Atomic Habits", date: "2024-01-03", status: "pending" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Borrows</h1>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Book</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {borrows.map((b) => (
              <tr key={b.id}>
                <td className="p-3 border">{b.id}</td>
                <td className="p-3 border">{b.user}</td>
                <td className="p-3 border">{b.book}</td>
                <td className="p-3 border">{b.date}</td>
                <td className="p-3 border">{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
