import { NavLink } from "react-router";

const navigations = [
  { to: "/", label: "Home" },
  { to: "/signin", label: "SignIn" },
];

export default function TheHeader() {
  return (
    <header>
      <nav>
        {navigations.map((nav) => (
          <NavLink key={nav.to} to={nav.to}>
            {nav.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
