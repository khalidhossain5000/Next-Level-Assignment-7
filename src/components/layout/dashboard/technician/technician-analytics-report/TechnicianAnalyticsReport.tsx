"use client";

import type { ComponentType, SVGProps } from "react";
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiClipboard,
} from "react-icons/fi";
import { Cell, Pie, PieChart } from "recharts";

import { useGetTechnicianAnalytics } from "@/hooks";

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
import TechnicianAnalyticsSkeleton from "@/components/loader/skleton-loading/dashboard/technicain-analytics.skeleton";


interface OutageStatusCount {
  status: string;
  _count: {
    _all: number;
  };
}

interface TechnicianAnalyticsData {
  totalAssignedOutages: number;
  activeOutages: number;
  restoredOutages: number;
  highPriorityOutages: number;
  outageStatus: OutageStatusCount[];
}

interface TechnicianAnalyticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TechnicianAnalyticsData;
}

interface OutageChartDatum {
  status: string;
  label: string;
  count: number;
  fill: string;
}

interface StatCardItem {
  key: string;
  title: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESTORED: "Restored",
  RESOLVED: "Resolved",
  CANCELLED: "Cancelled",
};

const STATUS_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const;

const TechnicianAnalyticsReport = () => {
  const { data, isPending } = useGetTechnicianAnalytics() as {
    data: TechnicianAnalyticsResponse | undefined;
    isPending: boolean;
  };

  if (isPending) {
    return <TechnicianAnalyticsSkeleton />;
  }

  const analytics = data?.data;

  const outageStatus: OutageStatusCount[] = analytics?.outageStatus ?? [];

  const chartData: OutageChartDatum[] = outageStatus.map((item, index) => ({
    status: item.status,
    label: STATUS_LABELS[item.status] ?? item.status,
    count: item._count._all,
    fill: STATUS_COLORS[index % STATUS_COLORS.length],
  }));

  const chartConfig: ChartConfig = chartData.reduce<ChartConfig>(
    (config, item) => {
      config[item.status] = {
        label: item.label,
        color: item.fill,
      };
      return config;
    },
    {} satisfies ChartConfig
  );

  const totalOutages = chartData.reduce((sum, item) => sum + item.count, 0);

  const statCards: StatCardItem[] = [
    {
      key: "totalAssignedOutages",
      title: "Total Assigned Outages",
      value: analytics?.totalAssignedOutages ?? 0,
      icon: FiClipboard,
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
      key: "highPriorityOutages",
      title: "High Priority Outages",
      value: analytics?.highPriorityOutages ?? 0,
      icon: FiAlertTriangle,
    },
  ];

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

      {/* Outage Status Chart */}
      <Card className="relative overflow-hidden border-border">
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-linear-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

        <CardHeader className="relative">
          <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
            Assigned Outage Status
          </CardTitle>
          <CardDescription>
            Distribution of your assigned outages by current status
          </CardDescription>
        </CardHeader>

        <CardContent className="relative">
          {chartData.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No assigned outage data available yet.
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
                Total {totalOutages} outage{totalOutages !== 1 ? "s" : ""}{" "}
                assigned
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicianAnalyticsReport;