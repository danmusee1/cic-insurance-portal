import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Navigate, useNavigate } from "react-router";

type User = { id: number; name: string; email: string };
type UserContextType = {
  user: User | null;
  token: string | null;
  setUser: (user: User | null, token?: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // <-- Add loading state
const navigate=useNavigate()

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('JWT decoding failed:', err);
    return null;
  }
}

useEffect(() => {
  const userCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('userData='));

  if (userCookie) {
    const token = decodeURIComponent(userCookie.split('=')[1]);
    const decodedUser = parseJwt(token);

    if (decodedUser) {
      console.log('Decoded user from JWT:', decodedUser);
      setUserState(decodedUser);
      setTokenState(token);

      // Save to localStorage for consistency
      localStorage.setItem('user', JSON.stringify(decodedUser));
      localStorage.setItem('token', token);
    }
  }

  setLoading(false);
}, []);



  const setUser = (user: User | null, token: string | null = null) => {
    setUserState(user);
    setTokenState(token);

    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate('/')
  };

  if (loading) return null; // Don't render children until loaded

  return (
    <UserContext.Provider value={{ user, token, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
};
