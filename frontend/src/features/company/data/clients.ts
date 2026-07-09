export type ClientStatus = "ACTIVE" | "INACTIVE";

export type Client = {
  id: string;
  name: string;
  type: "PERSON" | "COMPANY";
  email?: string;
  phone?: string;
  address?: string;
  status: ClientStatus;
};

export const clients: Client[] = [
  {
    id: "1",
    name: "Andrei Pop",
    type: "PERSON",
    email: "andrei.pop@example.com",
    phone: "+40 700 200 001",
    address: "Cluj-Napoca, Romania",
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Construct Beneficiar SRL",
    type: "COMPANY",
    email: "office@beneficiar.example",
    phone: "+40 700 200 002",
    address: "Bucharest, Romania",
    status: "ACTIVE",
  },
];