import { NavLink } from "react-router-dom";
// import "./Header.css"; // optional if you want separate styles

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>
        <NavLink to="/transactions">Manage Transactions</NavLink>
        <NavLink to="/reports-settings">Reports & Settings</NavLink>
      </nav>
    </header>
  );
}
