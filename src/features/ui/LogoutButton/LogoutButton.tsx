import { useCurrentUser } from "@/app/providers/UserProvider";
import styles from "./logout_button.module.css";

export const LogoutButton = () => {
  const { logout } = useCurrentUser();

  return (
    <button className={`${styles.button} ${styles.logout}`} onClick={logout}>
      Выйти
    </button>
  );
};