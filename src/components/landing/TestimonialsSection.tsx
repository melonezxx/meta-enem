"use client";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Aprovada em Medicina — UFMG 2024",
    avatar: "MC",
    color: "from-purple-500 to-purple-700",
    rating: 5,
    text: "O Meta ENEM mudou minha preparação completamente. Com os checklists e o progresso visual, eu sabia exatamente o que ainda precisava estudar. Consegui 960 pontos na redação!",
  },
  {
    name: "Rafael Mendes",
    role: "Aprovado em Engenharia — USP 2024",
    avatar: "RM",
    color: "from-blue-500 to-blue-700",
    rating: 5,
    text: "A organização por módulos me ajudou a cobrir tudo sem ficar perdido. O pomodoro integrado foi um diferencial enorme para manter o foco nos dias difíceis.",
  },
  {
    name: "Juliana Santos",
    role: "Aprovada em Direito — PUC-SP 2024",
    avatar: "JS",
    color: "from-emerald-500 to-emerald-700",
    rating: 5,
    text: "Nunca tinha conseguido organizar meus estudos de Humanas até usar o Meta ENEM. O plano semanal e as anotações por tópico foram essenciais para minha aprovação.",
  },
  {
    name: "Lucas Ferreira",
    role: "Aprovado em Computação — UNICAMP 2024",
    avatar: "LF",
    color: "from-amber-500 to-amber-700",
    rating: 5,
    text: "A marcação de dificuldade por tópico foi genial. Eu focava mais tempo nos assuntos difíceis e passava rápido pelos que já dominava. Estratégia que funcionou!",
  },
  {
    name: "Ana Beatriz Lima",
    role: "Aprovada em Arquitetura — FAU-USP 2024",
    avatar: "AL",
    color: "from-pink-500 to-pink-700",
    rating: 5,
    text: "Usava o favoritos para marcar os tópicos que ia revisar na véspera. Simples mas incrivelmente eficaz. Recomendo para qualquer vestibulando sério.",
  },
  {
    name: "Pedro Alves",
    role: "Aprovado em Medicina — UNIFESP 2024",
    avatar: "PA",
    color: "from-teal-500 to-teal-700",
    rating: 5,
    text: "Em 6 meses de Meta ENEM, sai de 680 para 820 pontos. A plataforma me deu a visão clara de onde eu estava e o que precisava melhorar. Melhor investimento da preparação.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-elevated/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            Alunos que{" "}
            <span className="gradient-text">conquistaram a aprovação</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Histórias reais de estudantes que usaram o Meta ENEM para conquistar
            sua vaga na universidade dos sonhos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-hover p-6 flex flex-col gap-4">
              <Quote className="w-8 h-8 text-primary/40" />

              <p className="text-text-secondary leading-relaxed flex-1 text-sm">
                &quot;{t.text}&quot;
              </p>

              {/* Rating */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-orange fill-accent-orange" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-text-primary font-semibold text-sm">{t.name}</div>
                  <div className="text-text-muted text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
