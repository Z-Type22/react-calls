import { useRef, useState } from "react";
import styles from "./add_user.module.css";
import { api } from "@/shared/api/client";
import { Loading } from "@/features/ui/Loading/Loading";
import { AddButtonUser } from "@/features/ui/AddButtonUser/AddButtonUser";
import type { User } from "@/pages/CallDetails/CallDetails";

interface AddUserProps {
  callId: number;
  onCalleesUpdate: (updater: (prev: User[]) => User[]) => void;
}

export const AddUser: React.FC<AddUserProps> = ({ callId, onCalleesUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const debounceRef = useRef<number | null>(null);

  const fetchUsers = async (query?: string) => {
    setLoading(true);
    try {
      const response = query
        ? await api.get("users/search", { params: { q: query } })
        : await api.get("users");

      setUsers(response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      fetchUsers(value);
    }, 400);
  };

  const openModal = async () => {
    setIsOpen(true);
    fetchUsers();
  };

  const closeModal = () => {
    setIsOpen(false);
    setSearch("");
    setUsers([]);
  };

  return (
    <>
      <button className={styles.addButton} onClick={openModal}>
        Добавить пользователя
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={closeModal}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Добавить пользователя</h3>

            <input
              type="text"
              placeholder="Поиск..."
              className={styles.searchInput}
              value={search}
              onChange={handleSearchChange}
            />

            {loading ? (
              <Loading minHeight="0" />
            ) : (
              <div>
                {users.map((user) => (
                  <div key={user.id} className={styles.participantCard}>
                    <div className={styles.participantInfo}>
                      <img
                        src={
                          user.avatar
                            ? `${import.meta.env.VITE_BACKEND_URL}${user.avatar}`
                            : import.meta.env.VITE_AVATAR_URL
                        }
                        alt={user.username}
                        className={styles.participantAvatar}
                      />
                      <div>
                        <span className={styles.participantName}>
                          {user.username}
                        </span>
                        <span className={styles.participantEmail}>
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <AddButtonUser
                      setInfoMessage={setInfoMessage}
                      closeModal={closeModal}
                      callId={callId}
                      user={user}
                      onCalleesUpdate={onCalleesUpdate}
                    />
                  </div>
                ))}

                {users.length === 0 && (
                  <p>Пользователи не найдены</p>
                )}

                {infoMessage && (
                  <div className={styles.infoMessage}>{infoMessage}</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
