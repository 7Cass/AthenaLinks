"use server";

import { executeAction } from "@/lib/executeAction";
import { prisma } from "../prisma";
import { auth } from "@/auth";
import { ShortenedLink } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { QUOTAS } from "@/config/quota";
import { getUserCurrentPlan } from "../stripe";

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // Caracteres permitidos
  8, // Tamanho do slug (ex: "abcDEF12")
);

const RESERVED_SLUGS = ["admin", "api", "dashboard", "login", "settings"];

export async function getUserLinks() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const links = await prisma.shortenedLink.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return links;
}

export async function createLink({
  originalUrl,
  slug,
  expiresAt,
}: Pick<ShortenedLink, "originalUrl" | "expiresAt" | "slug">) {
  return await executeAction({
    actionFn: async () => {
      const session = await auth();

      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const plan = await getUserCurrentPlan(session.user.id);

      if (plan.quota.links.usage === 100) {
        throw new Error("You have reached your link quota.");
      }

      if (slug && RESERVED_SLUGS.includes(slug.toLowerCase())) {
        throw new Error(`O slug "${slug}" é reservado e não pode ser usado.`);
      }

      // Generate unique slug if not provided
      if (!slug) {
        let isUnique = false;
        while (!isUnique) {
          slug = nanoid();
          const existingLink = await prisma.shortenedLink.findUnique({
            where: { slug },
          });
          if (!existingLink) isUnique = true;
        }
      }

      const link = await prisma.shortenedLink.create({
        data: {
          originalUrl,
          slug,
          expiresAt,
          userId: session.user.id,
        },
      });

      return link;
    },
    successMessage: "Link criado com sucesso!",
  });
}

export async function checkSlugAvailability(slug: string) {
  return await executeAction({
    actionFn: async () => {
      if (slug && RESERVED_SLUGS.includes(slug.toLowerCase())) {
        throw new Error("Invalid slug");
      }

      const slugExists = await prisma.shortenedLink.findUnique({
        where: {
          slug,
        },
      });

      if (slugExists) {
        throw new Error("Slug already taken.");
      }
    },
    successMessage: "Slug available.",
  });
}

export async function deleteLink(linkId: string) {
  return await executeAction({
    actionFn: async () => {
      const session = await auth();

      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      const link = await prisma.shortenedLink.findUnique({
        where: { id: linkId, userId: session.user.id },
      });

      if (!link) throw Error("Link not found.");

      await prisma.shortenedLink.delete({
        where: {
          id: link.id,
          userId: session.user.id,
        },
      });
    },
    successMessage: "Link deleted succesfully!",
  });
}

export async function checkLinkQuota(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true },
  });

  if (!user) throw new Error("User not found.");

  if (user.plan === QUOTAS.free.plan) {
    const usedLinks = await prisma.shortenedLink.count({
      where: { userId },
    });

    return usedLinks < QUOTAS.free.maxLinks;
  }
}
