import supabase from "@/utils/supabase";

const SignIn = () => {
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      type InstructorRow = {
        id: string;
        role: string;
      };

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/dashboard", // 로그인 후 이동할 페이지
        },
      });

      const { data: sessionData } = await supabase.auth.getSession();
      console.log(`sessionData : ${sessionData}`);
      const { data: userData } = await supabase.auth.getUser();
      console.log(`userData : ${userData}`);
      // 로그인 성공 → 사용자 정보 가져오기
      const userId = userData?.user?.id;
      const { data: instructor, error: instructorError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single<InstructorRow>();
      console.log(`instructor : ${instructor}`);
      if (instructorError) {
        console.error(instructorError);
        alert("사용자 정보 확인 중 오류가 발생했어요.");
        return;
      }

      if (instructor?.role === "instructor") {
        // 강사권한
      } else {
        // 학생권한
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <button onClick={handleSignIn}>구글로그인</button>
    </div>
  );
};

export default SignIn;
