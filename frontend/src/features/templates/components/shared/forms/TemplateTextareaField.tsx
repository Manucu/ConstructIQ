import type {
  ChangeEvent,
} from "react";

type TemplateTextareaFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
};

export default function TemplateTextareaField({
  label,
  value,
  placeholder,
  rows = 4,
  onChange,
}: TemplateTextareaFieldProps) {
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement>
  ) {
    onChange(event.target.value);
  }

  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        onChange={handleChange}
      />
    </div>
  );
}
