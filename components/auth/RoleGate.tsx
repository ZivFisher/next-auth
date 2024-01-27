/*
 * Role Gate allows the developer to show content based role.
 */
import { useCurrentRole } from "@/hooks/useCurrentRole";
import { UserRole } from "@prisma/client";
import { ReactNode } from "react";

interface RoleGateProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export const RoleGate = ({ allowedRoles, children }: RoleGateProps) => {
  const roles = useCurrentRole();
  if (roles && allowedRoles?.includes(roles)) {
    return children;
  }
};
