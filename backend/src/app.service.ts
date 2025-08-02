import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ApiResponse } from './common/dto/api-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDashboardData() {
    const homeOwners = await this.prismaService.user.count({
      where: {
        role: 'USER',
      },
    });

    const vendors = await this.prismaService.user.count({
      where: { role: 'VENDOR' },
    });

    const projects = await this.prismaService.project.count();

    const openBids = await this.prismaService.project.count({
      where: {
        status: 'AWARDED',
      },
    });

    const signupsToday = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
        role: {
          not: 'ADMIN',
        },
      },
    });

    const howeownersToday = signupsToday.filter(
      (item) => item.role === 'USER',
    ).length;
    const vendorsToday = signupsToday.length - howeownersToday;

    const monday = new Date();
    const day = monday.getDay();
    monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1));
    monday.setHours(0, 0, 0, 0);

    const signupsThisWeek = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: monday,
        },
        role: {
          not: 'ADMIN',
        },
      },
    });

    const homeownersThisWeek = signupsThisWeek.filter(
      (item) => item.role === 'USER',
    ).length;

    const vendorsThisWeek = signupsThisWeek.length - homeownersThisWeek;

    const today = new Date();

    const signupsThisMonth = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: new Date(today.getFullYear(), today.getMonth(), 1),
        },
        role: {
          not: 'ADMIN',
        },
      },
    });

    const homeownersThisMonth = signupsThisMonth.filter(
      (item) => item.role === 'USER',
    ).length;

    const vendorsThisMonth = signupsThisMonth.length - homeownersThisMonth;

    const signups = {
      today: {
        total: signupsToday.length,
        homeowners: howeownersToday,
        vendors: vendorsToday,
      },
      thisWeek: {
        total: signupsThisWeek.length,
        homeowners: homeownersThisWeek,
        vendors: vendorsThisWeek,
      },
      thisMonth: {
        total: signupsThisMonth.length,
        homeowners: homeownersThisMonth,
        vendors: vendorsThisMonth,
      },
    };

    const totalVendors = await this.prismaService.user.findMany({
      where: {
        role: 'VENDOR',
      },
      include: {
        UserPlan: true,
      },
    });

    const totalSubscriptions = totalVendors.filter(
      (item) => item.UserPlan.length > 0,
    ).length;

    const activeSubscriptions = totalVendors.filter((item) =>
      item.UserPlan.some((p) => p.endDate > new Date()),
    ).length;

    const subscriptions = {
      total: totalSubscriptions,
      active: activeSubscriptions,
      expired: totalSubscriptions - activeSubscriptions,
    };

    const signupTrend = await this.getSignupTrend();

    return new ApiResponse(
      {
        homeOwners,
        vendors,
        projects,
        openBids,
        signups,
        subscriptions,
        signupTrend,
      },
      'Dashboard data fetched successfully',
    );
  }

  async getSignupTrend() {
    const usersThisYear = await this.prismaService.user.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
    });

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const signupCounts = new Array(12).fill(0);

    for (const user of usersThisYear) {
      const month = user.createdAt.getMonth();
      signupCounts[month]++;
    }

    const signupTrend = signupCounts.map((count, i) => {
      return {
        month: months[i],
        signups: count,
      };
    });

    return { year: new Date().getFullYear(), data: signupTrend };
  }
}
