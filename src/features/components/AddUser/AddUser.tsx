import { useRef, useState } from "react";
import styles from "./add_user.module.css";
import { useUsers } from "@/shared/hooks/useUsers";
import { Loading } from "@/features/ui/Loading/Loading";
import { AddButtonUser } from "@/features/ui/AddButtonUser/AddButtonUser";
import { UserSearchInput } from "@/features/ui/UserSearchInput/UserSearchInput";
import type { User } from "@/pages/CallDetails/CallDetails";

interface AddUserProps {
  callId: number;
  onCalleesUpdate: (updater: (prev: User[]) => User[]) => void;
}

export const AddUser: React.FC<AddUserProps> = ({ callId, onCalleesUpdate }) => {
  const { 
    users, search, page, hasMore, initialLoading, 
    loadingMore, fetchUsers, searchUsers, reset,
  } = useUsers();

  const [isOpen, setIsOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!listRef.current || loadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      fetchUsers(search, page + 1, true);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    fetchUsers();
  };

  const closeModal = () => {
    setIsOpen(false);
    reset();
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

            <UserSearchInput value={search} onChange={searchUsers} />

            {infoMessage && (
              <div className={styles.infoMessage}>{infoMessage}</div>
            )}

            {initialLoading ? (
              <Loading minHeight="120px" />
            ) : (
              <div ref={listRef} className={styles.usersList} onScroll={handleScroll}>
                
                {users.map(user => (
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
