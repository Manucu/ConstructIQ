import { useMemo, useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppModal } from "@/components/ui/AppModal";
import SearchInput from "@/components/common/SearchInput";

type EntitySelectDialogProps<T> = {
  open: boolean;
  title: string;
  description?: string;
  items: T[];
  searchPlaceholder?: string;
  emptyMessage?: string;
  getItemId: (item: T) => string;
  getItemLabel: (item: T) => string;
  getItemDescription?: (item: T) => string | undefined;
  onClose: () => void;
  onSelect: (item: T) => void;
};

export default function EntitySelectDialog<T>({
  open,
  title,
  description,
  items,
  searchPlaceholder = "Search...",
  emptyMessage = "No matching items found.",
  getItemId,
  getItemLabel,
  getItemDescription,
  onClose,
  onSelect,
}: EntitySelectDialogProps<T>) {
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return items;
    }

    return items.filter((item) => {
      const label = getItemLabel(item).toLowerCase();
      const itemDescription =
        getItemDescription?.(item)?.toLowerCase() ?? "";

      return (
        label.includes(normalizedSearch) ||
        itemDescription.includes(normalizedSearch)
      );
    });
  }, [
    getItemDescription,
    getItemLabel,
    items,
    searchValue,
  ]);

  function handleClose() {
    setSearchValue("");
    onClose();
  }

  function handleSelect(item: T) {
    onSelect(item);
    setSearchValue("");
    onClose();
  }

  return (
    <AppModal
      open={open}
      title={title}
      description={description}
      onClose={handleClose}
      footer={
        <AppButton
          type="button"
          variant="outline"
          onClick={handleClose}
        >
          Cancel
        </AppButton>
      }
    >
      <div className="space-y-4">
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search"
          placeholder={searchPlaceholder}
        />

        {filteredItems.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredItems.map((item) => {
              const itemDescription = getItemDescription?.(item);

              return (
                <button
                  key={getItemId(item)}
                  type="button"
                  className="flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors hover:bg-slate-50"
                  onClick={() => handleSelect(item)}
                >
                  <div>
                    <p className="font-medium">
                      {getItemLabel(item)}
                    </p>

                    {itemDescription && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {itemDescription}
                      </p>
                    )}
                  </div>

                  <span className="text-sm font-medium text-blue-700">
                    Select
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </AppModal>
  );
}