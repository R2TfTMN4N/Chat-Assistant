"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@workspace/ui/components/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  CheckCircle2,
  Clock,
  MessageSquare,
  TrendingUp,
  Users,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const CHART_COLORS = [
  "hsl(217, 91%, 60%)", // Blue
  "hsl(142, 76%, 36%)", // Green
  "hsl(24, 95%, 53%)", // Orange
  "hsl(262, 83%, 58%)", // Purple
  "hsl(339, 82%, 52%)", // Pink
];

export function DashboardAnalytics() {
  const [trendDays, setTrendDays] = useState<number>(7);

  const stats = useQuery(api.private.analytics.getStats);
  const trends = useQuery(api.private.analytics.getConversationTrends, {
    days: trendDays,
  });
  const topContacts = useQuery(api.private.analytics.getTopContacts, {
    limit: 10,
  });
  const recentActivity = useQuery(api.private.analytics.getRecentActivity, {
    limit: 10,
  });
  const browserStats = useQuery(api.private.analytics.getBrowserStats);
  const hourlyActivity = useQuery(api.private.analytics.getHourlyActivity);
  const statusTimeline = useQuery(api.private.analytics.getStatusTimeline, {
    days: trendDays,
  });
  const responseMetrics = useQuery(api.private.analytics.getResponseMetrics);

  const isLoading =
    stats === undefined || trends === undefined || topContacts === undefined;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statusData = [
    { name: "Resolved", value: stats!.resolvedCount, fill: CHART_COLORS[1] },
    {
      name: "Unresolved",
      value: stats!.unresolvedCount,
      fill: CHART_COLORS[2],
    },
    { name: "Escalated", value: stats!.escalatedCount, fill: CHART_COLORS[0] },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversations
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats!.totalConversations}
            </div>
            <p className="text-xs text-muted-foreground">
              All time conversations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resolution Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats!.resolutionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats!.resolvedCount} of {stats!.totalConversations} resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats!.unresolvedCount}</div>
            <p className="text-xs text-muted-foreground">
              Pending conversations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contacts
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats!.totalContacts}</div>
            <p className="text-xs text-muted-foreground">Unique visitors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Response Metrics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {responseMetrics?.avgResponseTime || "0"} min
            </div>
            <p className="text-xs text-muted-foreground">
              Average first response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Conversation Length
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {responseMetrics?.avgConversationLength || "0"}
            </div>
            <p className="text-xs text-muted-foreground">
              Messages per conversation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Resolution Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusTimeline?.avgResolutionTimeHours || "0"} hrs
            </div>
            <p className="text-xs text-muted-foreground">Time to resolve</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Hourly Activity Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle>Activity by Hour</CardTitle>
            <CardDescription>
              Conversation volume throughout the day
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hourlyActivity && hourlyActivity.length > 0 ? (
              <ChartContainer
                config={{
                  count: {
                    label: "Conversations",
                    color: CHART_COLORS[0],
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill={CHART_COLORS[0]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No activity data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>Breakdown by conversation status</CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.some((d) => d.value > 0) ? (
              <ChartContainer
                config={{
                  resolved: {
                    label: "Resolved",
                    color: CHART_COLORS[0],
                  },
                  unresolved: {
                    label: "Unresolved",
                    color: CHART_COLORS[2],
                  },
                  escalated: {
                    label: "Escalated",
                    color: CHART_COLORS[1],
                  },
                }}
                className="h-[300px]"
              >
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No conversations yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Performance</CardTitle>
            <CardDescription>
              Compare resolution vs escalation rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats && (
              <ChartContainer
                config={{
                  resolved: {
                    label: "Resolved",
                    color: CHART_COLORS[1],
                  },
                  escalated: {
                    label: "Escalated",
                    color: CHART_COLORS[2],
                  },
                }}
                className="h-[300px]"
              >
                <BarChart
                  data={[
                    {
                      category: "This Period",
                      resolved: stats.resolvedCount,
                      escalated: stats.escalatedCount,
                    },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="resolved"
                    fill={CHART_COLORS[1]}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="escalated"
                    fill={CHART_COLORS[2]}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Conversation Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Conversation Trends</CardTitle>
                <CardDescription>Daily conversation activity</CardDescription>
              </div>
              <Select
                value={trendDays.toString()}
                onValueChange={(v) => setTrendDays(parseInt(v))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="14">Last 14 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {trends && trends.length > 0 ? (
              <ChartContainer
                config={{
                  resolved: {
                    label: "Resolved",
                    color: CHART_COLORS[1],
                  },
                  unresolved: {
                    label: "Unresolved",
                    color: CHART_COLORS[2],
                  },
                  escalated: {
                    label: "Escalated",
                    color: CHART_COLORS[0],
                  },
                }}
                className="h-[300px]"
              >
                <AreaChart data={trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="1"
                    stroke={CHART_COLORS[1]}
                    fill={CHART_COLORS[1]}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="unresolved"
                    stackId="1"
                    stroke={CHART_COLORS[2]}
                    fill={CHART_COLORS[2]}
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="escalated"
                    stackId="1"
                    stroke={CHART_COLORS[0]}
                    fill={CHART_COLORS[0]}
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available for selected period
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Contacts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Contacts</CardTitle>
            <CardDescription>
              Most active users by conversation count
            </CardDescription>
          </CardHeader>
          <CardContent>
            {topContacts && topContacts.length > 0 ? (
              <ChartContainer
                config={{
                  count: {
                    label: "Conversations",
                    color: CHART_COLORS[0],
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={topContacts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill={CHART_COLORS[3]}
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No contact data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
            <CardDescription>Users by browser/platform</CardDescription>
          </CardHeader>
          <CardContent>
            {browserStats && browserStats.length > 0 ? (
              <div className="space-y-3">
                {browserStats.slice(0, 8).map((platform, index) => {
                  const total = browserStats.reduce(
                    (sum, p) => sum + p.count,
                    0
                  );
                  const percentage = ((platform.count / total) * 100).toFixed(
                    1
                  );
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              CHART_COLORS[index % CHART_COLORS.length],
                          }}
                        />
                        <span className="text-sm font-medium">
                          {platform.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {percentage}%
                        </span>
                        <Badge variant="secondary">{platform.count}</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No platform data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest conversations</CardDescription>
        </CardHeader>
        <CardContent>
          {recentActivity && recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity._id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      {activity.status === "resolved" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : activity.status === "escalated" ? (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.contactName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.contactEmail}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "resolved"
                          ? "default"
                          : activity.status === "escalated"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(activity._creationTime, {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No recent activity
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
