export type WorkingDayStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "LOCKED";

export type WeatherCondition =
  | "Sunny"
  | "Cloudy"
  | "Rain"
  | "Snow"
  | "Wind"
  | "Fog"
  | "Other";

export type ActivityStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "BLOCKED";

export type ApprovalStatus =
  | "NOT_SUBMITTED"
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type WorkingDay = {
  id: string;
  projectId: string;
  stageId: string;

  date: string;
  stageName: string;
  engineerName: string;

  weather: WeatherCondition;
  temperature: string;

  status: WorkingDayStatus;
  notes?: string;

  attendance: WorkerEntry[];
  activities: ActivityEntry[];
  materials: MaterialEntry[];
  equipment: EquipmentEntry[];
  expenses: ExpenseEntry[];
  photos: PhotoEntry[];
  documents: DocumentEntry[];

  approval: WorkingDayApproval;

  createdAt: string;
  updatedAt: string;
};

export type WorkerEntry = {
  id: string;
  workerId: string;
  activityTemplateId?: string;

  startTime?: string;
  endTime?: string;

  hoursWorked: number;
  overtimeHours?: number;

  present: boolean;
  notes?: string;
};

export type ActivityEntry = {
  id: string;
  activityTemplateId: string;

  workersAssigned: number;
  hoursWorked: number;

  progressPercentage?: number;
  status: ActivityStatus;

  notes?: string;
};

export type MaterialEntry = {
  id: string;
  materialId: string;

  quantity: number;
  unit: string;

  supplierId?: string;
  invoiceId?: string;

  notes?: string;
};

export type EquipmentEntry = {
  id: string;
  equipmentId: string;

  hoursUsed: number;
  activityTemplateId?: string;

  notes?: string;
};

export type ExpenseEntry = {
  id: string;
  expenseCategoryId: string;

  description: string;
  amount: number;
  currency: "EUR" | "RON" | "USD" | "GBP";

  status: ApprovalStatus;

  notes?: string;
};

export type PhotoEntry = {
  id: string;

  title: string;
  description?: string;

  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;

  stageId?: string;
  activityTemplateId?: string;
};

export type DocumentEntry = {
  id: string;

  name: string;
  category:
    | "Drawing"
    | "Invoice"
    | "Delivery Note"
    | "Inspection"
    | "Report"
    | "Contract"
    | "Other";

  fileUrl: string;
  uploadedBy: string;
  uploadedAt: string;
};

export type WorkingDayApproval = {
  status: ApprovalStatus;

  submittedBy?: string;
  submittedAt?: string;

  approvedBy?: string;
  approvedAt?: string;

  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
};

export type WorkingDaySummary = {
  totalWorkers: number;
  totalHours: number;
  totalActivities: number;
  totalMaterials: number;
  totalEquipmentHours: number;
  totalExpenses: number;
  totalPhotos: number;
  totalDocuments: number;
};