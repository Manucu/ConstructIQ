export type SupplierStatus = "ACTIVE" | "INACTIVE";

export type Supplier = {
  id: string;
  name: string;
  vatNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  status: SupplierStatus;
};

export const suppliers: Supplier[] = [
  {
    id: "1",
    name: "Holcim",
    vatNumber: "RO12345678",
    email: "office@holcim.example",
    phone: "+40 700 100 001",
    address: "Cluj-Napoca, Romania",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Dedeman",
    vatNumber: "RO87654321",
    email: "sales@dedeman.example",
    phone: "+40 700 100 002",
    address: "Cluj-Napoca, Romania",
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Arabesque",
    vatNumber: "RO11223344",
    email: "contact@arabesque.example",
    phone: "+40 700 100 003",
    address: "Romania",
    status: "ACTIVE",
  },
];