import { useState } from "react";

import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { AppModal } from "@/components/ui/AppModal";

import type {
  Client,
  ClientStatus,
} from "../../data/clients";

import type {
  ClientType,
  SaveClientValues,
} from "../../hooks/useCompanyClients";

type ClientFormDialogProps = {
  open: boolean;
  editingClient: Client | null;
  onClose: () => void;
  onSave: (values: SaveClientValues) => void;
};

export default function ClientFormDialog({
  open,
  editingClient,
  onClose,
  onSave,
}: ClientFormDialogProps) {
  const [name, setName] = useState(
    editingClient?.name ?? ""
  );

  const [type, setType] =
    useState<ClientType>(
      editingClient?.type ?? "PERSON"
    );

  const [status, setStatus] =
    useState<ClientStatus>(
      editingClient?.status ?? "ACTIVE"
    );

  const [email, setEmail] = useState(
    editingClient?.email ?? ""
  );

  const [phone, setPhone] = useState(
    editingClient?.phone ?? ""
  );

  const [address, setAddress] = useState(
    editingClient?.address ?? ""
  );

  const isValid = name.trim() !== "";

  function resetForm() {
    setName("");
    setType("PERSON");
    setStatus("ACTIVE");
    setEmail("");
    setPhone("");
    setAddress("");
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
      type,
      status,
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      address: address.trim() || undefined,
    });

    resetForm();
  }

  return (
    <AppModal
      open={open}
      title={
        editingClient
          ? "Edit Client"
          : "Add Client"
      }
      description={
        editingClient
          ? `Update ${editingClient.name}.`
          : "Add a new client to the company."
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
            {editingClient
              ? "Save Changes"
              : "Add Client"}
          </AppButton>
        </>
      }
    >
      <div className="space-y-4">
        <AppInput
          label="Client Name"
          value={name}
          placeholder="Example: Construct Beneficiar SRL"
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <div>
          <label className="text-sm font-medium text-slate-700">
            Client Type
          </label>

          <select
            value={type}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) =>
              setType(
                event.target.value as ClientType
              )
            }
          >
            <option value="PERSON">
              Individual
            </option>

            <option value="COMPANY">
              Company
            </option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-700"
            onChange={(event) =>
              setStatus(
                event.target
                  .value as ClientStatus
              )
            }
          >
            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <AppInput
          label="Email"
          value={email}
          placeholder="client@example.com"
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <AppInput
          label="Phone"
          value={phone}
          placeholder="+40 700 000 000"
          onChange={(event) =>
            setPhone(event.target.value)
          }
        />

        <AppInput
          label="Address"
          value={address}
          placeholder="City, Country"
          onChange={(event) =>
            setAddress(event.target.value)
          }
        />

        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="text-sm text-blue-900">
            Clients will later be linked to projects,
            invoices, contracts and reports.
          </p>
        </div>
      </div>
    </AppModal>
  );
}