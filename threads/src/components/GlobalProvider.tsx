import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your global state
interface GlobalState {
  shirt: string;
  pants: string;
  setShirt: (name: string) => void;
  setPants: (name: string) => void;
}

// Create context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shirt, setShirt] = useState<string>("/images/shirt.png");
  const [pants, setPants] = useState<string>("");


  return (
    <GlobalContext.Provider value={{ shirt, pants, setShirt, setPants }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook for accessing global state
export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};

// provider code given by chatgpt https://chatgpt.com/share/67e6f76e-cfdc-8006-99e6-24a47c842088