"use client";
import Link from "next/link";
import { BookOpen, MessageCircle, Share2, PlayCircle, Mail } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-text-primary">
                Meta<span className="gradient-text">ENEM</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              A plataforma definitiva para quem quer passar no ENEM com excelência.
              Organize seus estudos, acompanhe seu progresso e conquiste sua nota.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: <MessageCircle className="w-4 h-4" />, label: "Instagram" },
                { icon: <Share2 className="w-4 h-4" />, label: "Twitter" },
                { icon: <PlayCircle className="w-4 h-4" />, label: "YouTube" },
                { icon: <Mail className="w-4 h-4" />, label: "E-mail" },
              ].map((social) => (
                <button
                  key={social.label}
                  className="w-9 h-9 rounded-lg bg-background-elevated border border-border text-text-secondary hover:text-text-primary hover:border-primary/40 flex items-center justify-center transition-all duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">Plataforma</h4>
            <div className="space-y-2.5">
              {["Matérias", "Plano de Estudos", "Pomodoro", "Progresso", "Favoritos"].map((link) => (
                <a key={link} href="#" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">Suporte</h4>
            <div className="space-y-2.5">
              {["FAQ", "Contato", "Política de Privacidade", "Termos de Uso", "Reembolso"].map((link) => (
                <a key={link} href="#" className="block text-text-secondary hover:text-text-primary text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © 2024 MetaENEM. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-text-muted hover:text-text-primary text-sm transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="text-text-muted hover:text-text-primary text-sm transition-colors">
              Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
