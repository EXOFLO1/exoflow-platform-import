import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "@/contexts/CompanyContext";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Bot,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpLeft,
  ArrowDownLeft,
  Zap,
  Send,
  UserPlus,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

interface DashboardStats {
  totalConversations: number;
  openConversations: number;
  totalCustomers: number;
  totalMessages: number;
  aiRuns: number;
  avgResponseTime: string;
}

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "صباح الخير";
  if (hour < 17) return "مساء الخير";
  return "مساء الخير";
};

const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  delay,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "up" | "down";
  icon: React.ElementType;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {changeType === "up" ? (
                  <ArrowUpLeft className="h-3.5 w-3.5 text-success" />
                ) : (
                  <ArrowDownLeft className="h-3.5 w-3.5 text-destructive" />
                )}
                <span className={`text-xs font-medium ${changeType === "up" ? "text-success" : "text-destructive"}`}>
                  {change}
                </span>
                <span className="text-xs text-muted-foreground">من الأسبوع الماضي</span>
              </div>
            )}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
            <Icon className="h-6 w-6 text-primary-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const QuickAction = ({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) => (
  <Button
    variant="outline"
    className="flex h-auto flex-col items-center gap-2 rounded-xl border-border px-4 py-4 hover:border-primary hover:bg-primary/5 transition-all"
    onClick={onClick}
  >
    <Icon className="h-5 w-5 text-primary" />
    <span className="text-xs font-medium text-foreground">{label}</span>
  </Button>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { company, companyUser } = useCompany();
  const [stats, setStats] = useState<DashboardStats>({
    totalConversations: 0,
    openConversations: 0,
    totalCustomers: 0,
    totalMessages: 0,
    aiRuns: 0,
    avgResponseTime: "0",
  });

  const userName = companyUser?.full_name || user?.user_metadata?.full_name || "مستخدم";

  useEffect(() => {
    if (!company?.id) return;

    const fetchStats = async () => {
      const [convRes, custRes, msgRes, aiRes] = await Promise.all([
        supabase.from("conversations").select("id, status", { count: "exact" }).eq("company_id", company.id),
        supabase.from("customers").select("id", { count: "exact" }).eq("company_id", company.id),
        supabase.from("messages").select("id", { count: "exact" }).eq("company_id", company.id),
        supabase.from("ai_runs").select("id", { count: "exact" }).eq("company_id", company.id),
      ]);

      const openCount = convRes.data?.filter((c) => c.status === "open").length || 0;

      setStats({
        totalConversations: convRes.count || 0,
        openConversations: openCount,
        totalCustomers: custRes.count || 0,
        totalMessages: msgRes.count || 0,
        aiRuns: aiRes.count || 0,
        avgResponseTime: "2.4",
      });
    };

    fetchStats();
  }, [company?.id]);

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {getGreeting()}، {userName} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              إليك نظرة عامة على أداء {company?.name || "شركتك"} اليوم
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-success/30 text-success bg-success/5">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-success inline-block" />
              النظام يعمل
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="إجمالي المحادثات"
          value={stats.totalConversations}
          change="+12%"
          changeType="up"
          icon={MessageSquare}
          color="gradient-primary"
          delay={0.1}
        />
        <StatCard
          title="المحادثات المفتوحة"
          value={stats.openConversations}
          icon={Clock}
          color="bg-warning"
          delay={0.15}
        />
        <StatCard
          title="العملاء"
          value={stats.totalCustomers}
          change="+8%"
          changeType="up"
          icon={Users}
          color="bg-success"
          delay={0.2}
        />
        <StatCard
          title="عمليات الذكاء الاصطناعي"
          value={stats.aiRuns}
          change="+24%"
          changeType="up"
          icon={Bot}
          color="bg-accent"
          delay={0.25}
        />
      </div>

      {/* Second Row */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="إجمالي الرسائل"
          value={stats.totalMessages}
          icon={Send}
          color="bg-info"
          delay={0.3}
        />
        <StatCard
          title="متوسط وقت الاستجابة"
          value={`${stats.avgResponseTime} ث`}
          icon={TrendingUp}
          color="gradient-primary"
          delay={0.35}
        />
        <StatCard
          title="معدل الرضا"
          value="94%"
          change="+3%"
          changeType="up"
          icon={CheckCircle2}
          color="bg-success"
          delay={0.4}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
              <QuickAction label="محادثة جديدة" icon={MessageSquare} />
              <QuickAction label="إضافة عميل" icon={UserPlus} />
              <QuickAction label="حملة تسويقية" icon={Send} />
              <QuickAction label="إعدادات AI" icon={Bot} />
              <QuickAction label="التقارير" icon={BarChart3} />
              <QuickAction label="إعدادات" icon={AlertCircle} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
