"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-text-primary">
              Meta<span className="gradient-text">ENEM</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="btn-ghost text-sm">Recursos</a>
            <a href="#subjects" className="btn-ghost text-sm">Matérias</a>
            <a href="#pricing" className="btn-ghost text-sm">Planos</a>
            <Link href="/login" className="btn-ghost text-sm">Entrar</Link>
            <a href="#pricing" className="btn-primary text-sm py-2 px-4">
              Começar Agora
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-elevated transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-2">
              <a href="#features" className="btn-ghost" onClick={() => setMenuOpen(false)}>Recursos</a>
              <a href="#subjects" className="btn-ghost" onClick={() => setMenuOpen(false)}>Matérias</a>
              <a href="#pricing" className="btn-ghost" onClick={() => setMenuOpen(false)}>Planos</a>
              <Link href="/login" className="btn-ghost" onClick={() => setMenuOpen(false)}>Entrar</Link>
              <a href="#pricing" className="btn-primary text-center" onClick={() => setMenuOpen(false)}>
                Começar Agora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
