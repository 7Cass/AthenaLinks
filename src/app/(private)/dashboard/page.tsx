import { getUserLinks } from "@/app/actions/link";
import { CreateLinkSheet } from "@/components/dashboard/create-link-sheet";
import { linkColumns } from "@/components/dashboard/links-columns";
import { LinksTable } from "@/components/dashboard/links-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ShortenedLink } from "@prisma/client";
import { PlusCircleIcon } from "lucide-react";

export default async function Dashboard() {
  const links: ShortenedLink[] = await getUserLinks();

  return (
    <main className="container max-w-screen-xl flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-4">
        <Input placeholder="Pesquise..." className="max-w-lg" />
        <CreateLinkSheet>
          <Button>
            <PlusCircleIcon />
            Criar Link
          </Button>
        </CreateLinkSheet>
      </div>
      <LinksTable columns={linkColumns} data={links} />
    </main>
  );
}
