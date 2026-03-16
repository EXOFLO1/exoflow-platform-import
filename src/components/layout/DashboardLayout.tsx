import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="mr-[260px] min-h-screen transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
