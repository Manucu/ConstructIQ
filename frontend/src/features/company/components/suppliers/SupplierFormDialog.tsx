import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  Supplier,
  SupplierStatus,
} from "../../data/suppliers";

import type { SaveSupplierValues } from "../../hooks/useCompanySuppliers";

type SupplierFormDialogProps = {
  open: boolean;
  editingSupplier: Supplier | null;
  onClose: () => void;
  onSave: (values: SaveSupplierValues) => void;
};

export default function SupplierFormDialog({
  open,
  editingSupplier,
  onClose,
  onSave,
}: SupplierFormDialogProps) {
  const [name, setName] = useState(
    editingSupplier?.name ?? ""
  );

  const [vatNumber, setVatNumber] = useState(
    editingSupplier?.vatNumber ?? ""
  );

  const [email, setEmail] = useState(
    editingSupplier?.email ?? ""
  );

  const [phone, setPhone] = useState(
    editingSupplier?.phone ?? ""
  );

  const [address, setAddress] = useState(
    editingSupplier?.address ?? ""
  );

  const [status, setStatus] =
    useState<SupplierStatus>(
      editingSupplier?.status ?? "ACTIVE"
    );

  const isValid = name.trim() !== "";

  function resetForm() {
    setName("");
    setVatNumber("");
    setEmail("");
    setPhone("");
    setAddress("");
    setStatus("ACTIVE");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSave() {
    if (!isValid) {
      return;
    }

    onSave({
      name: name.trim(),
      vatNumber:
        vatNumber.trim() || undefined,
      email:
        email.trim() || undefined,
      phone:
        phone.trim() || undefined,
      address:
        address.trim() || undefined,
      status,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingSupplier
          ? "Edit Supplier"
          : "Add Supplier"
      }
      description={
        editingSupplier
          ? `Update ${editingSupplier.name}.`
          : "Add a new supplier to the company."
      }
      onClose={handleClose}
      footer={
        <>
          <AppButton
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </AppButton>

          <AppButton
            type="button"
            disabled={!isValid}
            onClick={handleSave}
          >
            {editingSupplier
              ? "Save Changes"
              : "Add Supplier"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Supplier Name"
          value={name}
          placeholder="Example: Holcim"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <AppInput
          label="VAT Number"
          value={vatNumber}
          placeholder="Example: RO12345678"
          onChange={(event) => {
            setVatNumber(event.target.value);
          }}
        />

        <AppInput
          label="Email"
          type="email"
          value={email}
          placeholder="office@supplier.com"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <AppInput
          label="Phone"
          type="tel"
          value={phone}
          placeholder="+40 700 000 000"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />

        <AppInput
          label="Address"
          value={address}
          placeholder="City, Country"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) => {
              setStatus(
                event.target
                  .value as SupplierStatus
              );
            }}
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            Suppliers will later be linked to materials, invoices,
            purchase records, project expenses and reports.
          </p>
        </div>
      </div>
    </AppModal>
  );
}