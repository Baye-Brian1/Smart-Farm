import type { ReactNode } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Leaf } from "lucide-react";
import { Btn, Card, Field } from "@/components/ui";
import { useStore } from "@/store";
import { sha256 } from "@/lib/hash";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
const registerSchema = loginSchema
  .extend({
    fullName: z.string().min(2, "Enter your name"),
    phone: z.string().optional(),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

function Shell({
  title,
  sub,
  children,
  footer,
}: {
  title: string;
  sub: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const session = useStore((s) => s.session);
  if (session) return <Navigate to="/app" replace />;
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4">
      <Card className="w-full max-w-md p-10">
        <div className="mb-4 text-2xl flex flex-col items-start  ">
          <div className="flex items-center gap-2">
            <Leaf size={24} className="text-green-800" />
            <p className="font-bold text-shadow-green-800">ClimateSmart </p>
          </div>
          <span className="ml-8 text-[18px] font-semibold text-green-800">Farm</span>
        </div>
        <h1 className="font-bold text-center text-2xl text-shadow-green-800">{title}</h1>
        <p className="mb-5 text-center text-[16px] text-neutral-500">{sub}</p>
        {children}
        <p className="mt-4 text-center text-[16px]">{footer}</p>
      </Card>
    </div>
  );
}
const FormError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p
      role="alert"
      className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700"
    >
      {msg}
    </p>
  ) : null;

export function Login() {
  const nav = useNavigate();
  const login = useStore((s) => s.login);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (v: LoginValues) => {
    const ok = login(v.email, await sha256(v.password));
    if (ok) nav("/app");
    else setError("root", { message: "Invalid email or password." });
  };
  return (
    <Shell
      title="Welcome back!"
      sub="Login to your account"
      footer={
        <>
          Don't have an account?{" "}
          <Link className="text-green-800 underline" to="/register">
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError msg={errors.root?.message} />
        <Field
          label="Email address"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Field
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Btn type="submit" className="w-full h-12 text-lg rounded-sm" loading={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Login"}
        </Btn>
      </form>
    </Shell>
  );
}

export function Register() {
  const nav = useNavigate();
  const signUp = useStore((s) => s.register);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) });
  const onSubmit = async (v: RegisterValues) => {
    const err = signUp(
      { name: v.fullName, email: v.email, phone: v.phone ?? "", location: "" },
      await sha256(v.password),
    );
    if (err) setError("root", { message: err });
    else nav("/app");
  };
  return (
    <Shell
      title="Create account"
      sub="Join thousands of smart farmers"
      footer={
        <>
          Already have an account?{" "}
          <Link className="text-green-800 underline font-semibold" to="/login">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormError msg={errors.root?.message} />
        <Field
          label="Full name"
          placeholder="Enter your full name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <Field
          label="Email address"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Field
          label="Phone number"
          placeholder="Enter your phone number"
          {...register("phone")}
        />
        <Field
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register("password")}
        />
        <Field
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirm?.message}
          {...register("confirm")}
        />
        <Btn type="submit" className="w-full h-12 mt-3 text-lg rounded-sm" loading={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Register"}
        </Btn>
      </form>
    </Shell>
  );
}
