"use client";
import { useAppSelector } from "@/hooks/store.hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token } = useAppSelector((store) => store.userReducer);
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  return <>
     {children}
  </>;
}
