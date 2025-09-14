import supabase from "@/utils/supabase";

const SignIn = () => {
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:5173/welcome?from=signin",
        },
      });

      if (error) {
        alert("구글 로그인에 실패했습니다.");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <button onClick={handleSignIn}>구글 로그인</button>
    </div>
  );
};

export default SignIn;
