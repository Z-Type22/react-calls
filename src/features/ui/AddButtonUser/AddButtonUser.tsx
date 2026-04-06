import styles from "./add_button_user.module.css";
import { api } from "@/shared/api/client";
import type { User } from "@/pages/CallDetails/CallDetails";

interface AddButtonUserProps {
  setInfoMessage: (msg: string | null) => void
  closeModal: () => void;
  callId: number;
  user: User;
  onCalleesUpdate: (updater: (prev: User[]) => User[]) => void;
}

export const AddButtonUser: React.FC<AddButtonUserProps> = ({
  setInfoMessage,
  closeModal,
  callId,
  user,
  onCalleesUpdate
}) => {
  const addCallee = async () => {
    var alreadyExists = false;

    onCalleesUpdate(prev => {
      const exists = prev.some(u => u.id === user.id);
      if (exists) {
        alreadyExists = true;
        return prev;
      }
      return [user, ...prev];
    });

    if (alreadyExists) {
      setInfoMessage("Пользователь уже добавлен");
      setTimeout(() => setInfoMessage(null), 3000);
      return;
    }

    await api.post("calls/add_callee", {
      call_id: callId,
      callee_id: user.id,
    });

    closeModal();
  };

  return (
    <button className={styles.addButton} onClick={addCallee}>
      Добавить
    </button>
  );
};
