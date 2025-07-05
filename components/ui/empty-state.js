import * as React from "react";
import { cn } from "@/lib/utils";

const EmptyState = React.forwardRef(({ 
  className, 
  icon: Icon, 
  title, 
  description, 
  action, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
          <Icon className="w-8 h-8 text-gray-400" />
        </div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
});
EmptyState.displayName = "EmptyState";

export { EmptyState };
