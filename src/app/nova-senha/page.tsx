"use client";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { createClient } from "@/utils/supabase/client";

function NovaSenhaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const updatePassword = useStore((s) => s.updatePassword);

  const [email, setEmail] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    const loadRecoverySession = async () => {
      try {
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw exchangeError;
          }
        }

        const { data, error: sessionError } = await supabase.auth.getSession();

        if (cancelled) return;

        if (sessionError || !data.session) {
          setError("Link inválido ou expirado. Solicite uma nova recuperação de senha.");
        } else {
          setEmail(data.session.user.email || "");
        }
      } catch {
        if (!cancelled) {
          setError("Link inválido ou expirado. Solicite uma nova recuperação de senha.");
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !cancelled) {
        setEmail(session.user.email || "");
        setError("");
        setCheckingSession(false);
      }
    });

    loadRecoverySession();

    return () => {
      cancelled = true;
      authListener.subscription.unsubscribe();
    };
  }, [code]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (checkingSession || !email) {
      setError("Link inválido ou expirado. Solicite uma nova recuperação de senha.");
      return;
    }

    if (password.length < 6) {
      setError("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const result = await updatePassword(password);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || "Erro ao redefinir a senha.");
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">Senha Redefinida!</h2>
        <p className="text-text-secondary text-sm">
          Sua senha foi alterada com sucesso. Você será redirecionado para o login em instantes...
        </p>
        <Link href="/login" className="btn-primary w-full block mt-6 py-3.5">
          Ir para o Login Agora
        </Link>
      </div>
    );
  }

  if (checkingSession) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!email) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-xl px-4 py-3 text-left">
          <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
          <p className="text-accent-red text-sm">
            {error || "Link inválido ou expirado. Solicite uma nova recuperação de senha."}
          </p>
        </div>
        <Link href="/recuperar-senha" className="btn-primary w-full block py-3.5">
          Solicitar novo link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="mb-4">
        <p className="text-text-secondary text-sm">
          Redefinindo senha para: <strong className="text-text-primary">{email}</strong>
        </p>
      </div>

      <div>
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Nova Senha
        </label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field pr-12"
            placeholder="Mínimo 6 caracteres"
            required
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
          Confirmar Nova Senha
        </label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field pr-12"
            placeholder="Mínimo 6 caracteres"
            required
          />
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
        disabled={loading || !password || !confirmPassword}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Salvando...
          </>
        ) : (
          "Salvar Nova Senha"
        )}
      </button>
    </form>
  );
}

export default function NovaSenhaPage() {
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
            Criar Nova Senha
          </h1>
          <p className="text-text-secondary">
            Digite sua nova senha de acesso abaixo.
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 border border-border/80 shadow-card">
          <Suspense fallback={
            <div className="flex justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          }>
            <NovaSenhaForm />
          </Suspense>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link href="/login" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
              Cancelar e voltar para Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
