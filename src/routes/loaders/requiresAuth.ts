import { redirect } from "react-router-dom";
import useAuthStore from "@/store/auth";

export async function checkAuth({ request }: { request: Request }) {
  const session = useAuthStore.getState().session;
  const userRoles = useAuthStore.getState().role;

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

  // 권한 없는 사용자 → 권한 신청 페이지로 리다이렉트
  console.log(userRoles);
  if (userRoles === "student" && pathname !== "/apply-role") {
    return redirect("/apply-role");
  } else if (userRoles === "instructor" && pathname === "/apply-role") {
    return redirect("/");
  }

  // 로그인 안 된 상태에서 /signin 접근 → 그대로 진행
  // 로그인된 상태에서 일반 페이지 접근 → 그대로 진행
  return null;
}
