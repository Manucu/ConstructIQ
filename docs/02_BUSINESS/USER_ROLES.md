# User Roles

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the user roles, responsibilities and permissions within ConstructIQ.

Role-based access ensures that every user can access only the information required to perform their responsibilities while protecting confidential company data.

---

# Scope

This document applies to:

- Authentication
- Authorization
- Project Management
- Financial Information
- Reports
- Approval System
- Notifications
- Dashboard Visibility

---

# Role Hierarchy

```
Owner
│
├── Project Manager
│       │
│       └── Site Engineer
│
├── Accountant
│
└── Client
```

Each role has clearly defined responsibilities and permissions.

---

# Role Definitions

## Owner

The Owner has complete access to the platform.

Responsibilities:

- Company administration
- Project oversight
- Financial management
- Business decisions
- Final approvals

Can:

- View all projects
- Create/Edit/Delete projects
- Manage users
- View all financial information
- View worker rates
- Define Extra Work prices
- Approve invoices
- Approve budgets
- Archive projects
- Generate all reports

---

## Project Manager

Responsible for managing project execution.

Can:

- Create projects
- Manage stages
- Review Working Days
- Approve operational reports
- Monitor project progress
- View project budget
- View project health
- Generate project reports

Cannot:

- View worker rates
- View company profit
- Modify financial settings

---

## Site Engineer

Responsible for daily site operations.

Can:

- Open Working Days
- Register attendance
- Register worked hours
- Add activities
- Register materials
- Register equipment
- Upload photos
- Upload documents
- Register expenses
- Create Extra Works

Cannot:

- Approve records
- Modify budgets
- View worker rates
- View company profit

---

## Accountant

Responsible for financial operations.

Can:

- Upload invoices
- Approve invoices
- Manage suppliers
- View worker rates
- View labor costs
- Generate financial reports
- Monitor project costs

Cannot:

- Modify project progress
- Complete stages
- Edit Working Days

---

## Client

Represents the beneficiary of the project.

Can:

- View assigned projects
- View project progress
- View approved reports
- View shared documents
- View shared photos
- Review Extra Works (optional)

Cannot:

- View confidential financial data
- View worker rates
- View labor costs
- Modify project information

---

# Permission Matrix

| Feature | Owner | Project Manager | Site Engineer | Accountant | Client |
|----------|:----:|:---------------:|:-------------:|:----------:|:------:|
| View Projects | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Project | ✅ | ✅ | ❌ | ❌ | ❌ |
| Edit Project | ✅ | ✅ | ❌ | ❌ | ❌ |
| Archive Project | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create Stage | ✅ | ✅ | ❌ | ❌ | ❌ |
| Update Stage Progress | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create Working Day | ❌ | ❌ | ✅ | ❌ | ❌ |
| Submit Working Day | ❌ | ❌ | ✅ | ❌ | ❌ |
| Approve Working Day | ✅ | ✅ | ❌ | ❌ | ❌ |
| Register Materials | ❌ | View | ✅ | ❌ | ❌ |
| Register Equipment | ❌ | View | ✅ | ❌ | ❌ |
| Register Expenses | ❌ | View | ✅ | View | ❌ |
| Upload Invoice | ✅ | ❌ | ❌ | ✅ | ❌ |
| Approve Invoice | ✅ | ❌ | ❌ | ✅ | ❌ |
| Create Extra Work | ❌ | View | ✅ | ❌ | ❌ |
| Approve Extra Work | ✅ | Review | ❌ | Review | Optional |
| Generate Reports | ✅ | ✅ | Daily | Financial | Shared |

---

# Financial Permissions

| Information | Owner | PM | Engineer | Accountant | Client |
|--------------|:----:|:--:|:---------:|:----------:|:------:|
| Worker Hourly Rate | ✅ | ❌ | ❌ | ✅ | ❌ |
| Worker Daily Rate | ✅ | ❌ | ❌ | ✅ | ❌ |
| Labor Cost | ✅ | Summary | ❌ | ✅ | ❌ |
| Material Cost | ✅ | ✅ | Summary | ✅ | ❌ |
| Equipment Cost | ✅ | ✅ | Summary | ✅ | ❌ |
| Project Budget | ✅ | ✅ | Summary | ✅ | View |
| Company Profit | ✅ | ❌ | ❌ | Summary | ❌ |

---

# Approval Permissions

| Module | Owner | PM | Engineer | Accountant | Client |
|----------|:----:|:--:|:---------:|:----------:|:------:|
| Working Day | Final | Approve | Submit | - | - |
| Expense | Final | Review | Submit | Approve | - |
| Invoice | Final | - | - | Approve | - |
| Extra Work | Final | Review | Create | Review | Optional |
| Stage Completion | Final | Approve | Submit | - | - |
| Reports | Final | Approve | Draft | Financial | View |

---

# Visibility Rules

Every user sees only the information required to perform their work.

## Owner

Visible:

- Everything

---

## Project Manager

Visible:

- Projects
- Stages
- Budgets
- Reports
- Progress

Hidden:

- Worker rates
- Company profit

---

## Site Engineer

Visible:

- Assigned projects
- Working Days
- Activities
- Materials
- Equipment
- Expenses
- Photos

Hidden:

- Salaries
- Labor rates
- Profit
- Financial reports

---

## Accountant

Visible:

- Financial information
- Invoices
- Suppliers
- Labor costs

Hidden:

- Operational planning details not related to finance

---

## Client

Visible:

- Progress
- Shared documents
- Shared reports
- Photos

Hidden:

- Internal company information
- Financial details
- Worker information

---

# Security Principles

ConstructIQ uses Role-Based Access Control (RBAC).

Permissions are assigned to roles, not directly to users.

Future versions may support custom company permissions.

---

# Real World Scenarios

## Scenario 1

A Site Engineer registers 12 workers.

The system calculates labor costs automatically.

The engineer sees only attendance.

The Owner and Accountant see the calculated costs.

---

## Scenario 2

The Accountant uploads an invoice.

After approval:

- Expense is created.
- Stage budget is updated.
- Project budget is updated.
- Reports are refreshed.

---

## Scenario 3

The Client accesses the project.

The Client sees:

- Progress
- Photos
- Shared reports

The Client does not see:

- Worker rates
- Labor costs
- Internal expenses
- Company profit

---

# Future Improvements

Future versions may include:

- Custom company roles
- Permission groups
- Temporary permissions
- Delegated approvals
- Multi-company organizations
- External auditors

---

# Related Documents

- BUSINESS_RULES.md
- WORKFLOWS.md
- APPROVAL_SYSTEM.md
- WORKING_DAY.md
- REPORTS.md
- PROJECT_HEALTH.md
- SECURITY.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |