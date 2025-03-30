import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your global state
interface GlobalState {
  shirt: number;
  pants: number;
  design: number;
  setShirt: (id: number) => void;
  setPants: (id: number) => void;
  setDesign: (id: number) => void;
}

// Create context
const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shirt, setShirt] = useState<number>(-1);
  const [pants, setPants] = useState<number>(-1);
  const [design, setDesign] = useState<number>(-1);



  return (
    <GlobalContext.Provider value={{ shirt, pants, design, setShirt, setPants, setDesign }}>
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