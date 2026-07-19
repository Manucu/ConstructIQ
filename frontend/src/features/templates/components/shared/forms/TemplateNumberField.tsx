import type {
  ChangeEvent,
} from "react";

import { AppInput } from "@/components/ui/AppInput";

type TemplateNumberFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  min?: number;
  step?: number | "any";
  error?: string | null;
  onChange: (value: string) => void;
};

export default function TemplateNumberField({
  label,
  value,
  placeholder,
  min = 0,
  step = 0.01,
  error,
  onChange,
}: TemplateNumberFieldProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    onChange(event.target.value);
  }

  return (
    <div>
      <AppInput
        label={label}
        type="number"
        min={String(min)}
        step={String(step)}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />

      {error && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
