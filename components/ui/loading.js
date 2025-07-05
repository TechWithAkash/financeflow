import * as React from "react";
import { cn } from "@/lib/utils";

const LoadingSpinner = React.forwardRef(({ className, size = "default", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "animate-spin rounded-full border-2 border-current border-t-transparent",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});
LoadingSpinner.displayName = "LoadingSpinner";

const LoadingCard = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card p-6 animate-pulse",
      className
    )}
    {...props}
  >
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-8 bg-gray-200 rounded-md w-full"></div>
      <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
    </div>
  </div>
));
LoadingCard.displayName = "LoadingCard";

const LoadingState = ({ children, isLoading, fallback }) => {
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  return children;
};

export { LoadingSpinner, LoadingCard, LoadingState };
