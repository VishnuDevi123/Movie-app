import { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export const useAuthModal = () => useContext(AuthModalContext);

export const AuthModalProvider = ({ children }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};