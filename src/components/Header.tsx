import { LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-y border-border">
      <div className="max-w-screen-xl mx-auto border-x">
        <div className="flex items-center justify-center gap-8 py-6 px-8">
          <div className="flex gap-2 items-center justify-center">
            <Button size="icon">
              <LinkIcon size={22} />
            </Button>
          </div>
          <div className="flex-1 flex items-center gap-4">
            <Link href="#home" className="text-sm font-medium">
              Home
            </Link>
            <Link href="#pricing" className="text-sm font-medium">
              Pricing
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button size="sm" variant="link">
              <Link href="/sign-up">Sign In</Link>
            </Button>
            <Button size="sm">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
