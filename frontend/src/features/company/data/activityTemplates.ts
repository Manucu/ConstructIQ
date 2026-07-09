export type ActivityCategory =
  | "Planning"
  | "Site Preparation"
  | "Foundation"
  | "Structure"
  | "Masonry"
  | "Roof"
  | "Installations"
  | "Finishing"
  | "External Works";

export type ActivityTemplateStatus = "ACTIVE" | "INACTIVE";

export type ActivityTemplate = {
  id: string;
  name: string;
  category: ActivityCategory;
  status: ActivityTemplateStatus;
  description?: string;
};

export const activityTemplates: ActivityTemplate[] = [
  {
    id: "1",
    name: "Excavation",
    category: "Site Preparation",
    status: "ACTIVE",
    description: "Excavation works for foundation preparation.",
  },
  {
    id: "2",
    name: "Foundation Formwork",
    category: "Foundation",
    status: "ACTIVE",
    description: "Formwork installation for foundation elements.",
  },
  {
    id: "3",
    name: "Steel Reinforcement",
    category: "Foundation",
    status: "ACTIVE",
    description: "Steel reinforcement installation before concrete pouring.",
  },
  {
    id: "4",
    name: "Concrete Pouring",
    category: "Foundation",
    status: "ACTIVE",
    description: "Concrete pouring and leveling.",
  },
  {
    id: "5",
    name: "Column Reinforcement",
    category: "Structure",
    status: "ACTIVE",
  },
  {
    id: "6",
    name: "Slab Formwork",
    category: "Structure",
    status: "ACTIVE",
  },
  {
    id: "7",
    name: "Brick Masonry",
    category: "Masonry",
    status: "ACTIVE",
  },
  {
    id: "8",
    name: "Roof Structure Installation",
    category: "Roof",
    status: "ACTIVE",
  },
  {
    id: "9",
    name: "Electrical Installation",
    category: "Installations",
    status: "ACTIVE",
  },
  {
    id: "10",
    name: "Interior Painting",
    category: "Finishing",
    status: "ACTIVE",
  },
];