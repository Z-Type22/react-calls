import React, { useEffect, useState } from "react";
import { api } from "@/shared/api/client";
import { useParams } from "react-router-dom";
import { Loading } from "@/features/ui/Loading/Loading";
import { Sidebar } from "@/features/components/CallDetails/Sidebar/Sidebar";
import { MainSection } from "@/features/components/CallDetails/MainSection/MainSection";
import styles from "./call_details.module.css";

export interface User {
  id: number;
  email: string;
  is_active: boolean;
  username: string;
  avatar: string;
  gender: "man" | "woman" | "other";
}

export interface Call {
  id: number;
  caller: User;
  callees: User[];
  created_at: string;
  is_private: boolean;
}

export const CallDetails: React.FC = () => {
  const { call_id } = useParams<{ call_id: string }>();
  const [call, setCall] = useState<Call | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCall = async () => {
      try {
        const response = await api.get<Call>(`/calls/${call_id}`);
        setCall(response.data);
      } catch (error) {
        console.error("Failed to fetch call:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCall();
  }, [call_id]);

  const handleCalleesUpdate = (
    updater: (prev: User[]) => User[]
  ) => {
    if (!call) return;

    setCall({
      ...call,
      callees: updater(call.callees),
    });
  };

  if (loading) return <Loading />;
  
  if (!call) return <p>Call not found</p>;

  return (
    <div className={styles.callDetailsContainer}>
      <Sidebar 
        call={call}
        onCalleesUpdate={handleCalleesUpdate}
      />
      <MainSection
        callId={Number(call_id)}
        callees={[...call.callees]}
        onCalleesUpdate={handleCalleesUpdate}
      />
    </div>
  );
};
