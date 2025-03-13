"use server";

import { executeAction } from "@/lib/executeAction";
import { $Enums } from "@prisma/client";
import { prisma } from "../prisma";
import { auth } from "@/auth";

export interface IAnalytics {
  clicks: {
    total: number;
    previousPeriod: number;
    currentPeriod: number;
  };
  conversionRate: {
    total: number;
    converted: number;
    percentage: number;
  };
  devices: {
    [key in $Enums.DeviceType]: number;
  };
  geographics: {
    [key: string]: {
      name: string;
      count: number;
      percentage: number;
    };
  };
  browsers: {
    [key: string]: {
      name: string;
      count: number;
      percentage: number;
    };
  };
  peakTime: {
    [key: string]: {
      name: string;
      count: number;
      percentage: number;
    };
  };
}

export async function getAnalytics(): Promise<IAnalytics> {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const links = await prisma.shortenedLink.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        clicks: true,
        enableIntermediatePage: true,
      },
    });

    // Calculate total clicks
    const totalClicks = links.reduce((acc, link) => {
      const linkClicks = link.clicks;
      return acc + linkClicks;
    }, 0);

    // // Calculate previous period clicks
    // const previousPeriodClicks = links.reduce((acc, link) => {
    //   const linkClicks = link.clicks;
    //   return acc + linkClicks;
    // }, 0);

    // // Calculate current period clicks
    // const currentPeriodClicks = links.reduce((acc, link) => {
    //   const linkClicks = link.clicks;
    //   return acc + linkClicks;
    // }, 0);

    const linksIds = links.map((link) => link.id);

    const linksClicks = await prisma.linkClick.findMany({
      where: {
        shortenedLinkId: {
          in: linksIds,
        },
      },
    });

    const deviceCounts = await prisma.linkClick.groupBy({
      by: ["deviceType"],
      where: {
        shortenedLinkId: {
          in: linksIds,
        },
      },
      _count: {
        deviceType: true,
      },
    });

    const devices = Object.fromEntries(
      Object.values($Enums.DeviceType).map((device) => [
        device,
        deviceCounts.find(({ deviceType }) => deviceType === device)?._count
          .deviceType || 0,
      ]),
    ) as IAnalytics["devices"];

    return {
      clicks: {
        total: totalClicks,
        previousPeriod: 0,
        currentPeriod: 0,
      },
      conversionRate: {
        total: 0,
        converted: 0,
        percentage: 0,
      },
      devices,
      geographics: {},
      browsers: {},
      peakTime: {},
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve analytics");
  }
}
