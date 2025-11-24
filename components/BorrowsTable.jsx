"use client";

import { useState, useTransition, useEffect } from "react";
import { getAllBorrows, storeBorrow, updateBorrowStatus, deleteBorrow, getAllUsers, getAllBooks } from "@/lib/action";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { 
  X, Plus, Clock, User, BookOpen, Calendar, 
  Search, AlertCircle, Trash2, CheckCircle, XCircle, Loader
} from "lucide-react";

export default function BorrowsTable() {
  const [showPopup, setShowPopup] = useState(false);
  const [borrows, setBorrows] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    startTransition(async () => {
      const [borrowsData, usersData, booksData] = await Promise.all([
        getAllBorrows(),
        getAllUsers(),
        getAllBooks()
      ]);
      setBorrows(borrowsData);
      setUsers(usersData);
      setBooks(booksData);
    });
  }, []);

  async function handleDeleteBorrow(id) {
    if (confirm("Are you sure you want to delete this borrow record?")) {
      await deleteBorrow(id);
      setBorrows(await getAllBorrows());
    }
  }

  async function handleStatusChange(id, newStatus) {
    await updateBorrowStatus(id, newStatus);
    setBorrows(await getAllBorrows());
  }

  // Filter borrows
  const filteredBorrows = borrows.filter(borrow => 
    borrow.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrow.book_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    borrow.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'from-yellow-500 to-yellow-600';
      case 'progress': return 'from-blue-500 to-blue-600';
      case 'closed': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'progress': return 'In Progress';
      case 'closed': return 'Returned';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
              <Clock className="h-6 w-6 text-white" />
            </div>
            Borrowings Management
          </h1>
          <p className="text-gray-500 mt-1 ml-14">Track and manage book borrowings</p>
        </div>
        <Button 
          onClick={() => setShowPopup(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg shadow-orange-500/30 transition-all duration-200"
        >
          <Plus className="h-5 w-5" />
          New Borrow
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by student, book or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 mt-1">
                {borrows.filter(b => b.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-900 mt-1">
                {borrows.filter(b => b.status === 'progress').length}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <Loader className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Returned</p>
              <p className="text-3xl font-bold text-green-900 mt-1">
                {borrows.filter(b => b.status === 'closed').length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Book
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Borrow Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Return Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBorrows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 font-medium">No borrow records found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredBorrows.map((borrow) => (
                  <tr key={borrow.id_borrows} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-white font-semibold text-sm">
                            {borrow.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{borrow.username}</p>
                          <p className="text-xs text-gray-500">{borrow.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{borrow.book_title}</p>
                          <p className="text-xs text-gray-500">{borrow.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {new Date(borrow.borrow_date).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {borrow.return_date ? new Date(borrow.return_date).toLocaleDateString() : '-'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select
                        value={borrow.status}
                        onChange={(e) => handleStatusChange(borrow.id_borrows, e.target.value)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getStatusColor(borrow.status)} border-0 cursor-pointer shadow-sm`}
                      >
                        <option value="pending">Pending</option>
                        <option value="progress">In Progress</option>
                        <option value="closed">Returned</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Button 
                          onClick={() => handleDeleteBorrow(borrow.id_borrows)} 
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1.5 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 transition-all"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Borrow Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-orange-600 to-red-600 p-6">
              <button 
                onClick={() => setShowPopup(false)} 
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">New Borrowing</h2>
                  <p className="text-orange-100 text-sm mt-0.5">Record a new book loan</p>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <form action={async (formData) => {
              await storeBorrow(formData);
              setBorrows(await getAllBorrows());
              setShowPopup(false);
            }}>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="space-y-5">
                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-orange-600" />
                      Student
                    </FieldLabel>
                    <select 
                      name="id_users" 
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-sm"
                      required
                    >
                      <option value="">Select a student</option>
                      {users.filter(u => u.role === 'public').map(user => (
                        <option key={user.id_users} value={user.id_users}>
                          {user.username} ({user.email})
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-600" />
                      Book
                    </FieldLabel>
                    <select 
                      name="id_books" 
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white text-sm"
                      required
                    >
                      <option value="">Select a book</option>
                      {books.filter(b => b.stock > 0).map(book => (
                        <option key={book.id_books} value={book.id_books}>
                          {book.title} - {book.author} (Stock: {book.stock})
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      Borrow Date
                    </FieldLabel>
                    <input 
                      type="date" 
                      name="borrow_date" 
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm" 
                      required 
                    />
                  </Field>

                  <Field>
                    <FieldLabel className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-600" />
                      Expected Return Date
                    </FieldLabel>
                    <input 
                      type="date" 
                      name="return_date" 
                      className="w-full p-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm" 
                    />
                  </Field>
                </div>
              </div>
              
              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowPopup(false)}
                  className="px-6 border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-6 shadow-lg shadow-orange-500/30"
                >
                  Create Borrow
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}