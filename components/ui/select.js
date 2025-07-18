import * as React from "react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef(({ className, ...props }, ref) => (
  <select
    className={cn(
      "flex h-10 w-full rounded-lg  border-gray-500 bg-white px-3 py-2 text-sm text-gray-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 hover:border-gray-400 focus:border-blue-500 shadow-sm hover:shadow-md focus:shadow-md",
      className
    )}
    ref={ref}
    {...props}
  />
));
Select.displayName = "Select";

export { Select };
