import type { User } from "@/pages/CallDetails/CallDetails";
import styles from "./main_section.module.css";

interface MainSectionProps {
  callees: User[];
  onDelete?: (userId: number) => void;
}

export const MainSection: React.FC<MainSectionProps> = ({ callees, onDelete }) => {
  return (
    <main className={styles.mainSection}>
      <h2>Участники</h2>
      {callees.length === 0 && <p>Нет участников</p>}
      <div>
        {callees.map((user) => (
          <div key={user.id} className={styles.participantCard}>
            <div className={styles.participantInfo}>
              <img
                src={user.avatar ? 
                `${import.meta.env.VITE_BACKEND_URL}${user.avatar}` 
                : import.meta.env.VITE_AVATAR_URL}
                alt={user.username}
                className={styles.participantAvatar}
              />
              <div>
                <span className={styles.participantName}>{user.username}</span>
                <span className={styles.participantEmail}>{user.email}</span>
              </div>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => onDelete?.(user.id)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
