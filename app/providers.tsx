"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1e1e2e",
            color: "#cdd6f4",
            border: "1px solid #313244",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#a6e3a1", secondary: "#1e1e2e" } },
          error: { iconTheme: { primary: "#f38ba8", secondary: "#1e1e2e" } },
        }}
      />
    </Provider>
  );
}
