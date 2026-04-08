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
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateCall = async () => {
    try {
      if (!title.trim()) {
        setErrorMessage("Заголовок не может быть пустым");
        return;
      }

      setCreating(true);
      const response = await api.post("calls", { title });
      setCalls(prev => [...prev, response.data]);
      setIsPopupOpen(false);
      setTitle("");
    } catch (e) {
      setErrorMessage("Не удалось создать аудиовстречу");
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

            <input
              type="text"
              placeholder="Введите заголовок"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={styles.input}
            />

            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

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
