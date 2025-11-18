export default function Users() {
  const users = [
    { id: 1, name: "Radit", email: "radit@example.com", role: "Admin" },
    { id: 2, name: "Natsuka", email: "natsuka@example.com", role: "User" },
    { id: 3, name: "Alya", email: "alya@example.com", role: "User" },
    { id: 4, name: "Rafi", email: "rafi@example.com", role: "User" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">👥 Daftar Pengguna</h1>
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">#</th>
            <th className="text-left p-3 border-b">Nama</th>
            <th className="text-left p-3 border-b">Email</th>
            <th className="text-left p-3 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{user.id}</td>
              <td className="p-3 border-b">{user.name}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">
                <span
                  className={`px-2 py-1 rounded-md text-sm ${
                    user.role === "Admin"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
