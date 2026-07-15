"use client";
import { CheckCircle2, Brain, Timer, BookMarked, BarChart3, Star, Target, Zap } from "lucide-react";

const features = [
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Checklists Inteligentes",
    description: "Marque cada tópico conforme você estuda. Seu progresso é salvo automaticamente.",
    color: "text-success",
    bg: "bg-success/10 border-success/20",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Progresso Visual",
    description: "Gráficos detalhados por matéria e módulo. Veja exatamente onde você está.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: "Pomodoro Integrado",
    description: "Estude com foco máximo usando o timer Pomodoro 25/5 embutido na plataforma.",
    color: "text-accent-orange",
    bg: "bg-accent-orange/10 border-accent-orange/20",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Anotações por Tópico",
    description: "Escreva suas anotações diretamente em cada tópico. Tudo salvo automaticamente.",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10 border-accent-purple/20",
  },
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: "Favoritos & Marcadores",
    description: "Marque os tópicos mais difíceis como favoritos para revisão rápida.",
    color: "text-accent-pink",
    bg: "bg-accent-pink/10 border-accent-pink/20",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Dificuldade por Tópico",
    description: "Classifique cada tópico como Fácil, Médio ou Difícil para priorizar seus estudos.",
    color: "text-accent-orange",
    bg: "bg-accent-orange/10 border-accent-orange/20",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "Plano de Estudos",
    description: "Plano semanal estruturado com todas as matérias distribuídas de forma otimizada.",
    color: "text-success",
    bg: "bg-success/10 border-success/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Acesso Imediato",
    description: "Após a compra, acesso instantâneo a todo o conteúdo sem esperar.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-border" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-success" />
            <span className="text-success text-sm font-medium">Tudo que você precisa para passar</span>
          </div>
          <h2 className="section-title mb-4">
            Uma plataforma completa,{" "}
            <span className="gradient-text">um único objetivo</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Cada funcionalidade foi criada para maximizar sua produtividade nos estudos
            e transformar sua preparação para o ENEM.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="card-hover p-6 group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-200`}
              >
                {feature.icon}
              </div>
              <h3 className="font-display font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
