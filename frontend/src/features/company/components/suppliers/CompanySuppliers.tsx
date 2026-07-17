import {
  Pencil,
  Power,
  PowerOff,
  Truck,
  Trash2,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { useCompanySuppliers } from "../../hooks/useCompanySuppliers";

import SupplierFormDialog from "./SupplierFormDialog";

export default function CompanySuppliers() {
  const {
    filteredSuppliers,
    searchValue,
    isSupplierDialogOpen,
    editingSupplier,

    setSearchValue,

    openAddSupplierDialog,
    openEditSupplierDialog,
    closeSupplierDialog,

    saveSupplier,
    toggleSupplierStatus,
    deleteSupplier,
  } = useCompanySuppliers();

  return (
    <>
      <SectionCard
        title="Suppliers"
        icon="🚚"
        actions={
          <AppButton
            type="button"
            onClick={openAddSupplierDialog}
          >
            <Truck className="mr-2 h-4 w-4" />
            Add Supplier
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search suppliers"
          placeholder="Search by name, VAT number, email, phone, address or status..."
        />

        {filteredSuppliers.length === 0 ? (
          <EmptyState
            icon="🚚"
            title="No suppliers found"
            description={
              searchValue.trim()
                ? "No suppliers match the current search."
                : "Add the first supplier to the company."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddSupplierDialog}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Add First Supplier
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredSuppliers.map((supplier) => (
              <EntityRow
                key={supplier.id}
                title={supplier.name}
                subtitle={
                  supplier.vatNumber
                    ? `VAT: ${supplier.vatNumber}`
                    : "No VAT number"
                }
                description={
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {supplier.email && (
                      <p>Email: {supplier.email}</p>
                    )}

                    {supplier.phone && (
                      <p>Phone: {supplier.phone}</p>
                    )}

                    {supplier.address && (
                      <p>Address: {supplier.address}</p>
                    )}
                  </div>
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      Supplier
                    </Badge>

                    <StatusBadge status={supplier.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${supplier.name}`}
                      onClick={() => {
                        openEditSupplierDialog(supplier);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        supplier.status === "ACTIVE"
                          ? `Deactivate ${supplier.name}`
                          : `Activate ${supplier.name}`
                      }
                      onClick={() => {
                        toggleSupplierStatus(supplier.id);
                      }}
                    >
                      {supplier.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${supplier.name}`}
                      onClick={() => {
                        deleteSupplier(supplier.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </AppButton>
                  </div>
                }
              />
            ))}
          </div>
        )}
      </SectionCard>

      {isSupplierDialogOpen && (
        <SupplierFormDialog
          key={editingSupplier?.id ?? "new-supplier"}
          open={isSupplierDialogOpen}
          editingSupplier={editingSupplier}
          onClose={closeSupplierDialog}
          onSave={saveSupplier}
        />
      )}
    </>
  );
}