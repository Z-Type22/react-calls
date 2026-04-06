import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from "@/shared/api/client";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  avatar: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await api.post("auth/logout");
    setCurrentUser(null);
    navigate("/login");
  };

  const loadCurrentUser = async () => {
    try {
      const response = await api.get("users/me");
      setCurrentUser(response.data);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        setCurrentUser(null);
      } else {
        console.error("Failed to load user", error);
      }
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  return context ?? { 
    currentUser: null, 
    setCurrentUser: () => {}, 
    logout: () => {},
    loading: false,
  };
};
