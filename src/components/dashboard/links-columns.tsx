"use client";

import { formatDate } from "@/lib/utils";
import { ShortenedLink } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClipboardIcon,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { deleteLink } from "@/app/actions/link";
import { toast } from "sonner";

const handleDeleteLink = async (linkId: string) => {
  const { success, message } = await deleteLink(linkId);

  success ? toast.success(message) : toast.error(message);
};

export async function handleCopyUrl(link: ShortenedLink) {
  console.log(process.env.NODE_ENV);
  const url =
    process.env.NODE_ENV === "production"
      ? `http://plu.tus/${link.slug}`
      : `http://localhost:3000/${link.slug}`;
  try {
    await navigator.clipboard.writeText(url);
    toast.success("Shortened Link copied to clipboard!");
  } catch (err) {
    toast.error("Failed to copy link to clipboard");
  }
}

export const linkColumns: ColumnDef<ShortenedLink>[] = [
  {
    accessorKey: "originalUrl",
    header: "Original URL",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
  },
  {
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDate(row.original.expiresAt, {
          dateStyle: "short",
        })}
      </div>
    ),
  },
  {
    accessorKey: "enableIntermediatePage",
    header: "Template",
    cell: ({ row }) =>
      row.original.enableIntermediatePage ? (
        <CircleCheckIcon size={20} />
      ) : (
        <CircleXIcon size={20} />
      ),
  },
  {
    id: "copy",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCopyUrl(link)}
          >
            <ClipboardIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleDeleteLink(link.id)}
          >
            <Trash2Icon />
          </Button>
        </div>
      );
    },
  },
];
