"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Difficulty } from "./data";
import { createClient } from "@/utils/supabase/client";

export interface User {
  id: string;
  name: string;
  email: string;
  membership: "active" | "inactive";
  createdAt: string;
}

interface ProgressState {
  completedTopics: Record<string, boolean>;
  topicDifficulties: Record<string, Difficulty>;
  topicNotes: Record<string, string>;
  favorites: string[];
  pomodoroSessions: number;
  pomodoroDate: string;
  weeklyActivity: Record<string, number>;
}

interface AppState extends ProgressState {
  user: User | null;
  progressByUser: Record<string, ProgressState>;
  sidebarOpen: boolean;

  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  activateMembership: () => void;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;

  // Progress actions
  toggleTopic: (topicId: string) => void;
  setDifficulty: (topicId: string, difficulty: Difficulty) => void;
  setNote: (topicId: string, note: string) => void;
  toggleFavorite: (topicId: string) => void;
  incrementPomodoro: () => void;

  // UI actions
  setSidebarOpen: (open: boolean) => void;
  addActivityMinutes: (minutes: number) => void;
}

const today = () => new Date().toISOString().split("T")[0];

const emptyProgress = (): ProgressState => ({
  completedTopics: {},
  topicDifficulties: {},
  topicNotes: {},
  favorites: [],
  pomodoroSessions: 0,
  pomodoroDate: today(),
  weeklyActivity: {},
});

const readProgress = (state: AppState): ProgressState => ({
  completedTopics: state.completedTopics,
  topicDifficulties: state.topicDifficulties,
  topicNotes: state.topicNotes,
  favorites: state.favorites,
  pomodoroSessions: state.pomodoroSessions,
  pomodoroDate: state.pomodoroDate,
  weeklyActivity: state.weeklyActivity,
});

const progressForUser = (state: AppState, userId: string) => {
  const progressByUser = { ...(state.progressByUser ?? {}) };

  // Preserve data from older versions, which stored progress globally.
  if (state.user && !progressByUser[state.user.id]) {
    progressByUser[state.user.id] = readProgress(state);
  }

  const progress = progressByUser[userId] ?? emptyProgress();
  progressByUser[userId] = progress;

  return { progress, progressByUser };
};

