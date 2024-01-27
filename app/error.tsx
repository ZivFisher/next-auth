"use client";

import { ReactNode } from "react";

export default function GlobalError({
  error,
  reset,
  children,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  children: ReactNode;
}) {
  return <div>Error in reviewId{children}</div>;
}
