import { NavLink } from "react-router-dom";
import { useFinance } from "../../context/FinanceProvider";
import styles from "./Header.module.css";

export default function Header() {
  const { state } = useFinance();
  const userName = state.user?.name || "Guest";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img
          src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.greeting}>
          <span className={styles.hi}>Hi,</span>
          <span className={styles.name}>{userName}</span>
        </div>
      </div>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Manage Transactions
        </NavLink>
        <NavLink
          to="/reports-settings"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Reports & Settings
        </NavLink>
      </nav>
    </header>
  );
}
