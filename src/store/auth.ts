import { create } from "zustand";
import supabase from "@/utils/supabase";
import type { Session } from "@supabase/supabase-js";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  session: Session | null;
  userId: string | null;
  userName: string;
  role: string;
  setSession: (session: Session | null) => void;
  setUserId: (userId: string | null) => void;
  setUserName: (userName: string) => void;
  setRole: (role: string) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      session: null,
      userId: null,
      userName: "",
      role: "",
      setSession: (session) => set({ session }),
      setUserId: (userId) => set({ userId }),
      setUserName: (userName) => set({ userName }),
      setRole: (role) => set({ role }),
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            alert("로그아웃 실패");
            return;
          }
          set({ role: "", userName: "" });

          window.location.href = "/signin";
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "authStorage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
