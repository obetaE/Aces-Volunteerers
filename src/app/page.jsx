"use client"
import React, { useEffect, useState } from "react";
import Volunteer from "@/components/Volunteer/Volunteer";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setIsSigningOut(true);
      signOut({ redirect: false }).finally(() => {
        setIsSigningOut(false);
        setShowContent(true);
      });
    } else if (status === "unauthenticated") {
      setShowContent(true);
    }
  }, [status]);

  // Show nothing while signing out or checking session
  if (status === "loading" || isSigningOut) {
    return null; // Or a minimal loader if needed
  }

  // Show content only after sign-out completes or if no session existed
  return showContent ? (
    <div>
      <Volunteer />
    </div>
  ) : null;
}