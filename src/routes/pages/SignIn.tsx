import supabase from "@/utils/supabase";
import googleIcon from "@/assets/icons/web_light_sq_SI.svg";

const SignIn = () => {
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiDomain = import.meta.env.VITE_API_DOMAIN;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${apiDomain}/welcome?from=signin`,
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
      <main className="grid h-full place-items-center bg-indigo-300 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-indigo-900 sm:text-7xl">
            FORHA_
          </h1>
          <div className="shadow-md rounded py-5 bg-indigo-100/50 hover:bg-indigo-100/70 mt-10 flex flex-col items-center justify-center gap-y-6">
            <h2 className="font-semibold">Sign In</h2>
            <div>
              <img
                onClick={handleSignIn}
                src={googleIcon}
                className="google-sign-in-btn"
                alt="goggle-login-btn"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;
