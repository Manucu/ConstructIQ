import type {
  ReactNode,
} from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppModal } from "@/components/ui/AppModal";

type TemplateDialogProps = {
  open: boolean;
  title: string;
  description: string;
  saveLabel: string;
  isValid: boolean;
  error?: string | null;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
};

export default function TemplateDialog({
  open,
  title,
  description,
  saveLabel,
  isValid,
  error,
  children,
  onClose,
  onSave,
}: TemplateDialogProps) {
  return (
    <AppModal
      open={open}
      title={title}
      description={description}
      onClose={onClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </AppButton>

          <AppButton
            type="button"
            disabled={!isValid}
            onClick={onSave}
          >
            {saveLabel}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        {children}

        {error && (
          <p
            role="alert"
            className="text-sm text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    </AppModal>
  );
}
