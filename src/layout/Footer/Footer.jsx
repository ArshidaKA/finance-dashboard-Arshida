import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Financial dashboard. All rights reserved.</p>
      <div className={styles.links}>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms & Conditions</a>
      </div>
    </footer>
  );
}
