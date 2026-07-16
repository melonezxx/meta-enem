"use client";
import { useStore } from "@/lib/store";
import { subjects } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function ProgressoPage() {
  const { completedTopics, topicDifficulties, weeklyActivity } = useStore();

  // Per-subject data
  const subjectData = subjects.map((s) => {
    const topics = s.modules.flatMap((m) => m.topics);
    const done = topics.filter((t) => completedTopics[t.id]).length;
    return {
      name: s.shortTitle,
      pct: topics.length > 0 ? Math.round((done / topics.length) * 100) : 0,
      done,
      total: topics.length,
      color: s.color,
      icon: s.icon,
    };
  });

  const totalTopics = subjectData.reduce((a, s) => a + s.total, 0);
  const totalDone = subjectData.reduce((a, s) => a + s.done, 0);
  const overallPct = totalTopics > 0 ? Math.round((totalDone / totalTopics) * 100) : 0;

  // Difficulty breakdown
  const easyCount = Object.values(topicDifficulties).filter((d) => d === "easy").length;
  const mediumCount = Object.values(topicDifficulties).filter((d) => d === "medium").length;
  const hardCount = Object.values(topicDifficulties).filter((d) => d === "hard").length;

  // Weekly activity (last 14 days)
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().split("T")[0];
    const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    return {
      day: `${d.getDate()}/${d.getMonth() + 1}`,
      shortDay: dayNames[d.getDay()],
      minutes: weeklyActivity[key] || 0,
    };
  });

  const totalMinutes = last14Days.reduce((a, d) => a + d.minutes, 0);
  const activeDays = last14Days.filter((d) => d.minutes > 0).length;

  const tooltipStyle = {
    contentStyle: {
      background: "#111827",
      border: "1px solid #1F2937",
      borderRadius: "8px",
      color: "#F9FAFB",
    },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-text-primary mb-1">
          Meu Progresso 📊
        </h2>
        <p className="text-text-secondary">
          Acompanhe sua evolução em cada matéria e ao longo do tempo.
        </p>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Progresso Geral", value: `${overallPct}%`, icon: "📈", color: "text-primary" },
          { label: "Tópicos Concluídos", value: totalDone, icon: "✅", color: "text-success" },
          { label: "Dias Ativos (14d)", value: activeDays, icon: "🔥", color: "text-accent-orange" },
          { label: "Minutos Estudados", value: totalMinutes, icon: "⏱️", color: "text-accent-purple" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <span className="text-2xl">{s.icon}</span>
            <div className={`text-3xl font-bold font-display ${s.color}`}>{s.value}</div>
            <div className="text-text-muted text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Subject progress bars */}
      <div className="card p-6">
        <h3 className="font-display font-semibold text-text-primary mb-5">
          Progresso por Matéria
        </h3>
        <div className="space-y-4">
          {subjectData.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span>{s.icon}</span>
                  <span className="text-text-secondary text-sm font-medium">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted text-xs">
                    {s.done}/{s.total}
                  </span>
                  <span
                    className="text-sm font-bold font-display w-10 text-right"
                    style={{ color: s.color }}
                  >
                    {s.pct}%
                  </span>
                </div>
              </div>
              <div className="h-3 bg-background-elevated rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart - subject comparison */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-text-primary mb-4">
            Comparativo de Matérias
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectData} barSize={36}>
              <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                {...tooltipStyle}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(v: any) => [`${v}%`, "Progresso"]}
              />
              <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
                {subjectData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Difficulty breakdown */}
        <div className="card p-6">
          <h3 className="font-display font-semibold text-text-primary mb-4">
            Distribuição de Dificuldade
          </h3>
          <div className="space-y-4">
            {[
              { label: "Fácil", count: easyCount, color: "#10B981", total: easyCount + mediumCount + hardCount },
              { label: "Médio", count: mediumCount, color: "#F59E0B", total: easyCount + mediumCount + hardCount },
              { label: "Difícil", count: hardCount, color: "#EF4444", total: easyCount + mediumCount + hardCount },
            ].map((item) => {
              const pct = item.total > 0 ? Math.round((item.count / item.total) * 100) : 0;
              return (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-text-secondary text-sm">{item.label}</span>
                    <span className="text-text-muted text-xs">{item.count} tópicos ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-background-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
            {easyCount + mediumCount + hardCount === 0 && (
              <p className="text-text-muted text-sm text-center py-4">
                Nenhum tópico classificado ainda. Acesse as matérias e classifique a dificuldade de cada tópico.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Line chart - 14-day activity */}
      <div className="card p-6">
        <h3 className="font-display font-semibold text-text-primary mb-4">
          Atividade dos Últimos 14 Dias (minutos)
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={last14Days}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis dataKey="day" tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              {...tooltipStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(v: any) => [`${v} min`, "Estudo"]}
            />
            <Line
              type="monotone"
              dataKey="minutes"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={{ fill: "#3B82F6", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: "#60A5FA" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
