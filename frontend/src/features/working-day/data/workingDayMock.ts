import type { WorkingDay } from "@/features/working-day/types/workingDay";

export const workingDayMock: WorkingDay = {
  id: "wd-1",
  projectId: "2",
  stageId: "1",

  date: "24 June 2026",
  stageName: "Foundation",
  engineerName: "Andrei Moldovan",

  weather: "Sunny",
  temperature: "24°C",

  status: "DRAFT",
  notes:
    "Foundation reinforcement work continued. Concrete preparation is planned for tomorrow.",

  attendance: [
    {
      id: "att-1",
      workerId: "1",
      activityTemplateId: "2",
      startTime: "08:00",
      endTime: "16:00",
      hoursWorked: 8,
      overtimeHours: 0,
      present: true,
    },
    {
      id: "att-2",
      workerId: "2",
      activityTemplateId: "3",
      startTime: "08:00",
      endTime: "16:00",
      hoursWorked: 8,
      overtimeHours: 0,
      present: true,
    },
    {
      id: "att-3",
      workerId: "3",
      activityTemplateId: "2",
      startTime: "08:00",
      endTime: "14:00",
      hoursWorked: 6,
      overtimeHours: 0,
      present: true,
    },
  ],

  activities: [
    {
      id: "act-1",
      activityTemplateId: "2",
      workersAssigned: 4,
      hoursWorked: 32,
      progressPercentage: 100,
      status: "COMPLETED",
      notes: "Formwork completed for the main foundation area.",
    },
    {
      id: "act-2",
      activityTemplateId: "3",
      workersAssigned: 5,
      hoursWorked: 40,
      progressPercentage: 65,
      status: "IN_PROGRESS",
      notes: "Steel reinforcement installation continued.",
    },
    {
      id: "act-3",
      activityTemplateId: "4",
      workersAssigned: 3,
      hoursWorked: 12,
      progressPercentage: 20,
      status: "PLANNED",
      notes: "Concrete pouring preparation started.",
    },
  ],

  materials: [
    {
      id: "mat-1",
      materialId: "1",
      quantity: 12,
      unit: "m³",
      notes: "Concrete planned for next pour.",
    },
    {
      id: "mat-2",
      materialId: "2",
      quantity: 350,
      unit: "kg",
      notes: "Steel used for foundation reinforcement.",
    },
  ],

  equipment: [
    {
      id: "eq-1",
      equipmentId: "1",
      hoursUsed: 4,
      activityTemplateId: "1",
      notes: "Excavator used for site preparation.",
    },
    {
      id: "eq-2",
      equipmentId: "3",
      hoursUsed: 2,
      activityTemplateId: "4",
      notes: "Concrete pump prepared for next working day.",
    },
  ],

  expenses: [
    {
      id: "exp-1",
      expenseCategoryId: "1",
      description: "Fuel for excavator",
      amount: 180,
      currency: "EUR",
      status: "PENDING",
    },
    {
      id: "exp-2",
      expenseCategoryId: "2",
      description: "Material transport",
      amount: 320,
      currency: "EUR",
      status: "APPROVED",
    },
  ],

  photos: [
    {
      id: "photo-1",
      title: "Foundation reinforcement",
      description: "Steel reinforcement before inspection.",
      fileUrl: "/placeholder-photo.jpg",
      uploadedBy: "Andrei Moldovan",
      uploadedAt: "24 June 2026",
      stageId: "1",
      activityTemplateId: "3",
    },
    {
      id: "photo-2",
      title: "Formwork completed",
      description: "Completed formwork section.",
      fileUrl: "/placeholder-photo.jpg",
      uploadedBy: "Andrei Moldovan",
      uploadedAt: "24 June 2026",
      stageId: "1",
      activityTemplateId: "2",
    },
  ],

  documents: [
    {
      id: "doc-1",
      name: "Concrete Delivery Note.pdf",
      category: "Delivery Note",
      fileUrl: "/documents/concrete-delivery-note.pdf",
      uploadedBy: "Andrei Moldovan",
      uploadedAt: "24 June 2026",
    },
    {
      id: "doc-2",
      name: "Foundation Inspection Report.pdf",
      category: "Inspection",
      fileUrl: "/documents/foundation-inspection.pdf",
      uploadedBy: "Project Manager",
      uploadedAt: "24 June 2026",
    },
  ],

  approval: {
    status: "NOT_SUBMITTED",
  },

  createdAt: "24 June 2026 08:00",
  updatedAt: "24 June 2026 16:30",
};