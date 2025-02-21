import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="border-y">
      <div className="bg-muted border-x max-w-screen-xl h-56 mx-auto flex items-end justify-between px-8 py-12">
        <p className="text-sm text-muted-foreground">
          &copy; 2024 7Cass. All rights reserved.
        </p>
        <div className="flex items-center justify-center divide-x">
          <Link href="https://github.com/7Cass">
            <GithubIcon className="text-primary mr-1" size={20} />
          </Link>
          <Link href="https://linkedin.com/in/jparruda">
            <LinkedinIcon className="text-primary ml-1" size={20} />
          </Link>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <Link href="/terms-of-service">
            <Button className="text-sm font-normal" variant="link">
              Terms of Service
            </Button>
          </Link>
          <Link href="/privacy-policy">
            <Button className="text-sm font-normal" variant="link">
              Privacy Policy
            </Button>
          </Link>
          <Link href="#home">
            <Button variant="outline" size="icon">
              <ArrowUpIcon size={20} className="" />
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
