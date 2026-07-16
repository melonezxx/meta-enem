"use client";
import { useState } from "react";
import { CheckCircle2, X, Zap } from "lucide-react";
import Link from "next/link";

interface BuyModalProps {
  onClose: () => void;
  planName: string;
  price: string;
}

function BuyModal({ onClose, planName, price }: BuyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative card p-8 max-w-md w-full animate-slide-up border border-primary/30 shadow-glow">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-elevated transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-success flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-text-primary mb-2">Simular Compra</h2>
          <p className="text-text-secondary text-sm">
            Em produção, você seria redirecionado para a plataforma de pagamento (Hotmart / Qlify).
          </p>
        </div>
        <div className="bg-background-elevated rounded-xl p-4 mb-6 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary text-sm">{planName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-primary font-semibold">Total</span>
            <span className="text-success text-2xl font-bold">{price}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/obrigado" className="btn-success text-center text-base">
            Simular Compra Concluída ✓
          </Link>
          <button onClick={onClose} className="btn-ghost text-center">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [modal, setModal] = useState<{ name: string; price: string } | null>(null);

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-orange/10 border border-accent-orange/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-accent-orange" />
            <span className="text-accent-orange text-sm font-medium">Oferta por tempo limitado</span>
          </div>
          <h2 className="section-title mb-4">
            O plano mais completo,{" "}
            <span className="gradient-text">resultados extraordinários</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Tudo que você precisa para passar no ENEM em um único plano.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative card p-8 flex flex-col border-primary/40 shadow-glow ring-1 ring-primary/20">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-primary to-success text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                ⭐ ÚNICO PLANO
              </div>
            </div>

            <div className="mb-6 mt-4">
              <h3 className="font-display font-bold text-text-primary text-xl mb-1">
                Plano Completo
              </h3>
              <p className="text-text-muted text-sm">Para quem quer passar com excelência</p>
            </div>

            <div className="mb-6">
              <div className="text-text-muted text-sm line-through mb-1">
                De R$ 297
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold font-display text-text-primary">
                  R$ 97
                </span>
                <span className="text-text-muted"> único</span>
              </div>
              <div className="mt-2 inline-flex items-center gap-1 bg-success/10 border border-success/20 rounded-full px-3 py-1">
                <span className="text-success text-xs font-medium">
                  🎉 Economize R$ 200 hoje
                </span>
              </div>
            </div>

            <div className="flex-1 mb-6">
              <div className="space-y-3">
                {[
                  "Todas as 5 matérias",
                  "Checklists inteligentes",
                  "Progresso visual com gráficos",
                  "Pomodoro integrado",
                  "Plano de estudos personalizado",
                  "Anotações por tópico",
                  "Favoritos e marcadores",
                  "Acesso vitalício",
                  "Suporte prioritário",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setModal({ name: "Plano Completo", price: "R$ 97" })}
              className="btn-success"
            >
              Quero Comprar
            </button>
          </div>
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-background-card border border-border rounded-2xl px-6 py-4">
            <span className="text-3xl">🛡️</span>
            <div className="text-left">
              <div className="text-text-primary font-semibold">Garantia de 7 dias</div>
              <div className="text-text-muted text-sm">Não gostou? Devolvemos seu dinheiro, sem perguntas.</div>
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <BuyModal
          onClose={() => setModal(null)}
          planName={modal.name}
          price={modal.price}
        />
      )}
    </section>
  );
}
