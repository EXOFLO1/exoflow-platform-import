import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "@/contexts/CompanyContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Bot,
  Megaphone,
  ShoppingCart,
  CalendarDays,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Zap,
  UserCircle,
  Building2,
  Tags,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  label: string;
  labelAr: string;
  icon: React.ElementType;
  path: string;
}

const mainNavItems: NavItem[] = [
  { label: "Dashboard", labelAr: "لوحة التحكم", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Inbox", labelAr: "صندوق الوارد", icon: MessageSquare, path: "/inbox" },
  { label: "Customers", labelAr: "العملاء", icon: Users, path: "/customers" },
  { label: "AI Hub", labelAr: "مركز الذكاء", icon: Bot, path: "/ai-hub" },
  { label: "Marketing", labelAr: "التسويق", icon: Megaphone, path: "/marketing" },
  { label: "Orders", labelAr: "الطلبات", icon: ShoppingCart, path: "/orders" },
  { label: "Appointments", labelAr: "المواعيد", icon: CalendarDays, path: "/appointments" },
  { label: "Analytics", labelAr: "التحليلات", icon: BarChart3, path: "/analytics" },
];

const bottomNavItems: NavItem[] = [
  { label: "Team", labelAr: "الفريق", icon: UserCircle, path: "/team" },
  { label: "Settings", labelAr: "الإعدادات", icon: Settings, path: "/settings" },
];

export const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();
  const { company, companyUser } = useCompany();
  const location = useLocation();

  const renderNavItem = (item: NavItem) => {
    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
    const Icon = item.icon;

    const link = (
      <NavLink
        to={item.path}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span>{item.labelAr}</span>}
      </NavLink>
    );

    if (collapsed) {
      return (
        <Tooltip key={item.path} delayDuration={0}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="left" className="font-cairo">
            {item.labelAr}
          </TooltipContent>
        </Tooltip>
      );
    }

    return <div key={item.path}>{link}</div>;
  };

  return (
    <aside
      className={cn(
        "fixed top-0 right-0 z-40 flex h-screen flex-col border-l border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-sidebar-foreground">ExoFlow</h2>
              <p className="text-[10px] text-sidebar-muted truncate max-w-[140px]">
                {company?.name || "منصة العمليات"}
              </p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Main nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {mainNavItems.map(renderNavItem)}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* Bottom nav */}
      <div className="space-y-1 px-3 py-3">
        {bottomNavItems.map(renderNavItem)}

        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive/80 transition-all hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full text-sidebar-muted hover:text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
};
