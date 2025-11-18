export default function Books() {
  // Data contoh (bisa diganti API nanti)
  const books = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: 1980 },
    { id: 3, title: "Negeri 5 Menara", author: "Ahmad Fuadi", year: 2009 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">📚 Daftar Buku</h1>
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-3 border-b">#</th>
            <th className="text-left p-3 border-b">Judul Buku</th>
            <th className="text-left p-3 border-b">Penulis</th>
            <th className="text-left p-3 border-b">Tahun</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{book.id}</td>
              <td className="p-3 border-b">{book.title}</td>
              <td className="p-3 border-b">{book.author}</td>
              <td className="p-3 border-b">{book.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
