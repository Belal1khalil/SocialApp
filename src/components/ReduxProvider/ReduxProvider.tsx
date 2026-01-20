"use client";
import { myStore } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={myStore}>
      
      {children}
      <ToastContainer
        position="top-right"
        closeButton={false}
        autoClose={3000}
        closeOnClick={true}
      />
    </Provider>
  );
}
