import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-slate-400">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
