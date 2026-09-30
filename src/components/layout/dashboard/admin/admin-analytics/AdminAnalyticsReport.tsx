"use client";

import type { ComponentType, SVGProps } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis } from "recharts";

import { useGetAdminAnalytics } from "@/hooks";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AdminAnalyticsSkeleton from "@/components/loader/skleton-loading/dashboard/admin-analytics.skelelton";


interface StatusCount {
  status: string;
  _count: {
    _all: number;
  };
}

interface AdminAnalyticsData {
  totalUsers: number;
  totalTechnicians: number;
  totalReportedOutages: number;
  activeOutages: number;
  restoredOutages: number;
  totalRevenue: number;
  totalLoadSheddingSchedules: number;
  totalPlannedOutages: number;
  outageStatus: StatusCount[];
  userStatus: StatusCount[];
}

interface AdminAnalyticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminAnalyticsData;
}

interface StatCardItem {
  key: string;
  title: string;
  value: string | number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const STATUS_LABELS: Record<string, string> = {
  REPORTED: "Reported",
  ACKNOWLEDGED: "Acknowledged",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESTORED: "Restored",
  CANCELLED: "Cancelled",
  ACTIVE: "Active",
  BAN: "Banned",
};

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;



interface DonutChartCardProps {
  title: string;
  description: string;
  data: StatusCount[];
  emptyText: string;
  totalLabel: string;
}

const DonutChartCard = ({
  title,
  description,
  data,
  emptyText,
  totalLabel,
}: DonutChartCardProps) => {
  const chartData = data.map((item, index) => ({
    status: item.status,
    label: STATUS_LABELS[item.status] ?? item.status,
    count: item._count._all,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce<ChartConfig>(
    (config, item) => {
      config[item.status] = { label: item.label, color: item.fill };
      return config;
    },
    {} satisfies ChartConfig
  );

  const total = chartData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card className="relative overflow-hidden border-border">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

      <CardHeader className="relative">
        <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="relative">
        {chartData.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            {emptyText}
          </p>
        ) : (
          <>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-72"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />

                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  strokeWidth={4}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={entry.fill}
                      stroke="var(--card)"
                    />
                  ))}
                </Pie>

                <ChartLegend
                  content={<ChartLegendContent nameKey="status" />}
                  className="flex-wrap gap-2"
                />
              </PieChart>
            </ChartContainer>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Total {total} {totalLabel}
              {total !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};



const AdminAnalyticsReport = () => {
  const { data, isPending } = useGetAdminAnalytics() as {
    data: AdminAnalyticsResponse | undefined;
    isPending: boolean;
  };

  if (isPending) {
    return <AdminAnalyticsSkeleton />;
  }

  const analytics = data?.data;

  const statCards: StatCardItem[] = [
    {
      key: "totalUsers",
      title: "Total Users",
      value: analytics?.totalUsers ?? 0,
      icon: FiUsers,
    },
    {
      key: "totalTechnicians",
      title: "Total Technicians",
      value: analytics?.totalTechnicians ?? 0,
      icon: FiTool,
    },
    {
      key: "totalReportedOutages",
      title: "Total Reported Outages",
      value: analytics?.totalReportedOutages ?? 0,
      icon: FiAlertTriangle,
    },
    {
      key: "activeOutages",
      title: "Active Outages",
      value: analytics?.activeOutages ?? 0,
      icon: FiActivity,
    },
    {
      key: "restoredOutages",
      title: "Restored Outages",
      value: analytics?.restoredOutages ?? 0,
      icon: FiCheckCircle,
    },
    {
      key: "totalRevenue",
      title: "Total Revenue",
      value: `৳ ${(analytics?.totalRevenue ?? 0).toLocaleString()}`,
      icon: FiDollarSign,
    },
    {
      key: "totalLoadSheddingSchedules",
      title: "Load Shedding Schedules",
      value: analytics?.totalLoadSheddingSchedules ?? 0,
      icon: FiClock,
    },
    {
      key: "totalPlannedOutages",
      title: "Planned Outages",
      value: analytics?.totalPlannedOutages ?? 0,
      icon: FiCalendar,
    },
  ];

  const barData = [
    {
      key: "reported",
      label: "Reported",
      count: analytics?.totalReportedOutages ?? 0,
      fill: CHART_COLORS[0],
    },
    {
      key: "active",
      label: "Active",
      count: analytics?.activeOutages ?? 0,
      fill: CHART_COLORS[1],
    },
    {
      key: "restored",
      label: "Restored",
      count: analytics?.restoredOutages ?? 0,
      fill: CHART_COLORS[2],
    },
  ];

  const barConfig: ChartConfig = {
    count: { label: "Outages" },
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.key}
              className="relative overflow-hidden rounded-lg border-border py-0"
            >
              {/* Gradient glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-linear-to-br from-primary/25 via-primary/10 to-transparent blur-2xl" />

              <CardHeader className="relative gap-1 p-5">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs font-medium">
                    {stat.title}
                  </CardDescription>

                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                </div>

                <CardTitle className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
                  {stat.value}
                </CardTitle>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      {/* Donut Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DonutChartCard
          title="Outage Status Breakdown"
          description="Distribution of all outages by current status"
          data={analytics?.outageStatus ?? []}
          emptyText="No outage data available yet."
          totalLabel="outage"
        />

        <DonutChartCard
          title="User Status Breakdown"
          description="Distribution of users by account status"
          data={analytics?.userStatus ?? []}
          emptyText="No user data available yet."
          totalLabel="user"
        />
      </div>

      {/* Bar Chart */}
      <Card className="relative overflow-hidden border-border">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

        <CardHeader className="relative">
          <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
            Outage Overview
          </CardTitle>
          <CardDescription>
            Reported, active and restored outages at a glance
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <ChartContainer config={barConfig} className="h-72 w-full">
            <BarChart data={barData} margin={{ top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" radius={8}>
                {barData.map((entry) => (
                  <Cell key={entry.key} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsReport;