# ConstructIQ Domain Model

## Core Idea

ConstructIQ este construit în jurul companiei, proiectelor de construcții și datelor operaționale generate zilnic pe șantier.

Datele introduse în proiecte sunt folosite pentru calculul progresului, al costurilor, al bugetului consumat și al indicatorului Business Health.

---

## Main Entities

### Company

Reprezintă firma care folosește platforma.

Fields:
- id
- name
- email
- phone
- address
- subscriptionPlan
- createdAt

Relations:
- Company has many Users
- Company has many Projects

---

### User

Reprezintă un utilizator al platformei.

Fields:
- id
- firstName
- lastName
- email
- password
- role
- companyId
- createdAt

Roles:
- OWNER
- PROJECT_MANAGER
- SITE_ENGINEER
- CLIENT

Relations:
- User belongs to Company
- User can create Projects
- User can create Diary Entries
- User can upload Photos

---

### Project

Reprezintă un proiect de construcții.

Fields:
- id
- companyId
- name
- description
- address
- clientName
- startDate
- deadline
- totalBudget
- status
- createdAt

Statuses:
- PLANNED
- ACTIVE
- COMPLETED
- ARCHIVED

Relations:
- Project belongs to Company
- Project has many Stages
- Project has many Expenses
- Project has many Photos
- Project has many Documents
- Project has many Diary Entries

---

### Stage

Reprezintă o etapă a proiectului.

Fields:
- id
- projectId
- name
- description
- plannedBudget
- spentAmount
- progress
- startDate
- endDate
- status

Statuses:
- NOT_STARTED
- IN_PROGRESS
- COMPLETED
- DELAYED

Relations:
- Stage belongs to Project
- Stage has many Tasks
- Stage has many Expenses
- Stage has many Photos

---

### Expense

Reprezintă o cheltuială introdusă în proiect.

Fields:
- id
- projectId
- stageId
- category
- description
- amount
- expenseDate
- createdBy

Categories:
- MATERIALS
- LABOR
- EQUIPMENT
- TRANSPORT
- OTHER

Relations:
- Expense belongs to Project
- Expense can belong to Stage
- Expense is created by User

---

### DiaryEntry

Reprezintă raportul zilnic de șantier.

Fields:
- id
- projectId
- stageId
- date
- weather
- workersCount
- workedHours
- activities
- observations
- createdBy

Relations:
- DiaryEntry belongs to Project
- DiaryEntry can belong to Stage
- DiaryEntry is created by User
- DiaryEntry can have Photos

---

### Photo

Reprezintă o fotografie încărcată de pe șantier.

Fields:
- id
- projectId
- stageId
- diaryEntryId
- url
- description
- uploadedBy
- uploadedAt

Relations:
- Photo belongs to Project
- Photo can belong to Stage
- Photo can belong to DiaryEntry

---

### Document

Reprezintă un document asociat proiectului.

Fields:
- id
- projectId
- name
- type
- url
- uploadedBy
- uploadedAt

Types:
- CONTRACT
- INVOICE
- PLAN
- REPORT
- PERMIT
- OTHER

Relations:
- Document belongs to Project
- Document is uploaded by User

---

### ProjectTemplate

Reprezintă un șablon reutilizabil de proiect.

Fields:
- id
- name
- description
- category

Examples:
- House P+1
- Duplex
- Villa
- Industrial Hall
- Commercial Building
- Custom

Relations:
- ProjectTemplate has many StageTemplates

---

### StageTemplate

Reprezintă o etapă standard dintr-un template.

Fields:
- id
- projectTemplateId
- name
- description
- defaultBudgetPercentage
- estimatedDurationDays
- orderIndex

Relations:
- StageTemplate belongs to ProjectTemplate