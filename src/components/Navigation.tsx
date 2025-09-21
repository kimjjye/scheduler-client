import supabase from "@/utils/supabase";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navigations = [
  { to: "/", label: "DashBoard", icon: "🏠" },
  { to: "/students", label: "수강생 관리", icon: "👨‍🎓" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

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
    <aside
      className={`bg-green-950 flex flex-col px-3 py-3 justify-between ${
        isOpen ? "w-64" : "w-16"
      } max-w-[30%] shadow-md transition-all duration-300`}
    >
      <div className="flex flex-col gap-2 ">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "◀" : "▶"}
        </button>
        {navigations.map((nav) => (
          <NavLink key={nav.to} to={nav.to} className="flex items-center gap-3">
            <span className="text-xl flex-shrink-0">{nav.icon}</span>
            <div className="overflow-hidden min-w-[0] flex-1">
              <span
                className={`inline-block transition-transform transition-opacity duration-200 whitespace-nowrap
    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
              >
                {nav.label}
              </span>
            </div>
          </NavLink>
        ))}
      </div>
      <div
        className="flex items-center gap-3 hover:text-green-100"
        onClick={handleLogout}
      >
        <span className="text-xl flex-shrink-0">🥺</span>
        <div className="overflow-hidden min-w-[0] flex-1">
          <span
            className={`inline-block transition-transform transition-opacity duration-200 whitespace-nowrap
    ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            로그아웃
          </span>
        </div>
      </div>
    </aside>
  );
};
export default Navigation;
