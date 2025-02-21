import SignUpForm from "@/components/forms/sign-up-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="h-dvh grid grid-cols-[auto] lg:grid-cols-[1fr_1fr]">
      <div className="hidden lg:block bg-background">
        <GoBack />
      </div>
      <div className="flex items-center justify-center bg-foreground">
        <SignUpForm />
      </div>
    </div>
  );
}

export function GoBack() {
  "use client";

  return (
    <Link href="/" className="flex items-center gap-2 text-foreground m-8">
      <ArrowLeft />
      <span>Voltar</span>
    </Link>
  );
}
