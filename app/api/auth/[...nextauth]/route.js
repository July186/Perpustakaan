import { getUserByEmail } from "@/lib/action"
import { compare } from "bcryptjs"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOption = {
    pages: {
        signIn: "/login"
    },
    providers: [
    CredentialsProvider({
    async authorize(credentials, req) {
        // 1. unboxing(membuka) data email dan password
        const email     = credentials.email
        const password  = credentials.password

        // 2. cari user berdasarkan email
        const user = await getUserByEmail(email)

        if (!user) return null

        // 3. mengcompare password
        const isValid = await compare(password, user.password)

        if (!isValid) return null

        // 4. return user ke session
        return {
            id: user.id,
            email: user.email,
            name: user.username
        }
        }
     })
    ],
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }