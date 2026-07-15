"use client";
import { subjects } from "@/lib/data";

export default function SubjectsSection() {
  return (
    <section id="subjects" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-elevated/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">
            5 matérias,{" "}
            <span className="gradient-text">todo o conteúdo do ENEM</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Cobertura completa de todas as áreas cobradas no exame, com tópicos
            organizados por módulos e nível de importância.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="card-hover p-6 group relative overflow-hidden"
            >
              {/* Glow effect */}
              <div
                className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
                style={{ backgroundColor: subject.color }}
              />

              <div className="relative">
                {/* Icon + title */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${subject.color}20`, border: `1px solid ${subject.color}40` }}
                  >
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-text-primary">
                      {subject.title}
                    </h3>
                    <span className="text-text-muted text-xs">
                      {subject.modules.length} módulos •{" "}
                      {subject.modules.reduce((acc, m) => acc + m.topics.length, 0)} tópicos
                    </span>
                  </div>
                </div>

                <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                  {subject.description}
                </p>

                {/* Module list preview */}
                <div className="space-y-2">
                  {subject.modules.slice(0, 3).map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-center gap-2 text-text-muted text-sm"
                    >
                      <span>{mod.icon}</span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                  ))}
                  {subject.modules.length > 3 && (
                    <div className="text-text-muted text-xs pl-6">
                      + {subject.modules.length - 3} módulos
                    </div>
                  )}
                </div>

                <div
                  className="mt-4 h-px"
                  style={{ background: `linear-gradient(to right, ${subject.color}40, transparent)` }}
                />
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div className="card p-6 border-dashed border-primary/30 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl">
              🚀
            </div>
            <div>
              <h3 className="font-display font-bold text-text-primary mb-1">
                Acesso Completo
              </h3>
              <p className="text-text-secondary text-sm">
                Todo o conteúdo disponível após a compra do plano completo.
              </p>
            </div>
            <a href="#pricing" className="btn-primary text-sm py-2 px-4">
              Ver Planos →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
