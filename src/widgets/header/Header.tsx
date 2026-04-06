import styles from "./header.module.css";
import { useCurrentUser } from "@/app/providers/UserProvider";
import { Link } from "react-router-dom";
import { LogoutButton } from "@/features/ui/LogoutButton/LogoutButton";


export const Header = () => {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return null;

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        EchoNet
      </Link>

      {currentUser ? (
        <nav className={styles.nav}>
          <Link to="/calls" className={styles.button}>Аудиозвонки</Link>
          <Link to="/" className={styles.button}>Мои звонки</Link>

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
