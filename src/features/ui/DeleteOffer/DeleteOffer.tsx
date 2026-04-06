import styles from "./delete_offer.module.css";
import { api } from "@/shared/api/client";
import type { Call } from "@/pages/Calls/Calls";

interface DeleteOfferProps {
  callId: number;
  setCalls: React.Dispatch<React.SetStateAction<Call[]>>;
};

export const DeleteOffer = ({ callId, setCalls }: DeleteOfferProps) => {
  const handleDelete = async (callId: number) => {
    const confirmed = window.confirm("Вы уверены, что хотите удалить звонок?");
    if (!confirmed) return;

    try {
      await api.delete(`calls/${callId}`);

      setCalls(prevCalls =>
        prevCalls.filter(call => call.id !== callId)
      );
    } catch (e) {
      alert("Не удалось удалить звонок");
    }
  };

  return (
    <button 
      className={`${styles.deleteButton} ${styles.button}`}
      onClick={() => handleDelete(callId)}
    >
      Удалить
    </button>
  );
}