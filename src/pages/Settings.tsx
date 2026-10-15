import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/store";
import { Btn, Card, Field, Title } from "@/components/ui";

const schema = z.object({ name: z.string().min(2, "Enter your name"), email: z.string(), phone: z.string().optional(), location: z.string().optional() });
type V = z.infer<typeof schema>;

export default function Settings() {
  const session = useStore((s) => s.session)!;
  const update = useStore((s) => s.updateProfile);
  const [saved, setSaved] = useState(false);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<V>({ resolver: zodResolver(schema), defaultValues: session });
  const onSubmit = (v: V) => {
    update({ name: v.name, email: session.email, phone: v.phone ?? "", location: v.location ?? "" });
    setSaved(true); setTimeout(() => setSaved(false), 2500);
  };
  return (
    <div>
      <Title>Settings</Title>
      <Card className="max-w-lg"><form onSubmit={handleSubmit(onSubmit)}>
        <Field label="Full name" error={errors.name?.message} {...register("name")} />
        <Field label="Email" disabled {...register("email")} />
        <Field label="Phone number" {...register("phone")} />
        <Field label="Location" placeholder="e.g. Bamenda, Northwest" {...register("location")} />
        <div className="flex items-center gap-3"><Btn type="submit" disabled={!isDirty}>Save Changes</Btn>{saved && <span role="status" className="text-sm text-green-800">Saved ✓</span>}</div>
      </form></Card>
      <p className="mt-3 max-w-lg text-xs text-neutral-500">Accounts and farm data are stored in this browser only. There is no server yet.</p>
    </div>
  );
}
