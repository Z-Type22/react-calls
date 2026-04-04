import styles from "./header.module.css";
import { useCurrentUser } from "@/app/providers/user/UserProvider";
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/auth/logout/ui/LogoutButton/LogoutButton";


export const Header = () => {
  const { currentUser } = useCurrentUser();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        EchoNet
      </Link>

      {currentUser ? (
        <nav className={styles.nav}>
          <button className={styles.button}>Пользователи</button>
          <button className={styles.button}>Звонки</button>

          <LogoutButton />
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link to="/login" className={`${styles.button} ${styles.login}`}>Войти</Link>
        </nav>
      )}
    </header>
  )
}
