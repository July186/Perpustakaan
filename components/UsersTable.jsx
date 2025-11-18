"use client";

import { useState } from "react";
import { storeUser } from "@/lib/action";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { DataTable } from "./data-table";
import { email } from "zod";

export default function UsersTable() {
    const [form, serForm ] = useState({
        usernmae: "",
        email: "",
        password: "",
        role: "public"
    });
    // dummy data user (sementara)
    const users = [
        { id: 1, username: "admin", email: "admin@mail.com", role: "admin" },
        { id: 2, username: "radit", email: "radit@mail.com", role: "public" }
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        serForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit() {
        await storeUser(form);   // kirim ke MySQL lewat stored procedure
        setShowPopup(false);
        window.location.reload(); // refresh agar tabel update
    }

  const [showPopup, setShowPopup] = useState(false)

  return (
    <div>
        <div className="flex-row items-center flex justify-between gap-4 mb-4">
            <h1 className="text-xl font-bold">Users</h1>
            <Button onClick={() => setShowPopup(true)} className="justify-end flex">add users</Button>
        </div>

      <div>
        <DataTable data={users} />
      </div>

      {showPopup && (
        <form action={storeUser}>
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-20">
                    <div className="bg-white p-6 h-[75%] w-[25%] m-10 rounded-md  shadow-lg relative z-30">
                        <div className="flex-row flex justify-between mb-4">
                            <h2 className="text-lg font-semibold">add users</h2>
                            <button onClick={() => setShowPopup(false)} type="submit" className="font-bold rounded-full w-6 h-6 hover:bg-[#EBEAE7] justify-center items-center flex">×</button>
                        </div>
                        <Field>
                            <FieldLabel>Username</FieldLabel>
                            <Input type="text" name="username" placeholder="Enter username" value={form.username} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel>Email</FieldLabel>
                            <Input type="email" name="email" placeholder="Enter email" value={form.email} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel >Password</FieldLabel>
                            <Input type="password" name="password" placeholder="Enter password" value={form.password} onChange={handleChange} required />
                        </Field>
                        <Field className="mt-2">
                            <FieldLabel>Role</FieldLabel>
                            <select name="role" value={form.role} onChange={handleChange}>
                                <option value="public">Public</option>
                                <option value="admin">Admin</option>
                            </select>
                        </Field>
                        <Field className="mt-8">
                            <Button type="submit" className="font-semibold">Submit</Button>
                        </Field>
                    </div>
              </div>
        </form>
                )}
    </div>
  );
}
