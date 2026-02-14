import React, { createContext, useContext, useState, useEffect } from "react";
import { portfolios, properties } from "./mock-data";

interface PortfolioContextType {
  selectedPortfolioId: string;
  setSelectedPortfolioId: (id: string) => void;
  filteredProperties: typeof properties;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  // Default to first portfolio or load from localStorage
  const [selectedPortfolioId, setSelectedPortfolioIdState] = useState(() => {
    const saved = localStorage.getItem("selectedPortfolioId");
    return saved || portfolios[0]?.id || "";
  });

  useEffect(() => {
    localStorage.setItem("selectedPortfolioId", selectedPortfolioId);
  }, [selectedPortfolioId]);

  const setSelectedPortfolioId = (id: string) => {
    setSelectedPortfolioIdState(id);
  };

  const filteredProperties = properties.filter(p => p.portfolioId === selectedPortfolioId);

  return (
    <PortfolioContext.Provider value={{ selectedPortfolioId, setSelectedPortfolioId, filteredProperties }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
