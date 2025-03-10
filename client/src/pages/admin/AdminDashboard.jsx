import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminAnalytics } from "../../features/actions/adminActions";
import { ErrorState, Spinner } from "../../components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { analytics, isLoading } = useSelector((store) => store.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminAnalytics());
  }, [dispatch]);

  if (isLoading) return <Spinner />;
  if (!analytics) return <ErrorState error="Error fetching analytics" />;

  const COLORS = [
    "#6366f1",
    "#10b981",
    "#ef4444",
    "#f59e0b",
    "#3b82f6",
    "#84cc16",
    "#f97316",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
  ];

  const formatStatusData = (data, possibleStatuses) => {
    return possibleStatuses.map((status) => ({
      status,
      count: data
        .filter((item) => item.status === status)
        .reduce((sum, item) => sum + item.count, 0),
    }));
  };

  const projectStatuses = ["pending", "inprogress", "review", "completed"];
  const taskStatuses = ["pending", "inprogress", "completed"];
  const priorities = ["low", "medium", "high", "urgent"];

  const projectStatusData = formatStatusData(
    analytics.projects.statusCounts,
    projectStatuses
  );
  const taskStatusData = formatStatusData(
    analytics.tasks.statusCounts,
    taskStatuses
  );
  const taskPriorityData = formatStatusData(
    analytics.tasks.priorityCounts,
    priorities
  );
  const applicationStatusData = analytics.applications.statusCounts;
  const roleData = analytics.applications.roleWiseCounts;
  const associateTasks = analytics.tasks.associateTaskCounts.map((item) => ({
    ...item,
    associateId: item.associateId || "Unassigned",
  }));

  const financialData = [
    { name: "Total Revenue", value: analytics.projects.totalRevenue },
    { name: "Yearly Revenue", value: analytics.projects.yearlyRevenue },
    { name: "Last Month", value: analytics.projects.lastMonthRevenue },
  ];

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const totalProjects = projectStatusData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const totalTasks = taskStatusData.reduce((sum, item) => sum + item.count, 0);
  const totalApplications = applicationStatusData.reduce(
    (sum, item) => sum + item.count,
    0
  );
  const completionRate = (
    (taskStatusData.find((t) => t.status === "completed")?.count / totalTasks) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen w-screen  bg-slate-50 p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard & Platform Analytics
          </h1>
          <p className="text-slate-600 text-lg">
            Comprehensive Performance Insights
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            label="Total Projects"
            value={totalProjects}
            color="text-indigo-600"
          />
          <MetricCard
            label="Active Tasks"
            value={totalTasks}
            color="text-emerald-600"
          />
          <MetricCard
            label="Applications"
            value={totalApplications}
            color="text-rose-600"
          />
          <MetricCard
            label="Approval Rate"
            value={`${analytics.applications.approvalRate.toFixed(1)}%`}
            color="text-amber-600"
          />
          <MetricCard
            label="Avg Completion Days"
            value={analytics.projects.avgCompletionDays}
            color="text-fuchsia-600"
          />
          <MetricCard
            label="Total Revenue"
            value={formatCurrency(analytics.projects.totalRevenue)}
            color="text-sky-600"
          />
          <MetricCard
            label="Yearly Revenue"
            value={formatCurrency(analytics.projects.yearlyRevenue)}
            color="text-lime-600"
          />
          <MetricCard
            label="Last Month Revenue"
            value={formatCurrency(analytics.projects.lastMonthRevenue)}
            color="text-orange-600"
          />
        </div>

        {/* Project Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartCard title="Project Status Distribution">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={projectStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6">
                  {projectStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Project Progress Radar">
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={projectStatusData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="status" />
                <Radar
                  name="Projects"
                  dataKey="count"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Task Analytics Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="Task Priority Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskPriorityData}
                  dataKey="count"
                  nameKey="priority"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {taskPriorityData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Task Status Flow">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={taskStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Task Assignment">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={associateTasks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="associateId" angle={-45} textAnchor="end" />
                <YAxis />
                <Bar dataKey="count" fill="#f59e0b" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Application Analytics Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <ChartCard title="Application Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {applicationStatusData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Role Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Bar dataKey="count" fill="#8b5cf6" />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, color }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
      {label}
    </h3>
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">{title}</h2>
    <div className="h-[300px] sm:h-[400px]">{children}</div>
  </div>
);

export default AdminDashboard;
