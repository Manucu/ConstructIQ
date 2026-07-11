import { Search } from "lucide-react";

import { AppInput } from "@/components/ui/AppInput";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  label = "Search",
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <AppInput
      label={label}
      icon={Search}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}