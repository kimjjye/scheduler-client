import supabase from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [loading, setLoading] = useState(true);

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        navigate("/signin?redirectTo=/welcome", { replace: true });
        return;
      }

      const { data: userData } = await supabase.auth.getUser();

      const userId = userData?.user?.id;
      if (!userId) return;

      const meta = userData?.user?.user_metadata || {};
      const name =
        meta.name ||
        meta.full_name ||
        meta.given_name ||
        userData?.user?.email?.split("@")[0] ||
        "";

      setUserName(name);
      setLoading(false);

      const { data: instructor, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (error) {
        alert("사용자 정보 확인 중 오류가 발생했습니다.");
        return;
      }

      if (!name) {
        navigate("/", { replace: true });
        return null;
      }

      if (instructor?.role === "instructor") {
        console.log("강사입니다");
      }
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
