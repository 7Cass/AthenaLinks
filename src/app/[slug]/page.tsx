import { redirect } from "next/navigation";
import { prisma } from "../prisma";

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

  console.log(link?.originalUrl);

  if (!link) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold">Link not found.</h1>
      </div>
    );
  }

  console.log(link);

  await prisma.shortenedLink.update({
    data: {
      clicks: link.clicks + 1,
    },
    where: {
      id: link.id,
    },
  });

  await prisma.linkClick.create({
    data: {
      shortenedLinkId: link.id,
      ipAddress: "",
      userAgent: "",
      country: "",
      deviceType: "DESKTOP",
      referrer: "",
      timestamp: new Date(),
    },
  });

  redirect(link.originalUrl);
}
