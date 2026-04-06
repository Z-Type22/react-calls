import styles from "./create_offer.module.css";
import { useState } from "react";
import { api } from "@/shared/api/client";
import type { Call } from "@/pages/Calls/Calls";

interface CreateOfferProps {
  setCalls: React.Dispatch<React.SetStateAction<Call[]>>;
};

export const CreateOffer = ({ setCalls }: CreateOfferProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreateCall = async () => {
    try {
      setCreating(true);
      const response = await api.post("calls");
      setCalls(prev => [...prev, response.data]);
      setIsPopupOpen(false);
    } catch (e) {
      alert("Не удалось создать аудиовстречу");
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <div className={styles.create_wrapper}>
        <button
          className={styles.button}
          onClick={() => setIsPopupOpen(true)}
        >
          Создать аудиовстречу
        </button>
      </div>

      {isPopupOpen && (
        <div className={styles.popup_overlay} onClick={() => setIsPopupOpen(false)}>
          <div
            className={styles.popup_content}
            onClick={e => e.stopPropagation()}
          >
            <h3>Создать аудиозвонок</h3>
            <button
              className={styles.button}
              onClick={handleCreateCall}
              disabled={creating}
            >
              {creating ? "Создание..." : "Создать"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
