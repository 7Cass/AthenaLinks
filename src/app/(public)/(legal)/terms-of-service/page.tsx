import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="w-full">
      <section className="max-w-screen-xl h-full bg-gradient-to-br from-muted to-background py-24 px-8 mx-auto space-y-8 border-x">
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button size="icon" variant="ghost">
                <ArrowLeftIcon size={28} className="" />
              </Button>
            </Link>
            <h2 className="text-2xl font-bold">Terms of Service</h2>
          </div>
          <div className="max-w-4xl text-lg text-muted-foreground">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam
              sed recusandae amet rerum quibusdam laudantium eligendi placeat
              enim omnis sint? Atque sunt porro nam. Eligendi enim sapiente
              maxime exercitationem necessitatibus?
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
