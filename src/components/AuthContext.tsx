import React from "react";
import { type Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  session: null,
  setSession: () => {},
});
