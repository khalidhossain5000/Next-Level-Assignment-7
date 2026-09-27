"use client";

import {
    FiActivity,
    FiAlertTriangle,
    FiCheckCircle,
    FiDollarSign,
} from "react-icons/fi";
import { Cell, Pie, PieChart } from "recharts";

import { useGetCustomerAnalytics } from "@/hooks";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";

import { Skeleton } from "../ui/skeleton";

const STATUS_LABELS: Record<string, string> = {
    PENDING: "Pending",
    ASSIGNED: "Assigned",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
    CANCELLED: "Cancelled",
};

const STATUS_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
];

const CustomerAnalyticsReport = () => {
    const { data, isPending } = useGetCustomerAnalytics();

    const analytics = data?.data;

    const outageStatus = analytics?.outageStatus ?? [];

    const chartData = outageStatus.map((item, index) => ({
        status: item.status,
        label: STATUS_LABELS[item.status] ?? item.status,
        count: item._count._all,
        fill: STATUS_COLORS[index % STATUS_COLORS.length],
    }));

    const chartConfig = chartData.reduce((config, item) => {
        config[item.status] = {
            label: item.label,
            color: item.fill,
        };
        return config;
    }, {} as ChartConfig) satisfies ChartConfig;

    const totalOutages = chartData.reduce((sum, item) => sum + item.count, 0);

    const statCards = [
        {
            key: "totalReportedOutages",
            title: "Total Reported Outages",
            description: "All outages reported by you",
            value: analytics?.totalReportedOutages ?? 0,
            icon: FiActivity,
        },
        {
            key: "highPriorityOutages",
            title: "High Priority Outages",
            description: "Outages marked as high priority",
            value: analytics?.highPriorityOutages ?? 0,
            icon: FiAlertTriangle,
        },
        {
            key: "restoredOutages",
            title: "Restored Outages",
            description: "Outages resolved successfully",
            value: analytics?.restoredOutages ?? 0,
            icon: FiCheckCircle,
        },
        {
            key: "totalSpent",
            title: "Total Spent",
            description: "Total amount spent so far",
            value: `৳${(analytics?.totalSpent ?? 0).toLocaleString()}`,
            icon: FiDollarSign,
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
                            className="relative overflow-hidden border-border py-0"
                        >
                            {/* Gradient glow */}
                            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br from-primary/25 via-primary/10 to-transparent blur-2xl" />

                            <CardHeader className="relative gap-1 p-5">
                                <div className="flex items-center justify-between">
                                    <CardDescription className="text-xs font-medium">
                                        {stat.title}
                                    </CardDescription>

                                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="size-4" />
                                    </div>
                                </div>

                                {isPending ? (
                                    <Skeleton className="h-8 w-20" />
                                ) : (
                                    <CardTitle className="font-manrope text-2xl font-bold tracking-tight text-card-foreground">
                                        {stat.value}
                                    </CardTitle>
                                )}
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>

            {/* Outage Status Chart */}
            <Card className="relative overflow-hidden border-border">
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />

                <CardHeader className="relative">
                    <CardTitle className="font-manrope text-lg font-bold tracking-tight text-card-foreground">
                        Outage Status Breakdown
                    </CardTitle>
                    <CardDescription>
                        Distribution of your reported outages by current status
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                    {isPending ? (
                        <div className="flex items-center justify-center py-10">
                            <Skeleton className="size-52 rounded-full" />
                        </div>
                    ) : chartData.length === 0 ? (
                        <p className="py-10 text-center text-sm text-muted-foreground">
                            No outage data available yet.
                        </p>
                    ) : (
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
                    )}

                    {!isPending && chartData.length > 0 && (
                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Total {totalOutages} outage{totalOutages !== 1 ? "s" : ""} reported
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CustomerAnalyticsReport;