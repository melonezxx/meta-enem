"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star, Zap, X } from "lucide-react";

interface BuyModalProps {
  onClose: () => void;
}

function BuyModal({ onClose }: BuyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card p-8 max-w-md w-full animate-slide-up border border-primary/30 shadow-glow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-elevated transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-text-primary mb-2">
            Simulação de Compra
          </h2>
          <p className="text-text-secondary text-sm">
            Em produção, você seria redirecionado para a Hotmart ou Qlify para finalizar o pagamento.
          </p>
        </div>

        <div className="bg-background-elevated rounded-xl p-4 mb-6 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary text-sm">Plano Completo ENEM</span>
            <span className="text-text-muted text-sm line-through">R$ 297</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-primary font-semibold">Total</span>
            <span className="text-success text-2xl font-bold">R$ 97</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-text-secondary text-xs text-center">
            Clique em &quot;Simular Compra&quot; para ativar o acesso completo demonstrativo.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/obrigado"
            className="btn-success text-center text-base"
          >
            Simular Compra Concluída ✓
          </Link>
          <button onClick={onClose} className="btn-ghost text-center">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-primary text-sm font-medium">
            +5.000 alunos aprovados em 2024
          </span>
          <Star className="w-4 h-4 text-primary fill-primary" />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-text-primary mb-6 leading-tight animate-fade-in animation-delay-100">
          Conquiste sua{" "}
          <span className="gradient-text">nota dos sonhos</span>
          <br />
          no ENEM
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in animation-delay-200">
          O método mais completo e organizado para estudar para o ENEM. Checklists
          inteligentes, anotações, pomodoro, progresso visual e um plano de estudos
          personalizado — tudo em um só lugar.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-10 animate-fade-in animation-delay-300">
          {[
            { value: "5", label: "matérias completas" },
            { value: "130+", label: "tópicos organizados" },
            { value: "1000", label: "nota máxima possível" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-display gradient-text">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-400">
          <button
            onClick={() => setShowModal(true)}
            className="group flex items-center gap-2 bg-gradient-to-r from-primary to-success text-white font-bold text-lg px-8 py-4 rounded-2xl hover:shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Zap className="w-5 h-5 group-hover:animate-bounce" />
            Quero Comprar Agora
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <Link
            href="/login"
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary border border-border hover:border-primary/40 px-8 py-4 rounded-2xl transition-all duration-200 font-medium"
          >
            Já tenho conta →
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-text-muted text-sm animate-fade-in animation-delay-500">
          {[
            "✅ Acesso imediato",
            "🔒 Pagamento seguro",
            "💳 Parcelamento em 12x",
            "♾️ Acesso vitalício",
          ].map((trust) => (
            <span key={trust}>{trust}</span>
          ))}
        </div>

        {/* Hero visual */}
        <div className="mt-16 relative animate-fade-in animation-delay-500">
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
            <div className="card border border-primary/20 overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)]">
              {/* Mock dashboard preview */}
              <div className="bg-background-card p-0">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-background border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-accent-red/60" />
                    <div className="w-3 h-3 rounded-full bg-accent-orange/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="flex-1 bg-background-elevated rounded-md px-3 py-1 text-text-muted text-xs">
                    metaenem.com.br/dashboard
                  </div>
                </div>

                {/* Dashboard preview content */}
                <div className="flex h-72">
                  {/* Fake sidebar */}
                  <div className="w-48 bg-background border-r border-border p-4 hidden md:flex flex-col gap-2">
                    {["Dashboard", "Redação", "Linguagens", "Matemática", "Humanas", "Natureza"].map((item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded-lg text-xs font-medium ${
                          i === 0
                            ? "bg-primary/15 text-primary border border-primary/20"
                            : "text-text-muted hover:bg-background-elevated"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Fake content */}
                  <div className="flex-1 p-6">
                    <div className="text-left mb-4">
                      <div className="text-text-secondary text-xs mb-1">Seu progresso geral</div>
                      <div className="h-3 bg-background-elevated rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-success rounded-full w-2/5 transition-all" />
                      </div>
                      <div className="text-text-muted text-xs mt-1">42% concluído</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Redação", pct: 60, color: "from-purple-500 to-purple-700" },
                        { name: "Linguagens", pct: 45, color: "from-blue-500 to-blue-700" },
                        { name: "Matemática", pct: 30, color: "from-emerald-500 to-emerald-700" },
                        { name: "Humanas", pct: 55, color: "from-amber-500 to-amber-700" },
                      ].map((subject) => (
                        <div key={subject.name} className="bg-background-elevated rounded-xl p-3">
                          <div className="text-text-secondary text-xs mb-2">{subject.name}</div>
                          <div className="h-2 bg-background rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${subject.color} rounded-full`}
                              style={{ width: `${subject.pct}%` }}
                            />
                          </div>
                          <div className="text-text-muted text-xs mt-1">{subject.pct}%</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex gap-2">
                      {["✅ Função Afim", "✅ Redação", "📌 Genética"].map((item) => (
                        <div key={item} className="bg-background-elevated rounded-lg px-2 py-1 text-xs text-text-muted">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <BuyModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
