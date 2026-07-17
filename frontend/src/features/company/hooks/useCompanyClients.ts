import { useMemo, useState } from "react";

import { useCompanyContext } from "../context/useCompanyContext";

import type {
  Client,
  ClientStatus,
} from "../data/clients";

export type ClientType = Client["type"];

export type SaveClientValues = {
  name: string;
  type: ClientType;
  email?: string;
  phone?: string;
  address?: string;
  status: ClientStatus;
};

export function useCompanyClients() {
  const {
    companyData,
    setCompanyData,
  } = useCompanyContext();

  const clients = companyData.clients;

  const [searchValue, setSearchValue] = useState("");
  const [isClientDialogOpen, setIsClientDialogOpen] =
    useState(false);

  const [editingClient, setEditingClient] =
    useState<Client | null>(null);

  const filteredClients = useMemo(() => {
    const normalizedSearch = searchValue
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return clients;
    }

    return clients.filter((client) => {
      return (
        client.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        client.type
          .toLowerCase()
          .includes(normalizedSearch) ||
        client.status
          .toLowerCase()
          .includes(normalizedSearch) ||
        client.email
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        client.phone
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        client.address
          ?.toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [clients, searchValue]);

  function openAddClientDialog() {
    setEditingClient(null);
    setIsClientDialogOpen(true);
  }

  function openEditClientDialog(client: Client) {
    setEditingClient(client);
    setIsClientDialogOpen(true);
  }

  function closeClientDialog() {
    setEditingClient(null);
    setIsClientDialogOpen(false);
  }

  function saveClient(values: SaveClientValues) {
    if (editingClient) {
      setCompanyData((currentData) => ({
        ...currentData,
        clients: currentData.clients.map((client) =>
          client.id === editingClient.id
            ? {
                ...client,
                ...values,
              }
            : client
        ),
      }));

      closeClientDialog();
      return;
    }

    const newClient: Client = {
      id: crypto.randomUUID(),
      ...values,
    };

    setCompanyData((currentData) => ({
      ...currentData,
      clients: [
        ...currentData.clients,
        newClient,
      ],
    }));

    closeClientDialog();
  }

  function toggleClientStatus(clientId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      clients: currentData.clients.map((client) =>
        client.id === clientId
          ? {
              ...client,
              status:
                client.status === "ACTIVE"
                  ? "INACTIVE"
                  : "ACTIVE",
            }
          : client
      ),
    }));
  }

  function deleteClient(clientId: string) {
    setCompanyData((currentData) => ({
      ...currentData,
      clients: currentData.clients.filter(
        (client) => client.id !== clientId
      ),
    }));
  }

  return {
    clients,
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
  };
}