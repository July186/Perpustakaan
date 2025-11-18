"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { DataTable } from "./data-table";

export default function BooksPanel() {
  // Contoh data (nanti bisa kamu ganti API)
  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", stock: 10 },
    { id: 2, title: "Clean Code", author: "Robert C. Martin", stock: 4 },
    { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 4, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 5, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 6, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 7, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 8, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 9, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 10, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
    { id: 11, title: "The Pragmatic Programmer", author: "Andrew Hunt", stock: 7 },
  ];

  // const bookSchema = z.object({
  //   title: z.string().min(1, "Title is required"),
  //   author: z.string().min(1, "Author is required"),
  //   publisher: z.string().min(1, "Publisher is required"),
  //   stock: z.number().int().positive().or(
  //     z.string().regex(/^\d+$/, "Stock must be a number")
  //   ),
  //   image: z.string().min(1, "Image is required")
  // }); 
  
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    stock: "",
    image: ""
  });
  
  const [showPopup, setShowPopup] = useState(false)
  
  function handleChange(e) {
    setForm({
    ...form,
    [e.target.name]: e.target.value
    });
  }

  return (
    <div>
        <div className="flex-row items-center flex justify-between gap-4 mb-4">
            <h1 className="text-xl font-bold">Books</h1>
            <Button onClick={() => setShowPopup(true)} className="justify-end flex">add book</Button>
        </div>

      <div>
        <DataTable data={books} />
      </div>

      {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
                    <div className="bg-white p-6 h-[75%] w-[25%] m-10 rounded-md  shadow-lg relative z-30">
                        <div className="flex-row flex justify-between mb-4">
                            <h2 className="text-lg font-semibold">add books</h2>
                            <button onClick={() => setShowPopup(false)} type="submit" className="font-bold rounded-full w-6 h-6 hover:bg-[#EBEAE7] justify-center items-center flex">×</button>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="email">Title</FieldLabel>
                            <Input id="title" type="text" name="title" className="" placeholder="Enter book title" value={form.title} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel htmlFor="email">Author</FieldLabel>
                            <Input id="email" type="text" name="author" placeholder="Enter book author" value={form.author} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel htmlFor="email">Publisher</FieldLabel>
                            <Input id="email" type="text" name="publisher" placeholder="Enter book publisher" value={form.publisher} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel htmlFor="email">Stock</FieldLabel>
                            <Input id="email" type="number" name="email" placeholder="Enter book stock" value={form.stock} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel htmlFor="email">Image</FieldLabel>
                            <Input id="email" type="int" name="image" placeholder="Image" value={form.image} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-8">
                            <Button onClick={handleSubmit}  type="submit" className="font-semibold">Submit</Button>
                        </Field>
                    </div>
              </div>
                )}
    </div>
  );
}
