import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { LoginButton } from "@/components/auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-xl",
            font.className
          )}
        >
          {process.env.APPLICATION_NAME}
        </h1>
        <p className="text-lg">A simple authentication service</p>
        <div>
          <LoginButton asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
