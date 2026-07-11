import type { ReactNode } from "react";

import { X } from "lucide-react";

import { AppButton } from "@/components/ui/AppButton";

type AppModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
};

export function AppModal({
  open,
  title,
  description,
  children,
  footer,
  onClose,
}: AppModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="app-modal-title"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b p-6">
          <div>
            <h2 id="app-modal-title" className="text-xl font-semibold">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          <AppButton
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </AppButton>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-2 border-t p-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}