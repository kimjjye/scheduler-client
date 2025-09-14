import supabase from "@/utils/supabase";
import { NavLink, useNavigate } from "react-router-dom";

const navigations = [{ to: "/", label: "DashBoard" }];

export default function TheHeader() {
  const navigate = useNavigate();
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("로그아웃 실패");
        return;
      }
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header>
      <nav>
        {navigations.map((nav) => (
          <NavLink key={nav.to} to={nav.to}>
            {nav.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout}>로그아웃</button>
    </header>
  );
}
