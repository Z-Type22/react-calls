import styles from "./main-layout.module.css";
import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return <main className={styles.main}>{children}</main>;
};
