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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleDeleteLink = async (linkId: string, router: AppRouterInstance) => {
  const { success, message } = await deleteLink(linkId);

  router.refresh();

  success ? toast.success(message) : toast.error(message);
};

export async function handleCopyUrl(link: ShortenedLink) {
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
    cell: ({ row, table }) => {
      const link = row.original;
      const router = (table.options.meta as any)?.router as AppRouterInstance;

      return (
        <div className="space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleCopyUrl(link)}
          >
            <ClipboardIcon />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Trash2Icon />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. <br />
                  This will permanently delete your link and remove any related
                  data such as templates and analytics.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteLink(link.id, router)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
