"use client";
import { myStore } from "@/store/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={myStore}>{children}</Provider>;
}
