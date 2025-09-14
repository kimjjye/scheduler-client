import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다 😢</h1>
      <NavLink to="/">홈으로 돌아가기</NavLink>
    </div>
  );
}
