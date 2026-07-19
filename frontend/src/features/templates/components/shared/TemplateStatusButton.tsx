type TemplateStatus = "ACTIVE" | "INACTIVE";

type TemplateStatusButtonProps = {
  status: TemplateStatus;
  onToggle: () => void;
};

export default function TemplateStatusButton({
  status,
  onToggle,
}: TemplateStatusButtonProps) {
  const isActive = status === "ACTIVE";

  return (
    <button
      type="button"
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold transition",
        isActive
          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      ].join(" ")}
      onClick={onToggle}
    >
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}
