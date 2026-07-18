export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export type Project = {
  id: string;

  name: string;

  clientId?: string;

  clientName?: string;

  address?: string;

  status: ProjectStatus;

  progress: number;

  health: number;

  budget?: number;

  spent: number;

  sourceProjectTemplateId?: string;

  createdAt: string;
};

export const projects: Project[] = [
  {
    id: "1",
    name: "Casa P+1 Cluj",
    clientName: "Emanuel Niculai",
    address: "Cluj-Napoca",
    status: "ACTIVE",
    progress: 76,
    health: 91,
    budget: 250000,
    spent: 186000,
    createdAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "2",
    name: "Duplex Florești",
    clientName: "Popescu Residence",
    address: "Florești",
    status: "ACTIVE",
    progress: 54,
    health: 84,
    budget: 320000,
    spent: 172000,
    createdAt: "2026-02-03T09:00:00.000Z",
  },
  {
    id: "3",
    name: "Hală Industrială",
    clientName: "BuildMax SRL",
    address: "Oradea",
    status: "ACTIVE",
    progress: 89,
    health: 69,
    budget: 900000,
    spent: 850000,
    createdAt: "2026-03-01T09:00:00.000Z",
  },
];