"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CadastroPage() {
  const router = useRouter();
  const register = useStore((s) => s.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const result = await register(name, email, password);
    setLoading(false);

    if (!result.success) {
      setError(result.error || "Erro ao criar conta.");
    } else {
      router.push("/dashboard");
    }
  };

  const requirements = [
    { label: "Mínimo 6 caracteres", met: password.length >= 6 },
    { label: "Senha confirmada", met: password === confirm && confirm.length > 0 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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
            Crie sua conta 🚀
          </h1>
          <p className="text-text-secondary">
            Comece sua jornada rumo à aprovação no ENEM.
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 border border-border/80 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                placeholder="Seu nome"
                required
                id="cadastro-name"
              />
            </div>

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
                id="cadastro-email"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Mínimo 6 caracteres"
                  required
                  id="cadastro-password"
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

            <div>
              <label className="block text-text-secondary text-sm font-medium mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="input-field"
                placeholder="Repita a senha"
                required
                id="cadastro-confirm"
              />
            </div>

            {/* Password requirements */}
            {password.length > 0 && (
              <div className="space-y-1.5">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-2">
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        req.met ? "text-success" : "text-text-muted"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        req.met ? "text-success" : "text-text-muted"
                      }`}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                <p className="text-accent-red text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-success w-full flex items-center justify-center gap-2 py-3.5 mt-2"
              id="cadastro-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta Grátis"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-text-secondary text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Fazer login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-text-muted text-xs mt-4">
          Ao criar uma conta, você concorda com nossos{" "}
          <a href="#" className="text-text-secondary hover:text-text-primary">
            Termos de Uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-text-secondary hover:text-text-primary">
            Política de Privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
