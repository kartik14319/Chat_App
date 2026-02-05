import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("ChatApp");
  const [authUser, setAuthUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  // Keep state & localStorage in sync
  const updateAuthUser = (userData) => {
    if (userData) {
      localStorage.setItem("ChatApp", JSON.stringify(userData));
    } else {
      localStorage.removeItem("ChatApp");
    }
    setAuthUser(userData);
  };

  return (
    <AuthContext.Provider value={[authUser, updateAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
