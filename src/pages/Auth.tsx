import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Leaf } from "lucide-react";
import { Btn, Card, Field } from "@/components/ui";

const loginSchema = z.object({ email: z.email("Enter a valid email"), password: z.string().min(6, "At least 6 characters") });
const registerSchema = loginSchema.extend({ fullName: z.string().min(2, "Enter your name"), phone: z.string().optional(), confirm: z.string() })
  .refine((d) => d.password === d.confirm, { message: "Passwords don't match", path: ["confirm"] });
type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function Shell({ title, sub, children, footer }: { title: string; sub: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-4 flex items-center justify-center gap-1 font-bold text-green-800"><Leaf size={18} />ClimateSmart Farm</div>
        <h1 className="text-center text-xl font-semibold">{title}</h1>
        <p className="mb-5 text-center text-sm text-neutral-500">{sub}</p>
        {children}
        <p className="mt-4 text-center text-sm">{footer}</p>
      </Card>
    </div>
  );
}

export function Login() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  return (
    <Shell title="Welcome back!" sub="Login to your account" footer={<>Don't have an account? <Link className="text-green-800 underline" to="/register">Register</Link></>}>
      <form onSubmit={handleSubmit(() => nav("/app"))}>
        <Field label="Email address" placeholder="Enter your email" error={errors.email?.message} {...register("email")} />
        <Field label="Password" type="password" placeholder="Enter your password" error={errors.password?.message} {...register("password")} />
        <Btn type="submit" className="w-full">Login</Btn>
      </form>
    </Shell>
  );
}

export function Register() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });
  return (
    <Shell title="Create account" sub="Join thousands of smart farmers" footer={<>Already have an account? <Link className="text-green-800 underline" to="/login">Login</Link></>}>
      <form onSubmit={handleSubmit(() => nav("/app"))}>
        <Field label="Full name" placeholder="Enter your full name" error={errors.fullName?.message} {...register("fullName")} />
        <Field label="Email address" placeholder="Enter your email" error={errors.email?.message} {...register("email")} />
        <Field label="Phone number" placeholder="Enter your phone number" {...register("phone")} />
        <Field label="Password" type="password" placeholder="Create a password" error={errors.password?.message} {...register("password")} />
        <Field label="Confirm password" type="password" placeholder="Confirm your password" error={errors.confirm?.message} {...register("confirm")} />
        <Btn type="submit" className="w-full">Register</Btn>
      </form>
    </Shell>
  );
}
