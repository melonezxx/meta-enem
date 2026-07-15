"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { subjects } from "@/lib/data";
import {
  LayoutDashboard,
  BarChart3,
  Timer,
  CalendarDays,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
];

const subjectNavItems = subjects.map((s) => ({
  label: s.shortTitle,
  href: `/dashboard/${s.id}`,
  icon: <span className="text-base leading-none">{s.icon}</span>,
  color: s.color,
}));

const toolNavItems = [
  { label: "Progresso", href: "/dashboard/progresso", icon: <BarChart3 className="w-4 h-4" /> },
  { label: "Pomodoro", href: "/dashboard/pomodoro", icon: <Timer className="w-4 h-4" /> },
  { label: "Plano de Estudos", href: "/dashboard/plano", icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Favoritos", href: "/dashboard/favoritos", icon: <Bookmark className="w-4 h-4" /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, sidebarOpen, setSidebarOpen } = useStore();

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-30 flex flex-col bg-background border-r border-border transition-all duration-300 ease-in-out
          ${sidebarOpen ? "w-64" : "w-16"}
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border flex-shrink-0">
          {sidebarOpen && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-base text-text-primary">
                Meta<span className="gradient-text">ENEM</span>
              </span>
            </Link>
          )}
          {!sidebarOpen && (
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center mx-auto">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-background-elevated transition-colors hidden lg:flex ${!sidebarOpen ? "hidden" : ""}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {/* Main */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "nav-link-active" : "nav-link"}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          ))}

          {/* Matérias */}
          {sidebarOpen && (
            <div className="px-4 pt-4 pb-2">
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                Matérias
              </span>
            </div>
          )}
          {!sidebarOpen && <div className="border-t border-border my-2" />}

          {subjectNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "nav-link-active" : "nav-link"}
              title={!sidebarOpen ? item.label : undefined}
              style={
                isActive(item.href)
                  ? { color: item.color, backgroundColor: `${item.color}15`, borderColor: `${item.color}30` }
                  : {}
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          ))}

          {/* Tools */}
          {sidebarOpen && (
            <div className="px-4 pt-4 pb-2">
              <span className="text-text-muted text-xs font-semibold uppercase tracking-wider">
                Ferramentas
              </span>
            </div>
          )}
          {!sidebarOpen && <div className="border-t border-border my-2" />}

          {toolNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "nav-link-active" : "nav-link"}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div className="border-t border-border p-3 flex-shrink-0">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-text-primary text-sm font-medium truncate">
                  {user?.name || "Usuário"}
                </div>
                <div className="text-text-muted text-xs truncate">{user?.email}</div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors"
                title="Sair"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full flex justify-center p-1.5 rounded-lg text-text-muted hover:text-accent-red hover:bg-accent-red/10 transition-colors"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Collapse button when closed on desktop */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed left-16 top-4 z-40 hidden lg:flex p-1.5 rounded-r-lg bg-background-card border border-l-0 border-border text-text-muted hover:text-text-primary transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
