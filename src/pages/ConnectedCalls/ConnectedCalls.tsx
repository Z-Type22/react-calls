import { api } from "@/shared/api/client";
import styles from "./connected_calls.module.css";
import { useEffect, useState } from "react";
import { Loading } from "@/features/ui/Loading/Loading";

export interface User {
  id: number;
  username: number;
}

export interface Call {
  id: number;
  title: string;
  caller: User;
  created_at: string;
  callees: [];
  uuid: string;
};

export const ConnectedCalls = () => {
  const [connectedCalls, setConnectedCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  useEffect(() => {
    const fetchConnectedCalls = async () => {
      try {
        const response = await api.get("calls/invited");
        setConnectedCalls(response.data);
      } catch (e) {
        setError("Не удалось загрузить список звонков");
      } finally {
        setLoading(false);
      }
    };

    fetchConnectedCalls();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.calls_card}>
      <h2>Список аудиозвонков</h2>

      {connectedCalls.length === 0 ? (
        <p>Вы не подключены ни к одному аудиозвонку</p>
      ) : (
        <table className={styles.calls_table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Дата создания</th>
              <th>Создатель</th>
              <th>Участники</th>
            </tr>
          </thead>

          <tbody>
            {connectedCalls.map(call => (
              <>
                <tr
                  key={call.id}
                  className={styles.clickable_row}
                  onClick={() =>
                    setSelectedCall(prev => (prev?.id === call.id ? null : call))
                  }
                >
                  <td>{call.id}</td>
                  <td>{call.title}</td>
                  <td>{new Date(call.created_at).toLocaleDateString()}</td>
                  <td>{call.caller.username}</td>
                  <td>{call.callees.length}</td>
                </tr>

                {selectedCall?.id === call.id && (
                  <tr>
                    <td colSpan={5}>
                      Ссылка для подключения:{" "}
                      <a
                        href={`${import.meta.env.VITE_URL}/calls/connect/${call.uuid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {`${import.meta.env.VITE_URL}/calls/connect/${call.uuid}`}
                      </a>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
