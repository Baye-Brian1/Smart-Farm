import { Btn, Card, Field, Title } from "@/components/ui";

export default function Settings() {
  return (
    <div>
      <Title>Settings</Title>
      <Card className="max-w-lg">
        <Field label="Full name" defaultValue="Brian Ngu" />
        <Field label="Email" type="email" defaultValue="brian.ngu@example.com" />
        <Field label="Phone number" defaultValue="+237 6 12 34 56 78" />
        <Field label="Location" defaultValue="Bamenda, Northwest" />
        <Btn>Save Changes</Btn>
      </Card>
    </div>
  );
}
