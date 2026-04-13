"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const router = useRouter();
  const admin = useAppSelector((s) => s.auth.admin);

  useEffect(() => {
    if (admin) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [admin, router]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="spinner" />
    </div>
  );
}
