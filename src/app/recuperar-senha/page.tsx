"use client";
import { useState } from "react";
import Link from "next/link";
import { BookOpen, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function RecuperarSenhaPage() {
  const resetPasswordRequest = useStore((s) => s.resetPasswordRequest);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    
    const result = await resetPasswordRequest(email);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || "Erro ao solicitar recuperação.");
    } else {
      setSuccess(true);
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
            Recuperar Senha
          </h1>
          <p className="text-text-secondary">
            Digite seu e-mail para receber as instruções.
          </p>
        </div>

        {/* Card */}
        <div className="card p-8 border border-border/80 shadow-card">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">E-mail Enviado!</h2>
              <p className="text-text-secondary text-sm">
                Enviamos as instruções de recuperação para <strong>{email}</strong>.
                Por favor, verifique sua caixa de entrada e pasta de spam.
              </p>

              <Link href="/login" className="btn-primary w-full block mt-6 py-3.5">
                Voltar para o Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-text-secondary text-sm font-medium mb-2">
                  E-mail cadastrado
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-accent-red/10 border border-accent-red/20 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0" />
                  <p className="text-accent-red text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Link"
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-6 pt-6 border-t border-border text-center">
              <Link href="/login" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                Voltar para o Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
