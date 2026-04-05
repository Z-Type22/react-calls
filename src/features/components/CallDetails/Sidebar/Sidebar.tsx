import styles from "./sidebar.module.css";
import type { Call } from "@/pages/CallDetails/CallDetails";

export const Sidebar: React.FC<{ call: Call }> = ({ call }) => (
  <aside className={styles.sidebar}>
    <h2>Информация о аудиовстрече</h2>
    <p><strong>ID:</strong> {call.id}</p>
    <p><strong>Дата создания:</strong> {new Date(call.created_at).toLocaleString()}</p>
    <p><strong>Количество участников:</strong> {call.callees.length}</p>
    <p><strong>Создатель аудиовстречи:</strong> {call.caller.username}</p>
    <button className={styles.addButton}>
      Добавить пользователя
    </button>
  </aside>
);
