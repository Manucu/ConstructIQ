import { Search } from "lucide-react";

import { AppInput } from "@/components/ui/AppInput";

type TemplateSearchBarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export default function TemplateSearchBar({
  value,
  placeholder,
  onChange,
}: TemplateSearchBarProps) {
  return (
    <div className="border-b border-slate-200 p-4">
      <div className="max-w-md">
        <AppInput
          label="Search"
          icon={Search}
          value={value}
          placeholder={placeholder}
          onChange={event => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
