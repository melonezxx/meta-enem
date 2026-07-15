"use client";
import { useStore } from "@/lib/store";
import { subjects } from "@/lib/data";
import Link from "next/link";
import { Star, ArrowRight, BookOpen } from "lucide-react";

export default function FavoritosPage() {
  const { favorites, toggleFavorite, topicDifficulties, completedTopics } = useStore();

  // Build a map of topicId -> { title, subjectId, subjectTitle, moduleTitle, subjectColor, subjectIcon }
  const topicMap: Record<
    string,
    {
      title: string;
      subjectId: string;
      subjectTitle: string;
      moduleTitle: string;
      subjectColor: string;
      subjectIcon: string;
    }
  > = {};

  subjects.forEach((s) => {
    s.modules.forEach((m) => {
      m.topics.forEach((t) => {
        topicMap[t.id] = {
          title: t.title,
          subjectId: s.id,
          subjectTitle: s.title,
          moduleTitle: m.title,
          subjectColor: s.color,
          subjectIcon: s.icon,
        };
      });
    });
  });

  const favoritedTopics = favorites
    .map((id) => ({ id, ...topicMap[id] }))
    .filter((t) => t.title);

  const difficultyLabels: Record<string, { label: string; className: string }> = {
    easy: { label: "Fácil", className: "badge-easy" },
    medium: { label: "Médio", className: "badge-medium" },
    hard: { label: "Difícil", className: "badge-hard" },
  };

  // Group by subject
  const bySubject: Record<string, typeof favoritedTopics> = {};
  favoritedTopics.forEach((t) => {
    const key = t.subjectId;
    if (!bySubject[key]) bySubject[key] = [];
    bySubject[key].push(t);
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold font-display text-text-primary mb-1">
          Favoritos ⭐
        </h2>
        <p className="text-text-secondary">
          Seus tópicos favoritos em um só lugar para revisão rápida.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <Star className="w-5 h-5 text-accent-orange" />
          <div className="text-3xl font-bold font-display text-text-primary">
            {favorites.length}
          </div>
          <div className="text-text-muted text-xs">Favoritos</div>
        </div>
        <div className="stat-card">
          <span className="text-2xl">✅</span>
          <div className="text-3xl font-bold font-display text-text-primary">
            {favoritedTopics.filter((t) => completedTopics[t.id]).length}
          </div>
          <div className="text-text-muted text-xs">Concluídos</div>
        </div>
        <div className="stat-card">
          <span className="text-2xl">⏳</span>
          <div className="text-3xl font-bold font-display text-text-primary">
            {favoritedTopics.filter((t) => !completedTopics[t.id]).length}
          </div>
          <div className="text-text-muted text-xs">Pendentes</div>
        </div>
      </div>

      {favoritedTopics.length === 0 ? (
        <div className="card p-12 text-center border-dashed border-border">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold font-display text-text-primary mb-2">
            Nenhum favorito ainda
          </h3>
          <p className="text-text-secondary mb-6">
            Acesse as matérias e clique na estrela (⭐) ao lado dos tópicos que deseja salvar para revisão rápida.
          </p>
          <Link href="/dashboard/redacao" className="btn-primary inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Explorar Matérias
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(bySubject).map(([subjectId, topics]) => {
            const subject = subjects.find((s) => s.id === subjectId);
            if (!subject) return null;
            return (
              <div key={subjectId}>
                {/* Subject header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{subject.icon}</span>
                    <h3
                      className="font-display font-bold"
                      style={{ color: subject.color }}
                    >
                      {subject.title}
                    </h3>
                    <span className="text-text-muted text-sm">({topics.length})</span>
                  </div>
                  <Link
                    href={`/dashboard/${subjectId}`}
                    className="flex items-center gap-1 text-text-muted hover:text-text-secondary text-xs transition-colors"
                  >
                    Ver todos <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Topics */}
                <div className="space-y-2">
                  {topics.map((topic) => {
                    const completed = completedTopics[topic.id] || false;
                    const difficulty = topicDifficulties[topic.id];
                    const diffInfo = difficulty ? difficultyLabels[difficulty] : null;

                    return (
                      <div
                        key={topic.id}
                        className={`card p-4 flex items-center gap-3 ${
                          completed ? "opacity-60" : ""
                        }`}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: subject.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium ${
                              completed
                                ? "line-through text-text-muted"
                                : "text-text-primary"
                            }`}
                          >
                            {topic.title}
                          </div>
                          <div className="text-text-muted text-xs">{topic.moduleTitle}</div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {completed && (
                            <span className="badge-easy">✅ Concluído</span>
                          )}
                          {diffInfo && (
                            <span className={diffInfo.className}>{diffInfo.label}</span>
                          )}
                          <button
                            onClick={() => toggleFavorite(topic.id)}
                            className="p-1 rounded-lg text-accent-orange hover:bg-accent-orange/10 transition-colors"
                            title="Remover dos favoritos"
                          >
                            <Star className="w-4 h-4 fill-accent-orange" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
