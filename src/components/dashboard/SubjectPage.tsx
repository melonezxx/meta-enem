"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { subjects } from "@/lib/data";
import type { Difficulty } from "@/lib/data";
import {
  ChevronDown,
  ChevronUp,
  Star,
  StickyNote,
  CheckSquare,
  Square,
} from "lucide-react";

function DifficultySelector({
  topicId,
  current,
}: {
  topicId: string;
  current?: Difficulty;
}) {
  const setDifficulty = useStore((s) => s.setDifficulty);
  const options: { value: Difficulty; label: string; className: string }[] = [
    { value: "easy", label: "Fácil", className: "badge-easy" },
    { value: "medium", label: "Médio", className: "badge-medium" },
    { value: "hard", label: "Difícil", className: "badge-hard" },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() =>
            setDifficulty(topicId, current === opt.value ? ("" as Difficulty) : opt.value)
          }
          className={`${opt.className} transition-all duration-150 ${
            current === opt.value ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function TopicItem({
  topicId,
  title,
}: {
  topicId: string;
  title: string;
}) {
  const { completedTopics, topicDifficulties, topicNotes, favorites, toggleTopic, toggleFavorite, setNote } =
    useStore();

  const completed = completedTopics[topicId] || false;
  const difficulty = topicDifficulties[topicId];
  const note = topicNotes[topicId] || "";
  const isFav = favorites.includes(topicId);
  const [showNote, setShowNote] = useState(false);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        completed
          ? "bg-success/5 border-success/20"
          : "bg-background border-border hover:border-border-light"
      }`}
    >
      <div className="flex items-center gap-3 p-3">
        {/* Checkbox */}
        <button
          onClick={() => toggleTopic(topicId)}
          className={`flex-shrink-0 transition-colors duration-150 ${
            completed ? "text-success" : "text-text-muted hover:text-text-secondary"
          }`}
        >
          {completed ? (
            <CheckSquare className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
        </button>

        {/* Title */}
        <span
          className={`flex-1 text-sm transition-colors ${
            completed ? "text-text-muted line-through" : "text-text-secondary"
          }`}
        >
          {title}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <DifficultySelector topicId={topicId} current={difficulty} />

          <button
            onClick={() => setShowNote(!showNote)}
            className={`p-1 rounded-lg transition-colors ${
              note ? "text-accent-orange" : "text-text-muted hover:text-text-secondary"
            }`}
            title="Anotações"
          >
            <StickyNote className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleFavorite(topicId)}
            className={`p-1 rounded-lg transition-colors ${
              isFav ? "text-accent-orange" : "text-text-muted hover:text-text-secondary"
            }`}
            title="Favoritar"
          >
            <Star className={`w-4 h-4 ${isFav ? "fill-accent-orange" : ""}`} />
          </button>
        </div>
      </div>

      {/* Note editor */}
      {showNote && (
        <div className="px-3 pb-3 animate-slide-up">
          <textarea
            value={note}
            onChange={(e) => setNote(topicId, e.target.value)}
            placeholder="Escreva suas anotações aqui... (salvo automaticamente)"
            className="w-full bg-background-elevated border border-border rounded-lg px-3 py-2 text-text-secondary text-sm placeholder-text-muted focus:outline-none focus:border-primary resize-none transition-colors"
            rows={3}
          />
        </div>
      )}
    </div>
  );
}

function ModuleAccordion({
  module,
}: {
  module: { id: string; title: string; icon: string; topics: { id: string; title: string }[] };
}) {
  const [open, setOpen] = useState(false);
  const { completedTopics } = useStore();

  const completedCount = module.topics.filter((t) => completedTopics[t.id]).length;
  const total = module.topics.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 hover:bg-background-elevated/50 transition-colors text-left"
      >
        <span className="text-xl flex-shrink-0">{module.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-text-primary text-sm mb-1 truncate">
            {module.title}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-background-elevated rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-text-muted text-xs flex-shrink-0">
              {completedCount}/{total}
            </span>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-muted flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-muted flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-2 border-t border-border animate-slide-up">
          <div className="pt-3" />
          {module.topics.map((topic) => (
            <TopicItem key={topic.id} topicId={topic.id} title={topic.title} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SubjectPage({ subjectId }: { subjectId: string }) {
  const subject = subjects.find((s) => s.id === subjectId);
  const { completedTopics } = useStore();

  if (!subject) return <div className="p-8 text-text-muted">Matéria não encontrada.</div>;

  const allTopics = subject.modules.flatMap((m) => m.topics);
  const completedCount = allTopics.filter((t) => completedTopics[t.id]).length;
  const totalCount = allTopics.length;
  const overallPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Subject header */}
      <div
        className="rounded-2xl p-6 mb-6 border relative overflow-hidden"
        style={{
          backgroundColor: `${subject.color}10`,
          borderColor: `${subject.color}30`,
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: subject.color }}
        />
        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${subject.color}20`, border: `1px solid ${subject.color}40` }}
            >
              {subject.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-text-primary mb-1">
                {subject.title}
              </h1>
              <p className="text-text-secondary text-sm">{subject.description}</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="flex flex-col items-end gap-2 min-w-[140px]">
            <div className="text-right">
              <div
                className="text-3xl font-bold font-display"
                style={{ color: subject.color }}
              >
                {overallPct}%
              </div>
              <div className="text-text-muted text-xs">
                {completedCount}/{totalCount} tópicos
              </div>
            </div>
            <div className="w-32 h-2 bg-background-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${overallPct}%`,
                  backgroundColor: subject.color,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Módulos", value: subject.modules.length, icon: "📚" },
          { label: "Tópicos", value: totalCount, icon: "📋" },
          { label: "Concluídos", value: completedCount, icon: "✅" },
          {
            label: "Restantes",
            value: totalCount - completedCount,
            icon: "⏳",
          },
        ].map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="text-xl">{stat.icon}</span>
            <div className="text-2xl font-bold font-display text-text-primary">
              {stat.value}
            </div>
            <div className="text-text-muted text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <div className="space-y-3">
        <h2 className="font-display font-semibold text-text-primary text-lg mb-4">
          Módulos
        </h2>
        {subject.modules.map((module) => (
          <ModuleAccordion key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
