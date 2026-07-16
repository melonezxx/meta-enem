"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useStore } from "@/lib/store";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

type Mode = "work" | "break" | "longbreak";

const MODES: Record<Mode, { label: string; duration: number; color: string }> = {
  work: { label: "Foco", duration: 25 * 60, color: "#3B82F6" },
  break: { label: "Pausa Curta", duration: 5 * 60, color: "#10B981" },
  longbreak: { label: "Pausa Longa", duration: 15 * 60, color: "#8B5CF6" },
};

function beep() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1);
  } catch {
    // silently fail if audio not supported
  }
}

export default function PomodoroPage() {
  const { incrementPomodoro, pomodoroSessions, pomodoroDate } = useStore();
  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(MODES.work.duration);
  const [running, setRunning] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [completedInSession, setCompletedInSession] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const today = new Date().toISOString().split("T")[0];
  const sessionsToday = pomodoroDate === today ? pomodoroSessions : 0;

  const resetTimer = useCallback(
    (newMode?: Mode) => {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      const m = newMode || mode;
      setTimeLeft(MODES[m].duration);
    },
    [mode]
  );

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (soundOn) beep();
            if (mode === "work") {
              incrementPomodoro();
              setCompletedInSession((c) => c + 1);
            }
            setTimeLeft(0);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode, soundOn, incrementPomodoro]);

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    resetTimer(newMode);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalDuration = MODES[mode].duration;
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const currentColor = MODES[mode].color;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold font-display text-text-primary mb-2">
          Timer Pomodoro 🍅
        </h2>
        <p className="text-text-secondary">
          Foque por 25 minutos e descanse 5. Repita e conquiste!
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(Object.keys(MODES) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              mode === m
                ? "text-white shadow-lg"
                : "text-text-secondary hover:text-text-primary hover:bg-background-elevated"
            }`}
            style={mode === m ? { backgroundColor: MODES[m].color } : {}}
          >
            {MODES[m].label}
          </button>
        ))}
      </div>

      {/* Timer circle */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <svg width="280" height="280" className="-rotate-90">
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke="#1F2937"
              strokeWidth="10"
            />
            <circle
              cx="140"
              cy="140"
              r="120"
              fill="none"
              stroke={currentColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
              style={{ filter: `drop-shadow(0 0 8px ${currentColor}80)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-6xl font-bold font-display tabular-nums"
              style={{ color: running ? currentColor : "#F9FAFB" }}
            >
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
            <div className="text-text-muted text-sm mt-2">{MODES[mode].label}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={() => resetTimer()}
          className="p-3 rounded-xl bg-background-elevated border border-border text-text-muted hover:text-text-primary hover:border-border-light transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={() => setRunning(!running)}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
          style={{ backgroundColor: currentColor, boxShadow: `0 0 20px ${currentColor}50` }}
        >
          {running ? (
            <>
              <Pause className="w-5 h-5" />
              Pausar
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {timeLeft === totalDuration ? "Iniciar" : "Continuar"}
            </>
          )}
        </button>

        <button
          onClick={() => setSoundOn(!soundOn)}
          className="p-3 rounded-xl bg-background-elevated border border-border text-text-muted hover:text-text-primary hover:border-border-light transition-all duration-200"
        >
          {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <div className="text-3xl font-bold font-display text-accent-orange">🍅</div>
          <div className="text-2xl font-bold font-display text-text-primary">{sessionsToday}</div>
          <div className="text-text-muted text-xs">Sessões Hoje</div>
        </div>
        <div className="stat-card text-center">
          <div className="text-3xl font-bold font-display">⏱️</div>
          <div className="text-2xl font-bold font-display text-text-primary">
            {sessionsToday * 25}
          </div>
          <div className="text-text-muted text-xs">Minutos Focados</div>
        </div>
        <div className="stat-card text-center">
          <div className="text-3xl font-bold font-display">🎯</div>
          <div className="text-2xl font-bold font-display text-text-primary">
            {completedInSession}
          </div>
          <div className="text-text-muted text-xs">Nesta Sessão</div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 card p-5 border border-primary/20">
        <h3 className="font-display font-semibold text-text-primary mb-3">💡 Dicas Pomodoro</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• Elimine distrações antes de iniciar o timer</li>
          <li>• Defina UMA tarefa para cada pomodoro</li>
          <li>• A cada 4 pomodoros, faça uma pausa longa (15 min)</li>
          <li>• Registre o que estudou em cada sessão</li>
        </ul>
      </div>
    </div>
  );
}
