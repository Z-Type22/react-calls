import type { User } from "@/pages/CallDetails/CallDetails";
import styles from "./main_section.module.css";
import { useState } from "react";
import { api } from "@/shared/api/client";

interface MainSectionProps {
  callees: User[];
  callId: number;
  onCalleesUpdate: (updater: (prev: User[]) => User[]) => void;
}

export const MainSection: React.FC<MainSectionProps> = ({ callees, callId, onCalleesUpdate }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleDelete = async (userId: number) => {
    if (!confirm("Вы уверены, что хотите удалить участника?")) return;

    try {
      setLoadingId(userId);

      api.post("calls/remove_callee", { callee_id: userId, call_id: callId });

      onCalleesUpdate(prev =>
        prev.filter(user => user.id !== userId)
      );

    } catch (error) {
      console.error("Ошибка при удалении участника:", error);
      alert("Не удалось удалить участника");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className={styles.mainSection}>
      <h2>Участники</h2>
      {callees.length === 0 && <p>Нет участников</p>}
      <div>
        {callees.map((user) => (
          <div key={user.id} className={styles.participantCard}>
            <div className={styles.participantInfo}>
              <img
                src={user.avatar
                  ? `${import.meta.env.VITE_BACKEND_URL}${user.avatar}`
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
              onClick={() => handleDelete(user.id)}
              disabled={loadingId === user.id}
            >
              {loadingId === user.id ? "Удаление..." : "Удалить"}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};
