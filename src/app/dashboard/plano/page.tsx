"use client";
import { weekPlan } from "@/lib/data";
import { Clock, BookOpen, Lightbulb } from "lucide-react";

const studyTips: Record<string, string[]> = {
  Redação: [
    "Escreva pelo menos 1 redação por semana",
    "Leia editoriais de jornais diariamente",
    "Monte um banco de repertório sociocultural",
  ],
  Matemática: [
    "Resolva exercícios anteriores do ENEM",
    "Não decore fórmulas — entenda a lógica",
    "Foque em geometria e funções",
  ],
  Linguagens: [
    "Leia obras literárias dos movimentos cobrados",
    "Pratique interpretação de texto todos os dias",
    "Revise gramática através de textos, não listas",
  ],
  "Ciências Humanas": [
    "Conecte acontecimentos históricos ao presente",
    "Use mapas mentais para sociologia e filosofia",
    "Leia charges e analise o contexto político",
  ],
  "Ciências da Natureza": [
    "Relacione os conteúdos com o cotidiano",
    "Faça resumos com equações e reações",
    "Priorize genética, ecologia e física ondulatória",
  ],
};

const subjectColors: Record<string, string> = {
  Redação: "#8B5CF6",
  Linguagens: "#3B82F6",
  Matemática: "#10B981",
  "Ciências Humanas": "#F59E0B",
  "Ciências da Natureza": "#EC4899",
  "Revisão geral": "#6B7280",
  Simulado: "#6B7280",
  Descanso: "#374151",
  "Revisão leve": "#374151",
};

export default function PlanoPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display text-text-primary mb-1">
          Plano de Estudos 📅
        </h2>
        <p className="text-text-secondary">
          Cronograma semanal sugerido para cobrir todas as matérias do ENEM.
        </p>
      </div>

      {/* Total hours */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card">
          <Clock className="w-5 h-5 text-primary" />
          <div className="text-3xl font-bold font-display text-text-primary">
            {weekPlan.reduce((a, d) => a + d.hours, 0)}h
          </div>
          <div className="text-text-muted text-xs">Horas Semanais</div>
        </div>
        <div className="stat-card">
          <BookOpen className="w-5 h-5 text-success" />
          <div className="text-3xl font-bold font-display text-text-primary">5</div>
          <div className="text-text-muted text-xs">Matérias</div>
        </div>
        <div className="stat-card">
          <span className="text-2xl">📅</span>
          <div className="text-3xl font-bold font-display text-text-primary">7</div>
          <div className="text-text-muted text-xs">Dias</div>
        </div>
        <div className="stat-card">
          <span className="text-2xl">🎯</span>
          <div className="text-3xl font-bold font-display text-text-primary">1</div>
          <div className="text-text-muted text-xs">Simulado/semana</div>
        </div>
      </div>

      {/* Weekly schedule */}
      <div className="card p-6">
        <h3 className="font-display font-semibold text-text-primary mb-5">
          Cronograma Semanal
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {weekPlan.map((day) => {
            const isWeekend = day.short === "Sáb" || day.short === "Dom";
            return (
              <div
                key={day.day}
                className={`rounded-xl p-4 border transition-all duration-200 ${
                  isWeekend
                    ? "border-border bg-background-elevated/50"
                    : "border-border bg-background-elevated hover:border-primary/30"
                }`}
              >
                <div className="font-display font-bold text-text-primary text-sm mb-1">
                  {day.short}
                </div>
                <div className="text-text-muted text-xs mb-3">
                  {day.hours}h
                </div>
                <div className="space-y-1.5">
                  {day.subjects.map((subject) => (
                    <div
                      key={subject}
                      className="text-xs px-2 py-1 rounded-lg font-medium"
                      style={{
                        backgroundColor: `${subjectColors[subject] || "#374151"}20`,
                        color: subjectColors[subject] || "#9CA3AF",
                        border: `1px solid ${subjectColors[subject] || "#374151"}30`,
                      }}
                    >
                      {subject}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips by subject */}
      <div>
        <h3 className="font-display font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent-orange" />
          Dicas de Estudo por Matéria
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(studyTips).map(([subject, tips]) => {
            const color = subjectColors[subject] || "#6B7280";
            return (
              <div
                key={subject}
                className="card p-5"
                style={{ borderColor: `${color}30` }}
              >
                <h4 className="font-display font-semibold mb-3 text-sm" style={{ color }}>
                  {subject}
                </h4>
                <ul className="space-y-2">
                  {tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2 text-text-secondary text-sm">
                      <span style={{ color }} className="flex-shrink-0">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Study tips */}
      <div className="card p-6 border border-primary/20">
        <h3 className="font-display font-semibold text-text-primary mb-4">
          📌 Princípios do Estudo Eficiente
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Estudo Ativo",
              desc: "Escreva, resuma e explique em voz alta ao invés de apenas ler.",
            },
            {
              title: "Revisão Espaçada",
              desc: "Revise os conteúdos em intervalos crescentes para fixar na memória.",
            },
            {
              title: "Prática Deliberada",
              desc: "Foque nos pontos fracos, não naqueles que você já domina.",
            },
            {
              title: "Elimine Distrações",
              desc: "Use o Pomodoro e coloque o celular em modo silencioso durante os estudos.",
            },
          ].map((principle) => (
            <div key={principle.title} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="text-text-primary font-medium text-sm">{principle.title}</div>
                <div className="text-text-secondary text-xs mt-0.5">{principle.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
