"use client";

import { admin } from "@/server-actions/admin";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { RoleGate } from "@/components/auth/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API route");
      }
    });
  };

  const onApiServerAction = async () => {
    const adminServerAction = await admin();
    if (adminServerAction?.success) {
      toast.success(adminServerAction.success);
    }
    if (adminServerAction?.error) {
      toast.error(adminServerAction.error);
    }
  };
  return (
    <>
      <RoleGate allowedRoles={[UserRole.USER]}>
        You have a USER role and can view this content
      </RoleGate>
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Admin</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <RoleGate allowedRoles={[UserRole.ADMIN]}>
            <FormSuccess message="You have an ADMIN role and can view this content" />
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
              <p className="text-sm font-medium">Admin-only API Route</p>
              <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
              <p className="text-sm font-medium">Admin-only Server Action</p>
              <Button onClick={onApiServerAction}>Click to test</Button>
            </div>
          </RoleGate>
        </CardContent>
      </Card>
    </>
  );
};

export default AdminPage;
