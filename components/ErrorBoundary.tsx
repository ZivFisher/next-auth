"use client";

import { useState, useEffect } from "react";

const ErrorBoundary = ({ children }: any) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: any) => {
      // Update state to indicate an error has occurred
      setHasError(true);

      // You can log the error or send it to a logging service
      console.error("Error caught by error boundary:", error);
    };

    // Attach the error handler to the global error event
    window.addEventListener("error", errorHandler);

    return () => {
      // Detach the error handler when the component unmounts
      window.removeEventListener("error", errorHandler);
    };
  }, []); // Run effect only once when the component mounts

  if (hasError) {
    // You can render a fallback UI here
    return <p>Something went wrong. Please try again later.</p>;
  }

  // Render the child components normally
  return children;
};

export default ErrorBoundary;
