import type {
  ChangeEvent,
} from "react";

export type TemplateSelectOption<
  TValue extends string = string,
> = {
  value: TValue;
  label: string;
};

type TemplateSelectFieldProps<
  TValue extends string,
> = {
  label: string;
  value: TValue;
  options: readonly TemplateSelectOption<TValue>[];
  onChange: (value: TValue) => void;
};

export default function TemplateSelectField<
  TValue extends string,
>({
  label,
  value,
  options,
  onChange,
}: TemplateSelectFieldProps<TValue>) {
  function handleChange(
    event: ChangeEvent<HTMLSelectElement>
  ) {
    onChange(event.target.value as TValue);
  }

  return (
    <div>
      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
        onChange={handleChange}
      >
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