const updateProgress = (
  state: AppState,
  updater: (progress: ProgressState) => ProgressState
): Partial<AppState> => {
  if (!state.user) return {};

  const progress = updater(readProgress(state));
  return {
    ...progress,
    progressByUser: {
      ...(state.progressByUser ?? {}),
      [state.user.id]: progress,
    },
  };
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      progressByUser: {},
      sidebarOpen: true,
      completedTopics: {},
      topicDifficulties: {},
      topicNotes: {},
      favorites: [],
      pomodoroSessions: 0,
      pomodoroDate: today(),
      weeklyActivity: {},

      login: async (email, password) => {
        const supabase = createClient();
        const normalizedEmail = email.trim().toLowerCase();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (error) {
          const message = error.message.toLowerCase();

          if (error.code === "email_provider_disabled" || message.includes("email logins are disabled")) {
            return {
              success: false,
              error: "O login por e-mail está desativado no Supabase. Ative o provedor Email e desative a confirmação de e-mail no painel do projeto.",
            };
          }

          if (message.includes("email not confirmed")) {
            return {
              success: false,
              error: "A confirmação de e-mail ainda está ativada no Supabase. Desative essa opção no painel do projeto.",
            };
          }

          return { success: false, error: "E-mail ou senha incorretos." };
        }

        if (!data.user) {
          return { success: false, error: "E-mail ou senha incorretos." };
        }

        const { progress, progressByUser } = progressForUser(get(), data.user.id);
        const membership = data.user.user_metadata?.membership || "inactive";
        set({
          ...progress,
          progressByUser,
          user: {
            id: data.user.id,
            name: data.user.user_metadata?.name || normalizedEmail,
            email: normalizedEmail,
            membership,
            createdAt: data.user.created_at,
          },
        });
        return { success: true };
      },

      register: async (name, email, password) => {
        const supabase = createClient();
        const normalizedEmail = email.trim().toLowerCase();
        const { data, error } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              name,
              membership: "inactive",
            },
          },
        });

        if (error) {
          const message = error.message.toLowerCase();

          if (error.code === "email_provider_disabled" || message.includes("email logins are disabled")) {
            return {
              success: false,
              error: "O cadastro por e-mail está desativado no Supabase. Ative o provedor Email e desative a confirmação de e-mail no painel do projeto.",
            };
          }

          return { success: false, error: error.message };
        }

        if (!data.user) {
          return { success: false, error: "Não foi possível criar a conta." };
        }

        if (!data.session) {
          return {
            success: false,
            error: "A conta foi criada, mas a confirmação de e-mail ainda está ativada no Supabase. Desative essa opção no painel do projeto.",
          };
        }

        const { progress, progressByUser } = progressForUser(get(), data.user.id);
        set({
          ...progress,
          progressByUser,
          user: {
            id: data.user.id,
            name: data.user.user_metadata?.name || name,
            email: normalizedEmail,
            membership: data.user.user_metadata?.membership || "inactive",
            createdAt: data.user.created_at,
          },
        });

        return { success: true };
      },

      logout: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ user: null, ...emptyProgress() });
      },

      activateMembership: async () => {
        const { user } = get();
        if (!user) return;
        
        // Simulating the update on the Supabase auth metadata
        const supabase = createClient();
        await supabase.auth.updateUser({
          data: { membership: "active" }
        });
        
        set({ user: { ...user, membership: "active" } });
      },

      resetPasswordRequest: async (email) => {
        const supabase = createClient();
        const redirectUrl = typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback?next=/nova-senha`
          : undefined;
        
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: redirectUrl,
        });

        if (error) {
          return { success: false, error: error.message };
        }
        return { success: true };
      },

      updatePassword: async (newPassword) => {
        const supabase = createClient();
        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData.session) {
          return { success: false, error: "Link inválido ou expirado. Solicite uma nova recuperação de senha." };
        }

        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
          return { success: false, error: "Link expirado ou erro ao atualizar a senha." };
        }

        await supabase.auth.signOut();
        return { success: true };
      },

      toggleTopic: (topicId) => {
        set((state) =>
          updateProgress(state, (progress) => ({
            ...progress,
            completedTopics: {
              ...progress.completedTopics,
              [topicId]: !progress.completedTopics[topicId],
            },
          }))
        );
        get().addActivityMinutes(5);
      },

      setDifficulty: (topicId, difficulty) => {
        set((state) =>
          updateProgress(state, (progress) => ({
            ...progress,
            topicDifficulties: { ...progress.topicDifficulties, [topicId]: difficulty },
          }))
        );
      },

      setNote: (topicId, note) => {
        set((state) =>
          updateProgress(state, (progress) => ({
            ...progress,
            topicNotes: { ...progress.topicNotes, [topicId]: note },
          }))
        );
      },

      toggleFavorite: (topicId) => {
        set((state) =>
          updateProgress(state, (progress) => {
            const isFav = progress.favorites.includes(topicId);
            return {
              ...progress,
              favorites: isFav
                ? progress.favorites.filter((id) => id !== topicId)
                : [...progress.favorites, topicId],
            };
          })
        );
      },

      incrementPomodoro: () => {
        set((state) =>
          updateProgress(state, (progress) => {
            const t = today();
            return {
              ...progress,
              pomodoroSessions:
                progress.pomodoroDate === t ? progress.pomodoroSessions + 1 : 1,
              pomodoroDate: t,
            };
          })
        );
        get().addActivityMinutes(25);
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      addActivityMinutes: (minutes) => {
        set((state) =>
          updateProgress(state, (progress) => {
            const t = today();
            return {
              ...progress,
              weeklyActivity: {
                ...progress.weeklyActivity,
                [t]: (progress.weeklyActivity[t] || 0) + minutes,
              },
            };
          })
        );
      },
    }),
    {
      name: "meta-enem-store",
    }
  )
);
