"use client";

import Link from "next/link";
import { useActionState } from "react";

import { actions } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type FormState } from "@/validations/auth";

import { FormError } from "./form-error";

const styles = {
  section:
    "relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-zinc-950 px-6 py-10 text-zinc-50",

  background:
    "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.04),transparent_30%)]",

  form:
    "mx-auto flex w-full max-w-md flex-col gap-5",

  card:
    "border-zinc-800/80 bg-zinc-900/80 shadow-2xl backdrop-blur-sm",

  header:
    "space-y-2 text-center",

  title:
    "text-3xl font-semibold tracking-tight text-zinc-50",

  description:
    "text-zinc-400",

  content:
    "space-y-5",

  fieldGroup:
    "space-y-2.5",

  label:
    "text-zinc-200",

  input:
    "border-zinc-800 bg-zinc-950 text-zinc-50 placeholder:text-zinc-500",

  footer:
    "flex flex-col gap-3 pt-2",

  button:
    "w-full bg-zinc-800 hover:bg-zinc-700",

  serverError:
    "rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300",

  prompt:
    "text-center text-sm text-zinc-400",

  link:
    "ml-1 font-medium text-zinc-200 underline-offset-4 transition hover:text-white hover:underline",
};

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
  data: {
    username: "",
    password: "",
    email: "",
  },
};

export function SignupForm() {
  const [formState, formAction] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE
  );

  return (
    <section className={styles.section}>
      <div className={styles.background} />

      <form className={styles.form} action={formAction}>
        <Card className={styles.card}>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Create account</CardTitle>

            <CardDescription className={styles.description}>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label className={styles.label} htmlFor="username">
                Username
              </Label>
              <Input
                className={styles.input}
                id="username"
                name="username"
                type="text"
                placeholder="yourusername"
                defaultValue={formState.data?.username ?? ""}
              />
              <FormError error={formState.zodErrors?.username} />
            </div>

            <div className={styles.fieldGroup}>
              <Label className={styles.label} htmlFor="email">
                Email
              </Label>
              <Input
                className={styles.input}
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                defaultValue={formState.data?.email ?? ""}
              />
              <FormError error={formState.zodErrors?.email} />
            </div>

            <div className={styles.fieldGroup}>
              <Label className={styles.label} htmlFor="password">
                Password
              </Label>
              <Input
                className={styles.input}
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                defaultValue={formState.data?.password ?? ""}
              />
              <FormError error={formState.zodErrors?.password} />
            </div>
          </CardContent>

          <CardFooter className={styles.footer}>
            <Button className={styles.button} type="submit" size="lg">
              Sign up
            </Button>

            {formState.strapiErrors?.message ? (
              <p className={styles.serverError}>
                {formState.strapiErrors.message}
              </p>
            ) : null}
          </CardFooter>
        </Card>

        <p className={styles.prompt}>
          Already have an account?
          <Link className={styles.link} href="/sign-in">
            Sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
