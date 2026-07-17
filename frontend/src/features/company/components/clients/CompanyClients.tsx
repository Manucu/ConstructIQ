import {
  Building2,
  Pencil,
  Power,
  PowerOff,
  Trash2,
  UserPlus,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import EntityRow from "@/components/common/EntityRow";
import SearchInput from "@/components/common/SearchInput";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";

import { AppButton } from "@/components/ui/AppButton";
import { Badge } from "@/components/ui/badge";

import { useCompanyClients } from "../../hooks/useCompanyClients";

import ClientFormDialog from "./ClientFormDialog";

export default function CompanyClients() {
  const {
    filteredClients,
    searchValue,
    isClientDialogOpen,
    editingClient,

    setSearchValue,

    openAddClientDialog,
    openEditClientDialog,
    closeClientDialog,

    saveClient,
    toggleClientStatus,
    deleteClient,
  } = useCompanyClients();

  return (
    <>
      <SectionCard
        title="Clients"
        icon="👥"
        actions={
          <AppButton
            type="button"
            onClick={openAddClientDialog}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </AppButton>
        }
      >
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          label="Search clients"
          placeholder="Search by name, type, email, phone, address or status..."
        />

        {filteredClients.length === 0 ? (
          <EmptyState
            icon="👥"
            title="No clients found"
            description={
              searchValue.trim()
                ? "No clients match the current search."
                : "Add the first client to the company."
            }
            action={
              !searchValue.trim() ? (
                <AppButton
                  type="button"
                  variant="outline"
                  onClick={openAddClientDialog}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add First Client
                </AppButton>
              ) : undefined
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <EntityRow
                key={client.id}
                title={client.name}
                subtitle={
                  client.type === "COMPANY"
                    ? "Company"
                    : "Individual"
                }
                description={
                  <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {client.email && (
                      <p>Email: {client.email}</p>
                    )}

                    {client.phone && (
                      <p>Phone: {client.phone}</p>
                    )}

                    {client.address && (
                      <p>Address: {client.address}</p>
                    )}
                  </div>
                }
                actions={
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline">
                      {client.type === "COMPANY" ? (
                        <>
                          <Building2 className="mr-1 h-3.5 w-3.5" />
                          Company
                        </>
                      ) : (
                        "Individual"
                      )}
                    </Badge>

                    <StatusBadge status={client.status} />

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Edit ${client.name}`}
                      onClick={() => {
                        openEditClientDialog(client);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={
                        client.status === "ACTIVE"
                          ? `Deactivate ${client.name}`
                          : `Activate ${client.name}`
                      }
                      onClick={() => {
                        toggleClientStatus(client.id);
                      }}
                    >
                      {client.status === "ACTIVE" ? (
                        <PowerOff className="h-4 w-4" />
                      ) : (
                        <Power className="h-4 w-4" />
                      )}
                    </AppButton>

                    <AppButton
                      type="button"
                      size="icon"
                      variant="ghost"
                      aria-label={`Delete ${client.name}`}
                      onClick={() => {
                        deleteClient(client.id);
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

      {isClientDialogOpen && (
        <ClientFormDialog
          key={editingClient?.id ?? "new-client"}
          open={isClientDialogOpen}
          editingClient={editingClient}
          onClose={closeClientDialog}
          onSave={saveClient}
        />
      )}
    </>
  );
}