import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

const Toast = React.forwardRef(({ className, type = "info", title, description, onClose, ...props }, ref) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const styles = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  };

  const iconStyles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500"
  };

  const Icon = icons[type];

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg border p-4 shadow-lg transition-all duration-300 animate-slideIn",
        styles[type],
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn("h-5 w-5 mt-0.5", iconStyles[type])} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-medium text-sm">{title}</h4>
          )}
          {description && (
            <p className="text-sm opacity-90 mt-1">{description}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});
Toast.displayName = "Toast";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            type={toast.type}
            title={toast.title}
            description={toast.description}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </>
  );
};

export { Toast, ToastProvider };
