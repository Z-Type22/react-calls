import { useCurrentUser } from "@/app/providers/UserProvider";
import styles from "./footer.module.css";

export const Footer = () => {
  const { loading } = useCurrentUser();
  
  if (loading) return null;

  return (
    <footer className={styles.footer}>
      © Copyright 2026. EchoNet
    </footer>
  );
};
