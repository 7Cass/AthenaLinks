import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { headers } from "next/headers";

interface RedirectPageParams {
  slug: string;
}

export default async function RedirectPage({
  params,
}: {
  params: RedirectPageParams;
}) {
  const { slug } = params;

  const link = await prisma.shortenedLink.findUnique({
    where: { slug },
    select: {
      id: true,
      originalUrl: true,
      clicks: true,
    },
  });

  if (!link) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Link not found.</h1>
      </div>
    );
  }

  await prisma.shortenedLink.update({
    data: {
      clicks: link.clicks + 1,
    },
    where: {
      id: link.id,
    },
  });

  const headersList = headers();

  await prisma.linkClick.create({
    data: {
      shortenedLinkId: link.id,
      ipAddress: headersList.get("x-forwarded-for") || null,
      userAgent: headersList.get("user-agent") || null,
      country: null,
      deviceType: "DESKTOP",
      referrer: null,
      timestamp: new Date(),
    },
  });

  redirect(link.originalUrl);
}
