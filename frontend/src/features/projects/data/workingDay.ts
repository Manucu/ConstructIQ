export const workingDay = {
  id: "1",
  date: "24 June 2026",
  stage: "Foundation",
  weather: "Sunny",
  temperature: "24°C",
  status: "DRAFT",
  notes:
    "Foundation reinforcement work continued. Concrete preparation is planned for tomorrow.",

  workerEntries: [
    {
      id: "1",
      workerId: "1",
      hoursWorked: 8,
      activityTemplateId: "2",
    },
    {
      id: "2",
      workerId: "2",
      hoursWorked: 8,
      activityTemplateId: "3",
    },
    {
      id: "3",
      workerId: "3",
      hoursWorked: 6,
      activityTemplateId: "2",
    },
    {
      id: "4",
      workerId: "4",
      hoursWorked: 8,
      activityTemplateId: "3",
    },
  ],

  activityEntries: [
    {
      id: "1",
      activityTemplateId: "2",
      workersAssigned: 4,
      hoursWorked: 32,
      status: "COMPLETED",
    },
    {
      id: "2",
      activityTemplateId: "3",
      workersAssigned: 5,
      hoursWorked: 40,
      status: "IN_PROGRESS",
    },
    {
      id: "3",
      activityTemplateId: "4",
      workersAssigned: 3,
      hoursWorked: 22,
      status: "PLANNED",
    },
  ],

  materialEntries: [
    {
      id: "1",
      materialId: "1",
      quantity: 12,
    },
    {
      id: "2",
      materialId: "2",
      quantity: 350,
    },
  ],

  equipmentEntries: [
    {
      id: "1",
      equipmentId: "1",
      hoursUsed: 4,
    },
    {
      id: "2",
      equipmentId: "3",
      hoursUsed: 2,
    },
  ],
};