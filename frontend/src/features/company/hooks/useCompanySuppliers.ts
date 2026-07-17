import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  Supplier,
  SupplierStatus,
} from "../data/suppliers";

export type SaveSupplierValues = {
  name: string;
  vatNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: SupplierStatus;
};

export function useCompanySuppliers() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const suppliers = companyData.suppliers;

  const [searchValue, setSearchValue] = useState("");
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] =
    useState(false);

  const [editingSupplier, setEditingSupplier] =
    useState<Supplier | null>(null);

  const filteredSuppliers = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return suppliers;
    }

    return suppliers.filter((supplier) => {
      return (
        supplier.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        supplier.status
          .toLowerCase()
          .includes(normalizedSearch) ||
        supplier.vatNumber
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        supplier.email
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        supplier.phone
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        supplier.address
          ?.toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [searchValue, suppliers]);

  function openAddSupplierDialog() {
    setEditingSupplier(null);
    setIsSupplierDialogOpen(true);
  }

  function openEditSupplierDialog(
    supplier: Supplier
  ) {
    setEditingSupplier(supplier);
    setIsSupplierDialogOpen(true);
  }

  function closeSupplierDialog() {
    setEditingSupplier(null);
    setIsSupplierDialogOpen(false);
  }

  function saveSupplier(
    values: SaveSupplierValues
  ) {
    if (editingSupplier) {
      setCompanyData((currentData) => ({
        ...currentData,
        suppliers: currentData.suppliers.map(
          (supplier) =>
            supplier.id === editingSupplier.id
              ? {
                  ...supplier,
                  ...values,
                }
              : supplier
        ),
      }));

      closeSupplierDialog();
      return;
    }

    const newSupplier: Supplier = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      suppliers: [
        ...currentData.suppliers,
        newSupplier,
      ],
    }));

    closeSupplierDialog();
  }

  function toggleSupplierStatus(
    supplierId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      suppliers: currentData.suppliers.map(
        (supplier) =>
          supplier.id === supplierId
            ? {
                ...supplier,
                status:
                  supplier.status === "ACTIVE"
                    ? "INACTIVE"
                    : "ACTIVE",
              }
            : supplier
      ),
    }));
  }

  function deleteSupplier(
    supplierId: string
  ) {
    setCompanyData((currentData) => ({
      ...currentData,
      suppliers:
        currentData.suppliers.filter(
          (supplier) =>
            supplier.id !== supplierId
        ),
    }));
  }

  return {
    suppliers,
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
  };
}