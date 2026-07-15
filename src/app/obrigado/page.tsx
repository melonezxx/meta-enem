"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ObrigadoPage() {
  const router = useRouter();
  const { activateMembership, user } = useStore();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    // Activate membership
    activateMembership();
    
    // Countdown to redirect
    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activateMembership, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-success/10 rounded-full blur-3xl" />

      <div className="relative text-center max-w-lg mx-auto">
        {/* Success animation */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-success/20 border-2 border-success/40 flex items-center justify-center mx-auto animate-pulse-slow">
            <div className="w-20 h-20 rounded-full bg-success/30 border-2 border-success/60 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-success" />
            </div>
          </div>
          {/* Confetti dots */}
          {["top-0 left-8", "top-4 right-4", "-top-2 left-1/2", "top-8 -left-4", "top-2 right-8"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-3 h-3 rounded-full animate-bounce`}
              style={{
                backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"][i],
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>

        <h1 className="text-4xl font-bold font-display text-text-primary mb-4">
          🎉 Compra Confirmada!
        </h1>
        <p className="text-text-secondary text-lg mb-2">
          {user ? `Olá, ${user.name}!` : "Bem-vindo!"} Seu acesso está ativo.
        </p>
        <p className="text-text-muted mb-8">
          Sua conta foi ativada com sucesso. Agora você tem acesso completo
          a todas as 5 matérias, módulos e recursos da plataforma Meta ENEM.
        </p>

        {/* What's unlocked */}
        <div className="card p-6 mb-8 text-left">
          <h2 className="font-display font-semibold text-text-primary mb-4 text-center">
            ✅ O que está disponível agora:
          </h2>
          <div className="space-y-3">
            {[
              "5 matérias completas com 130+ tópicos",
              "Checklists inteligentes com salvamento automático",
              "Progresso visual com gráficos",
              "Timer Pomodoro integrado",
              "Plano de estudos semanal",
              "Anotações e marcação de dificuldade",
              "Favoritos e marcadores",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center gap-4">
          <p className="text-text-muted text-sm">
            Redirecionando para o dashboard em{" "}
            <span className="text-primary font-bold text-lg">{countdown}</span> segundos...
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="group flex items-center gap-2 btn-success"
          >
            Ir para o Dashboard agora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
