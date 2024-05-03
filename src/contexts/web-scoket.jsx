import { createContext, useState } from "react";

export const WebSocketContext = createContext({});
export const WebSocketProvider = ({ children }) => {
  const [amountOfSentEmails, setamountOfSentEmails] = useState(0);
  return (
    <WebSocketContext.Provider
      value={{ amountOfSentEmails, setamountOfSentEmails }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
