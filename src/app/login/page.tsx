"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error || "Erro ao fazer login.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-2xl text-text-primary">
              Meta<span className="gradient-text">ENEM</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold font-display text-text-primary mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-text-secondary">
            Entre na sua conta para continuar estudando.
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 border border-border/80 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="seu@email.com"
                required
                id="login-email"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-text-secondary text-sm font-medium">
                  Senha
                </label>
                <Link href="/recuperar-senha" className="text-primary text-sm hover:underline">
                  Esqueci a senha
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="••••••••"
                  required
                  id="login-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                <p className="text-accent-red text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
              id="login-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar na Conta"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-text-secondary text-sm">
              Não tem conta?{" "}
              <Link href="/cadastro" className="text-primary hover:underline font-medium">
                Criar conta grátis
              </Link>
            </p>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <p className="text-text-muted text-xs text-center">
            💡 <strong className="text-text-secondary">Demo:</strong> Crie uma conta em{" "}
            <Link href="/cadastro" className="text-primary hover:underline">
              /cadastro
            </Link>{" "}
            e depois simule a compra para ativar o acesso completo.
          </p>
        </div>
      </div>
    </div>
  );
}
