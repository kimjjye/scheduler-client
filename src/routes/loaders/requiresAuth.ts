import { redirect } from "react-router-dom";
import supabase from "@/utils/supabase";

export async function checkAuth({ request }: { request: Request }) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(request.url);
  const pathname = url.pathname + url.search;
  const referrer = url.searchParams.get("from");

  // 파라미터 중 from이 없는데 /welcome에 접근한 경우
  if (pathname.startsWith("/welcome") && !referrer) {
    return redirect("/");
  }

  // 로그인된 상태인데 /signin에 접근한 경우 → / 리다이렉트
  if (session && pathname.startsWith("/signin")) {
    return redirect("/");
  }

  // 로그인 안 된 상태인데 /signin 외의 페이지 접근 → signin으로 리다이렉트
  if (!session && !pathname.startsWith("/signin")) {
    return redirect(`/signin?redirectTo=${encodeURIComponent(pathname)}`);
  }

  // 로그인 안 된 상태에서 /signin 접근 → 그대로 진행
  // 로그인된 상태에서 일반 페이지 접근 → 그대로 진행
  return null;
}
