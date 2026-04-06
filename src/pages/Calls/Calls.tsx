import { api } from "@/shared/api/client";
import styles from "./calls.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "@/features/ui/Loading/Loading";
import { CreateOffer } from "@/features/components/CreateOffer/CreateOffer";
import { DeleteOffer } from "@/features/ui/DeleteOffer/DeleteOffer";

export interface Call {
  id: number;
  created_at: string;
  is_private: boolean;
  callees: [];
};

export const Calls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await api.get("calls");
        setCalls(response.data);
      } catch (e) {
        setError("Не удалось загрузить список звонков");
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.calls_card}>
      <h2>Список аудиозвонков</h2>

      <table className={styles.calls_table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата создания</th>
            <th>Участники</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {calls.map(call => (
            <tr key={call.id}>
              <td>{call.id}</td>
              <td>{new Date(call.created_at).toLocaleDateString()}</td>
              <td>{call.callees.length}</td>
              <td>
                <Link
                  to={`/calls/${call.id}`}
                  className={styles.button}
                >
                  Перейти
                </Link>

                <DeleteOffer
                  callId={call.id}
                  setCalls={setCalls}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateOffer setCalls={setCalls} />

    </div>
  );
};
