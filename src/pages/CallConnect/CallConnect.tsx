import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styles from "./call_connect.module.css";
import { Loading } from "@/features/ui/Loading/Loading";

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface WSMessage {
  event: "answer" | "peer_left" | "peer_joined";
  sdp?: string;
  type?: RTCSdpType;
  user?: User;
  user_id?: string;
  users?: User[];
}

export const CallConnect = () => {
  const { call_id } = useParams<{ call_id: string }>();

  const [connected, setConnected] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const handleUnload = () => {
      wsRef.current?.close();
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
      pcRef.current?.close();
      pcRef.current = null;
      localStreamRef.current = null;
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleConnect = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStreamRef.current = localStream;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    pcRef.current = pc;

    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    pc.ontrack = e => {
      e.streams[0].getTracks().forEach(track => {
        const audio = document.createElement("audio");
        audio.srcObject = new MediaStream([track]);
        audio.autoplay = true;
        (audio as any).playsInline = true;
        document.body.appendChild(audio);
      });
    };

    const ws = new WebSocket(`${import.meta.env.VITE_WS_URL}/${import.meta.env.VITE_BACKEND_API_VERSION}/calls/offer`)
    wsRef.current = ws;

    ws.onopen = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      ws.send(JSON.stringify({
        call_id,
        type: offer.type,
        sdp: offer.sdp
      }));

      setLoading(true);
    };

    ws.onmessage = async (event) => {
      const data: WSMessage = JSON.parse(event.data);

      console.log(data.event);

      switch (data.event) {
        case "answer":
          if (pcRef.current && data.sdp && data.type) {
            await pcRef.current.setRemoteDescription({
              type: data.type,
              sdp: data.sdp,
            });
          }
          setLoading(false);

          setConnected(true);

          break;
          
        case "peer_joined":
          if (data.users) {
            setUsers(data.users);
          }
          break;

        case "peer_left":
          if (data.user_id) {
            setUsers(prev => prev.filter(u => u.id !== data.user_id));
          }
          break;
      }
    };

    ws.onclose = () => {
      setConnected(false);
      pcRef.current?.close();
      pcRef.current = null;
      localStreamRef.current?.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
      setUsers([]);
    };
  };

  const handleDisconnect = () => {
    wsRef.current?.close();
  };

  if (loading) return <Loading minHeight="90vh" />;

  return (
    <div className={styles.wrapper}>
      {!connected ? (
        <div className={styles.card}>
          <button
            className={styles.connectButton}
            onClick={handleConnect}
            disabled={loading}
          >
            Подключиться к аудиовстрече
          </button>
        </div>
      ) : (
        <div className={styles.card}>
          <div className={styles.users}>
            {users.map(u => (
              <div key={u.id} className={styles.userItem}>
                <img
                  src={
                    u.avatar
                      ? `${import.meta.env.VITE_BACKEND_URL}${u.avatar}`
                      : import.meta.env.VITE_AVATAR_URL
                  }
                  className={styles.avatar}
                />
                <span className={styles.username}>{u.username}</span>
              </div>
            ))}
          </div>
          <button className={styles.disconnectButton} onClick={handleDisconnect}>
            Отключиться
          </button>
        </div>
      )}
    </div>
  );
};