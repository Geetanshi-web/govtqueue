import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Token, generateTokenNumber, offices } from '@/data/mockData';

interface TokenContextType {
  tokens: Token[];
  activeToken: Token | null;
  generateToken: (officeId: string, service: string) => Token;
  cancelToken: (tokenId: string) => void;
  getTokensByOffice: (officeId: string) => Token[];
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Token[]>(() => {
    const saved = localStorage.getItem('gov-queue-tokens');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((t: Token) => ({
        ...t,
        createdAt: new Date(t.createdAt),
      }));
    }
    return [];
  });

  const activeToken = tokens.find((t) => t.status === 'waiting') || null;

  useEffect(() => {
    localStorage.setItem('gov-queue-tokens', JSON.stringify(tokens));
  }, [tokens]);

  // Simulate queue movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((prev) =>
        prev.map((token) => {
          if (token.status === 'waiting' && token.queuePosition > 1) {
            const newPosition = Math.max(1, token.queuePosition - 1);
            const newEstimatedTime = Math.max(5, token.estimatedTime - 3);
            return {
              ...token,
              queuePosition: newPosition,
              estimatedTime: newEstimatedTime,
            };
          }
          return token;
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const generateToken = (officeId: string, service: string): Token => {
    const office = offices.find((o) => o.id === officeId);
    if (!office) throw new Error('Office not found');

    const newToken: Token = {
      id: crypto.randomUUID(),
      tokenNumber: generateTokenNumber(officeId),
      officeId,
      officeName: office.name,
      service,
      queuePosition: office.queueLength + 1,
      estimatedTime: office.avgWaitTime + Math.floor(Math.random() * 15),
      createdAt: new Date(),
      status: 'waiting',
    };

    setTokens((prev) => [...prev, newToken]);
    return newToken;
  };

  const cancelToken = (tokenId: string) => {
    setTokens((prev) =>
      prev.map((token) =>
        token.id === tokenId ? { ...token, status: 'cancelled' as const } : token
      )
    );
  };

  const getTokensByOffice = (officeId: string) => {
    return tokens.filter((t) => t.officeId === officeId);
  };

  return (
    <TokenContext.Provider
      value={{ tokens, activeToken, generateToken, cancelToken, getTokensByOffice }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
