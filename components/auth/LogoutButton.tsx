"use client";

import { logout } from "@/server-actions/logout";
import { ReactNode } from "react";

const LogoutButton = ({ children }: { children: ReactNode }) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
