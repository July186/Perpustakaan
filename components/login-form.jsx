"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { redirect } from "next/dist/server/api-utils"
import { signIn } from "next-auth/react"

export function LoginForm({
  className,
  ...props
}) {
  function handleLogin(formData) {
    const respone = signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password")
    })

    if (!respone.ok){
      alert("fail")
      return null
    }

    redirect("/home")
  } 

  return (
    <form action={handleLogin} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Welcome back!  Enter your email/username and password bellow to sign in.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" name="email" placeholder="Enter your email" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" placeholder="Enter your password" required />
        </Field>
        <Field>
          <Button type="submit" className="font-semibold">Login</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
