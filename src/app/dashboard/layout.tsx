"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Link from "next/link";
import { Lock, ShoppingCart } from "lucide-react";

function AccessBlockedScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-accent-red" />
        </div>
        <h2 className="text-2xl font-bold font-display text-text-primary mb-3">
          Acesso Bloqueado
        </h2>
        <p className="text-text-secondary mb-6">
          Para acessar o dashboard e todo o conteúdo, você precisa ter um plano ativo.
          Ative seu acesso agora e comece a estudar em minutos.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/#pricing"
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-success text-white font-bold px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Ativar Acesso
          </Link>
          <Link
            href="/obrigado"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Já comprei → Ativar minha conta
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, sidebarOpen } = useStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-h-0 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-16"
        }`}
      >
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto">
          {user.membership === "active" ? (
            children
          ) : (
            <AccessBlockedScreen />
          )}
        </main>
      </div>
    </div>
  );
}
