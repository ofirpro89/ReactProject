import { jwtDecode } from "jwt-decode"; // ✅ תיקון חשוב

interface MyTokenPayload {
  _id: string;
  email?: string;
  isBusiness?: boolean;
  exp?: number;
  iat?: number;
}

const useToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decoded = jwtDecode<MyTokenPayload>(token);
      return decoded._id;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  }

  return null;
};

export default useToken;
