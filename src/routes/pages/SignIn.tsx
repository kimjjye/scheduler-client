import supabase from "@/utils/supabase";
import "@/assets/style/common.css";

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
    <>
      <main className="grid h-full place-items-center bg-green-200 px-6 py-24 sm:py-32 lg:px-8 dark:bg-green-900">
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
            FORHA_
          </h1>
          <div className="shadow-md rounded py-5 bg-green-100/50 hover:bg-green-100/70 mt-10 flex flex-col items-center justify-center gap-y-6 dark:bg-green-950/50 hover:bg-green-950/70">
            <h2 className="font-semibold">Sign In</h2>
            <div>
              <img onClick={handleSignIn} className="google-sign-in-btn" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
