import styles from "./header.module.css";
import { Link } from "react-router-dom";


export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        EchoNet
      </Link>

      <nav className={styles.nav}>
        <button className={styles.button}>Пользователи</button>
        <button className={styles.button}>Звонки</button>
        <button className={`${styles.button} ${styles.logout}`}>
          Выйти
        </button>
      </nav>
    </header>
  )
}
