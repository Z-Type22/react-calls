import { useCurrentUser } from "@/app/providers/user/UserProvider";
import styles from "./logout_button.module.css";

export const LogoutButton = () => {
  const { logout } = useCurrentUser();

  return (
    <button className={`${styles.button} ${styles.logout}`} onClick={logout}>
      Выйти
    </button>
  );
};