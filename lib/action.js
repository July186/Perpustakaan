"use server";

import bcrypt from "bcryptjs"
import pool from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import { writeFile } from "fs/promises";
import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password harus 6 karakter"),
    role: z.enum(["admin", "public"]).default("public"),
});

const booksSchema = z.object({
    title: z.string().min(1, "Judul harus diisi"),
    author: z.string().min(1, "Author harus diisi"),
    publisher: z.string().min(1, "publisher harus diisi"),
    year_published: z.string().regex(/^\d+$/, "Tahus harus 4  digit"),
    stock: z.number().int().nonnegative().default(0),
});

// ==================== USERS ====================

// Create user
export async function storeUser(formData) {
    const data = userSchema.parse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        role: formData.get("role") || "public",
    });

    const hashed = data.password
        ? bcrypt.hashSync(data.password, 10)
        : bcrypt.hashSync("password", 10)

    await pool.execute(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
        [data.username, data.email, hashed, data.role]
    )

    redirect("/dashboard")
}

// Get user by email
export async function getUserByEmail(email) {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM users WHERE email = ? LIMIT 1", 
            [email]
        );

        console.log("getUserByEmail result:", rows);

        if (rows && rows.length > 0) {
            return rows[0];
        }

        return null;

    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        return null;
    }
}

export async function updateUserProfile(formData) {
  const id = formData.get("id_users");
  const username = formData.get("username");

  await pool.execute(
    "UPDATE users SET username=? WHERE id_users=?",
    [username, id]
  );

  return true;
}

// Get all users
export async function getAllUsers() {
    const [rows] = await pool.execute(
        "SELECT * FROM users ORDER BY id_users DESC"
    )

    return rows;
}

// Update users
export async function updateUsersSideAdmin(formData) {
    const id = formData.get("id_users");

    const data = userSchema.partial().parse({
        username: formData.get("username"),
        email: formData.get("email"),
        role: formData.get("role"),
    });

    await pool.execute(
        "UPDATE users SET username = ?, email = ?, role = ? WHERE id_users = ?",
        [data.username, data.email, data.role, id]
    )
    
    revalidatePath("/dashboard");
    redirect("/dashboard");
}

// Delete user
export async function deleteUsers(id) {
    await pool.execute(
        "DELETE FROM users WHERE id_users = ?", 
        [id]
    );
    
    revalidatePath("/dashboard");
}

export async function updateProfilePhoto(formData) {
  const id = formData.get("id_users");
  const file = formData.get("image");

  if (!file || file.size === 0) {
    throw new Error("No file uploaded");
  }

  // convert file → buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // simpan ke folder public/uploads
  const filename = `${Date.now()}-${file.name}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await writeFile(path.join(uploadDir, filename), buffer);

  const imagePath = `/uploads/${filename}`;

  // update database
  await pool.execute(
    "UPDATE users SET image=? WHERE id_users=?",
    [imagePath, id]
  );

  // return path untuk update session
  return imagePath;
}


// ==================== BOOKS ====================

// Create book
export async function storeBooks(formData) {
    const title = formData.get("title");
    const sinopsis = formData.get("sinopsis")
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year_published = parseInt(formData.get("year_published"));
    const stock = parseInt(formData.get("stock"));

    const file = formData.get("image");
    let imagePath = null;

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await writeFile(path.join(uploadDir, filename), buffer);
        imagePath = `/uploads/${filename}`;
    }

    await pool.execute(
        "INSERT INTO books (title,sinopsis, author, publisher, year_published, stock, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title,sinopsis, author, publisher, year_published, stock, imagePath]
    );
    
    redirect("/dashboard")
}

// Get all books
export async function getAllBooks() {
    const [rows] = await pool.execute(
        "SELECT * FROM books ORDER BY id_books DESC"
    )

    return rows;
}

// Delete book
export async function deleteBooks(id) {
    await pool.execute(
        "DELETE FROM books WHERE id_books = ?",
        [id]
    );
         
    revalidatePath("/dashboard");
}

// Update book
export async function updateBooks(formData) {
    const title = formData.get("title");
    const sinopsis = formData.get("sinopsis");
    const author = formData.get("author");
    const publisher = formData.get("publisher");
    const year_published = formData.get("year_published")
    const stock = formData.get("stock");
    const id = formData.get("id_books");

    const file = formData.get("image");
    let imagePath = formData.get("currentImage") || null;

    if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await writeFile(path.join(uploadDir, filename), buffer);
        imagePath = `/uploads/${filename}`;
    }

    await pool.execute(
        "UPDATE books SET title = ?, sinopsis= ?, author = ?, publisher = ?, year_published = ?, stock = ?, image = ? WHERE id_books = ?",
        [title, sinopsis, author, publisher, year_published, stock, imagePath, id]
    );

    redirect("/dashboard")
}

export async function getBookById(id) {
    const [rows] = await pool.execute(
        "SELECT * FROM books WHERE id_books = ?",
        [id]
    );
    return rows[0] || null;
}

// ==================== BORROWS ====================

export async function getAllBorrows() {
    const [rows] = await pool.execute(`
        SELECT 
            b.id_borrows,
            b.borrow_date,
            b.return_date,
            b.status,
            u.id_users,
            u.username,
            u.email,
            bk.id_books,
            bk.title as book_title,
            bk.author
        FROM borrows b
        JOIN users u ON b.id_users = u.id_users
        JOIN books bk ON b.id_books = bk.id_books
        ORDER BY b.id_borrows DESC
    `);
    return rows;
}

export async function getBorrowsByUserId(userId) {
    const [rows] = await pool.execute(`
        SELECT 
            b.id_borrows,
            b.borrow_date,
            b.return_date,
            b.status,
            bk.id_books,
            bk.title as book_title,
            bk.author,
            bk.publisher,
            bk.image
        FROM borrows b
        JOIN books bk ON b.id_books = bk.id_books
        WHERE b.id_users = ?
        ORDER BY b.id_borrows DESC
    `, [userId]);
    return rows;
}

export async function storeBorrow(formData) {
    const id_users = formData.get("id_users");
    const id_books = formData.get("id_books");
    const borrow_date = formData.get("borrow_date");
    const return_date = formData.get("return_date");

    await pool.execute(
        "INSERT INTO borrows (id_users, id_books, borrow_date, return_date, status) VALUES (?, ?, ?, ?, 'pending')",
        [id_users, id_books, borrow_date, return_date]
    );
    
    revalidatePath("/dashboard");
}

export async function updateBorrowStatus(id, status) {
    await pool.execute(
        "UPDATE borrows SET status = ? WHERE id_borrows = ?",
        [status, id]
    );
    revalidatePath("/dashboard");
}

export async function deleteBorrow(id) {
    await pool.execute("DELETE FROM borrows WHERE id_borrows = ?", [id]);
    revalidatePath("/dashboard");
}