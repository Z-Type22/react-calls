import styles from "./sidebar.module.css";
import type { Call } from "@/pages/CallDetails/CallDetails";
import { AddUser } from "@/features/components/AddUser/AddUser";
import type { User } from "@/pages/CallDetails/CallDetails";

interface SidebarProps {
  call: Call,
  onCalleesUpdate: (updater: (prev: User[]) => User[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ call, onCalleesUpdate }) => (
  <aside className={styles.sidebar}>
    <h2>Информация о аудиовстрече</h2>
    <p><strong>ID:</strong> {call.id}</p>
    <p><strong>Название:</strong> {call.title}</p>
    <p><strong>Дата создания:</strong> {new Date(call.created_at).toLocaleString()}</p>
    <p><strong>Количество участников:</strong> {call.callees.length}</p>
    <p><strong>Создатель аудиовстречи:</strong> {call.caller.username}</p>
    <p>
      <strong>Ссылка для подключения:</strong>{" "}
      <a
        href={`${import.meta.env.VITE_URL}/calls/connect/${call.uuid}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {`${import.meta.env.VITE_URL}/calls/connect/${call.uuid}`}
      </a>
    </p>

    <AddUser callId={call.id} onCalleesUpdate={onCalleesUpdate}/>
  </aside>
);
