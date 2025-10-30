/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from "react";

export type SnackbarType = "success" | "error";

interface SnackbarContextType {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, t: SnackbarType = "success") => {
    setMessage(msg);
    setType(t);
    setOpen(true);
    setTimeout(() => setOpen(false), 3000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: type === "success" ? "green" : "red",
            color: "white",
            padding: "10px 20px",
            borderRadius: 5,
            zIndex: 1000,
          }}
        >
          {message}
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
