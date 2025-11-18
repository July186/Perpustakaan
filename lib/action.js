"use server";

import bcrypt from "bcryptjs"
import connection from "./db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { z } from "zod";

const loginschema = z.object({
    email: z.string().string.email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
})

export async function storeUser(formData) {
    const username  = formData.get("username");
    const email     = formData.get("email");
    const password  = await bcrypt.hashSync(formData.get("password"));
    const role     = formData.get("role") || "public";

    await connection.execute(
        "CALL insertUsers(?, ?, ?, ?)",
        [username, email, password, role]
    )

    redirect("/")
}

export async function getUserByEmail(email) {
    const [user] = await connection.execute(
        "CALL getUsersByEmail(?)", [email]
    )

    if (!user.length) return null

    return user[0];
}