import { Button } from "@/components/ui/button";

type EntityToolbarProps = {
  searchLabel?: string;
  addLabel?: string;
  onSearch?: () => void;
  onAdd?: () => void;
};

export default function EntityToolbar({
  searchLabel = "Search",
  addLabel = "Add",
  onSearch,
  onAdd,
}: EntityToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {onSearch && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onSearch}
        >
          {searchLabel}
        </Button>
      )}

      {onAdd && (
        <Button type="button" size="sm" onClick={onAdd}>
          {addLabel}
        </Button>
      )}
    </div>
  );
}