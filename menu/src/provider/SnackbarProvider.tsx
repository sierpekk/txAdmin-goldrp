import React, { createContext, useCallback, useContext, useState } from "react";
import { Fade, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackbarContext = createContext(null);

type SnackbarAlertSeverities = "success" | "error" | "warning" | "info";

interface SnackbarAlert {
  level: SnackbarAlertSeverities;
  message: string;
}

interface SnackbarProviderContext {
  openSnackbar: (level: SnackbarAlertSeverities, message: string) => void;
  closeSnackbar: () => void;
}

export const SnackbarProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<SnackbarAlert>({
    level: "info",
    message: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSnackbar = useCallback(
    (level: SnackbarAlertSeverities, message: string) => {
      setAlert({ level, message });
      setIsOpen(true);
    },
    []
  );

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        openSnackbar,
        closeSnackbar,
      }}
    >
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        TransitionComponent={Fade}
      >
        <Alert severity={alert.level} variant="filled">
          {alert.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () =>
  useContext<SnackbarProviderContext>(SnackbarContext);