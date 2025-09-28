import { useEffect } from "react";
import supabase from "@/utils/supabase";
import useAuthStore from "@/store/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = useAuthStore((state) => state.setSession);
  const logout = useAuthStore((state) => state.logout);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setUserName = useAuthStore((state) => state.setUserName);
  const setRole = useAuthStore((state) => state.setRole);

  useEffect(() => {
    // 1. 초기 세션 + 유저 정보 확인
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (!session?.user?.id) return;

      // 유저 추가 정보 로딩
      const { data: userRecord } = await supabase
        .from("users")
        .select("role, name")
        .eq("id", session.user.id)
        .single();

      setUserId(session.user.id);
      setUserName(userRecord?.name ?? "");
      setRole(userRecord?.role ?? "");
    };

    initAuth();

    // 2. 세션 변화/갱신 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentSession = useAuthStore.getState().session;

      if (session !== currentSession) {
        setSession(session);
      }

      if (!session && currentSession) {
        logout();

        setUserId(null);
        setUserName("");
        setRole("");
      }

      // 로그인 이벤트 시 유저 정보 새로 로드
      if (
        session &&
        (!currentSession || session.user.id !== currentSession?.user.id)
      ) {
        supabase
          .from("users")
          .select("role, name")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            setUserId(session.user.id);
            setUserName(data?.name ?? "");
            setRole(data?.role ?? "");
          });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return <>{children}</>;
};
