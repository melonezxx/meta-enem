"use client";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/redacao": "Redação",
  "/dashboard/linguagens": "Linguagens e Códigos",
  "/dashboard/matematica": "Matemática",
  "/dashboard/humanas": "Ciências Humanas",
  "/dashboard/natureza": "Ciências da Natureza",
  "/dashboard/progresso": "Meu Progresso",
  "/dashboard/pomodoro": "Pomodoro",
  "/dashboard/plano": "Plano de Estudos",
  "/dashboard/favoritos": "Favoritos",
};

export default function DashboardHeader() {
  const pathname = usePathname();
  const { user, sidebarOpen, setSidebarOpen, pomodoroSessions, pomodoroDate } = useStore();

  const title = pageTitles[pathname] || "Dashboard";
  const today = new Date().toISOString().split("T")[0];
  const sessionsToday = pomodoroDate === today ? pomodoroSessions : 0;

  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-10">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-background-elevated transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Title */}
      <div className="flex-1">
        <h1 className="text-lg font-display font-semibold text-text-primary">{title}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Pomodoro sessions badge */}
        {sessionsToday > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-3 py-1">
            <span className="text-accent-orange text-xs">🍅</span>
            <span className="text-accent-orange text-xs font-medium">{sessionsToday} hoje</span>
          </div>
        )}

        {/* Membership badge */}
        <div
          className={`hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            user?.membership === "active"
              ? "bg-success/10 border border-success/20 text-success"
              : "bg-accent-red/10 border border-accent-red/20 text-accent-red"
          }`}
        >
          <span>{user?.membership === "active" ? "✅ Ativo" : "⚠️ Inativo"}</span>
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white text-xs font-bold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
