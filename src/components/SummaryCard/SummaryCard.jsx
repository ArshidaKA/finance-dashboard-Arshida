import styles from "./SummaryCard.module.css";

export default function SummaryCard({ title, value, color }) {
  return (
    <div className={styles.card} style={{ borderColor: color }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
