"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getBookById } from "@/lib/action";
import { AppSidebar_public } from "@/components/app-sidebar-public";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, BookOpen, User, Building, Calendar, 
  Package, Clock
} from "lucide-react";
import Link from "next/link";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    async function fetchBook() {
      try {
        const data = await getBookById(params.id);
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchBook();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Not Found</h2>
          <p className="text-gray-600 mb-6">The book you're looking for doesn't exist or may have been removed.</p>
          <Link href="/home">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar_public user={session?.user} />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b h-16 flex items-center justify-between px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <Link href="/home">
              <Button variant="ghost" size="sm" className="group hover:bg-emerald-50 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Library
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Viewing:</span>
            <span className="text-sm font-medium text-emerald-700 truncate max-w-xs">{book.title}</span>
          </div>
        </header>

        <main className="p-6 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* Book Detail Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="grid md:grid-cols-3 gap-8 p-6">
                {/* Book Cover - Smaller Size */}
                <div className="md:col-span-1">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 group">
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse bg-gray-300 w-full h-full"></div>
                      </div>
                    )}
                    <img 
                      src={book.image || "/book-placeholder.jpg"} 
                      alt={book.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                </div>

                {/* Book Information */}
                <div className="md:col-span-2 flex flex-col">
                  {/* Title & Author */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                      {book.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <span className="font-medium">{book.author}</span>
                    </div>
                  </div>

                  {/* Details Grid - Simplified */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Published</p>
                          <p className="text-sm font-semibold text-blue-900">{book.year_published}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600 font-medium">Stock</p>
                          <p className="text-sm font-semibold text-green-900">{book.stock} Books</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="mb-6">
                    <h3 className="text-md font-bold text-gray-900 mb-2">Sinopsis</h3>
                    <p className="text-gray-600 leading-relaxed text-sm text-justify">
                      {book.sinopsis}
                    </p>
                  </div>

                  {/* Book Details - Simplified */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-md font-bold text-gray-900 mb-3">Book Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Author</span>
                        <span className="text-gray-900 font-medium">{book.author}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Publisher</span>
                        <span className="text-gray-900 font-medium">{book.publisher}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Year Published</span>
                        <span className="text-gray-900 font-medium">{book.year_published}</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span className="text-gray-600">Availability</span>
                        <span className={`font-medium ${book.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {book.stock > 0 ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Borrow Button */}
                  <div className="mt-auto">
                    <Button 
                      disabled={book.stock === 0}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3"
                    >
                      {book.stock > 0 ? (
                        <>
                          <Clock className="h-4 w-4 mr-2" />
                          Request to Borrow
                        </>
                      ) : (
                        'Currently Unavailable'
                      )}
                    </Button>
                    {book.stock === 0 && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        This book is currently not available. Please check back later.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}