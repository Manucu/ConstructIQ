import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
} from "react";

import { AppInput } from "@/components/ui/AppInput";

type TemplateTextFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  error?: string | null;
  required?: boolean;
  autoFocus?: boolean;
  list?: string;
  onChange: (value: string) => void;
};

export default function TemplateTextField({
  label,
  value,
  placeholder,
  type = "text",
  error,
  required,
  autoFocus,
  list,
  onChange,
}: TemplateTextFieldProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    onChange(event.target.value);
  }

  return (
    <div>
      <AppInput
        label={label}
        value={value}
        type={type}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        list={list}
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
