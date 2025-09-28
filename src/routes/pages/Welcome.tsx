import useAuthStore from "@/store/auth";
import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userName } = useAuthStore();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        navigate("/signin?redirectTo=/welcome", { replace: true });
        return;
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <>로딩중...</>;
  }

  return <>{userName.length > 0 && <h1>환영해요 {userName}님 🎉</h1>}</>;
};

export default Welcome;
