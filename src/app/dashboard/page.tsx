"use client";
import { useStore } from "@/lib/store";
import { subjects } from "@/lib/data";
import Link from "next/link";
import {
  BarChart3,
  Timer,
  CalendarDays,
  BookOpen,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";


function OverallProgressRing({ pct }: { pct: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#1F2937"
          strokeWidth="10"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold font-display gradient-text">{pct}%</div>
        <div className="text-text-muted text-xs">concluído</div>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  const { user, completedTopics, pomodoroSessions, pomodoroDate, weeklyActivity } = useStore();

  const today = new Date().toISOString().split("T")[0];
  const sessionsToday = pomodoroDate === today ? pomodoroSessions : 0;

  // Calculate overall progress
  const allTopics = subjects.flatMap((s) => s.modules.flatMap((m) => m.topics));
  const totalTopics = allTopics.length;
  const completedCount = allTopics.filter((t) => completedTopics[t.id]).length;
  const overallPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;

  // Per-subject progress
  const subjectData = subjects.map((s) => {
    const topics = s.modules.flatMap((m) => m.topics);
    const done = topics.filter((t) => completedTopics[t.id]).length;
    return {
      name: s.shortTitle,
      pct: topics.length > 0 ? Math.round((done / topics.length) * 100) : 0,
      done,
      total: topics.length,
      color: s.color,
      href: `/dashboard/${s.id}`,
      icon: s.icon,
    };
  });

  // Weekly activity chart data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().split("T")[0];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return {
      day: dayNames[d.getDay()],
      minutes: weeklyActivity[key] || 0,
    };
  });

  const firstName = user?.name?.split(" ")[0] || "Estudante";

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold font-display text-text-primary">
          Olá, {firstName}! 👋
        </h2>
        <p className="text-text-secondary">
          {overallPct === 0
            ? "Vamos começar sua jornada de estudos hoje?"
            : `Você já completou ${completedCount} de ${totalTopics} tópicos. Continue assim!`}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Progresso Geral",
            value: `${overallPct}%`,
            icon: <TrendingUp className="w-5 h-5" />,
            color: "text-primary",
            bg: "bg-primary/10",
          },
          {
            label: "Tópicos Concluídos",
            value: completedCount,
            icon: <CheckCircle2 className="w-5 h-5" />,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Pomodoros Hoje",
            value: sessionsToday,
            icon: <Timer className="w-5 h-5" />,
            color: "text-accent-orange",
            bg: "bg-accent-orange/10",
          },
          {
            label: "Matérias Ativas",
            value: subjects.length,
            icon: <BookOpen className="w-5 h-5" />,
            color: "text-accent-purple",
            bg: "bg-accent-purple/10",
          },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div className="text-3xl font-bold font-display text-text-primary">
              {stat.value}
            </div>
            <div className="text-text-muted text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall progress ring */}
        <div className="card p-6 flex flex-col items-center gap-4">
          <h3 className="font-display font-semibold text-text-primary self-start">
            Progresso Geral
          </h3>
          <OverallProgressRing pct={overallPct} />
          <p className="text-text-muted text-sm text-center">
            {completedCount} de {totalTopics} tópicos concluídos
          </p>
        </div>

        {/* Weekly activity chart */}
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-display font-semibold text-text-primary mb-4">
            Atividade da Semana (minutos)
          </h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={last7Days} barSize={32}>
              <XAxis
                dataKey="day"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #1F2937",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => [`${v} min`, "Tempo"]}
              />
              <Bar dataKey="minutes" radius={[6, 6, 0, 0]}>
                {last7Days.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.day === ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][new Date().getDay()]
                        ? "#3B82F6"
                        : "#1F2937"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject cards */}
      <div>
        <h3 className="font-display font-semibold text-text-primary mb-4">
          Suas Matérias
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectData.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="card-hover p-4 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="font-display font-semibold text-text-primary text-sm">
                    {s.name}
                  </span>
                </div>
                <span
                  className="text-sm font-bold font-display"
                  style={{ color: s.color }}
                >
                  {s.pct}%
                </span>
              </div>
              <div className="h-2 bg-background-elevated rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-text-muted text-xs">{s.done} concluídos</span>
                <span className="text-text-muted text-xs">{s.total - s.done} restantes</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-display font-semibold text-text-primary mb-4">
          Acesso Rápido
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              href: "/dashboard/pomodoro",
              icon: <Timer className="w-5 h-5" />,
              title: "Iniciar Pomodoro",
              desc: "Foque por 25 minutos",
              color: "text-accent-orange",
              bg: "bg-accent-orange/10",
            },
            {
              href: "/dashboard/plano",
              icon: <CalendarDays className="w-5 h-5" />,
              title: "Ver Plano Semanal",
              desc: "Sua agenda de estudos",
              color: "text-primary",
              bg: "bg-primary/10",
            },
            {
              href: "/dashboard/progresso",
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Ver Progresso",
              desc: "Gráficos detalhados",
              color: "text-success",
              bg: "bg-success/10",
            },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="card-hover p-4 flex items-center gap-4 group"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}
              >
                {action.icon}
              </div>
              <div>
                <div className="font-semibold text-text-primary text-sm">{action.title}</div>
                <div className="text-text-muted text-xs">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
