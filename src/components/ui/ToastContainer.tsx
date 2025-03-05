import { useEffect, useState } from "react";
import clsx from "clsx";
import CheckIcon from "../common/icons/CheckIcon";
import XIcon from "../common/icons/XIcon";
import AlertIcon from "../common/icons/AlertIcon";
import InfoCircleIcon from "../common/icons/InfoCircleIcon";
import { useToast } from "../../hooks/useToast";

const icons = {
  success: <CheckIcon className="text-green-500" />,
  error: <XIcon className="text-red-500" />,
  warning: <AlertIcon className="text-yellow-500" />,
  info: <InfoCircleIcon className="text-blue-500" />,
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();
  const [visibleToasts, setVisibleToasts] = useState(toasts);

  useEffect(() => {
    setVisibleToasts(toasts);
  }, [toasts]);

  return (

    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {visibleToasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx("flex items-center gap-4 px-4 py-3 bg-white dark:bg-[#282828] shadow-lg border-l-4 transition-all", toasts.includes(toast) ? "animate-slide-in" : "animate-slide-out")}
          style={{
            borderColor:
              toast.type === "success"
                ? "#10B981"
                : toast.type === "error"
                  ? "#EF4444"
                  : toast.type === "warning"
                    ? "#F59E0B"
                    : "#3B82F6",
          }}
          onAnimationEnd={() => {
            if (!toasts.includes(toast)) {
              setVisibleToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }
          }}
        >
          {icons[toast.type]}
          <div className="">
            <h6 className="font-semibold dark:text-white uppercase">{toast.type}</h6>
            <p className="text-sm font-medium text-gray-800 dark:text-neutral-400">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-auto text-gray-400 dark:text-neutral-400 hover:text-neutral-400 dark:hover:text-white cursor-pointer self-start"
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}
