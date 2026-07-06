# Business Rules

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the official business rules that govern the behavior of ConstructIQ.

These rules represent the core logic of the platform and must be respected by the frontend, backend, database and reporting system.

Every module developed for ConstructIQ must comply with these rules.

---

# Scope

These rules apply to:

- Projects
- Stages
- Working Days
- Workforce
- Expenses
- Invoices
- Extra Works
- Documents
- Photos
- Reports
- Budgets
- Notifications

---

# Business Rules

## BR-001 — Every Project belongs to one Company

A Project cannot exist without a Company.

A Company may own multiple Projects.

---

## BR-002 — Every Project contains at least one Stage

Projects are always divided into construction stages.

A Stage cannot exist without a Project.

---

## BR-003 — Every Working Day belongs to one Stage

All daily activities must be associated with a specific construction stage.

Working Days cannot exist independently.

---

## BR-004 — Information is recorded only once

ConstructIQ follows the **Single Source of Truth** principle.

Users should never enter the same information multiple times.

The system automatically updates related modules.

---

## BR-005 — Approved information cannot be edited directly

Once approved, information becomes read-only.

Any modification requires a Correction Request and creates a new version.

---

## BR-006 — Every important action must be traceable

Every important record stores:

- Created By
- Created At
- Modified By
- Modified At
- Approved By
- Approved At

---

## BR-007 — Worker rates are confidential

Worker hourly or daily rates are visible only to authorized financial roles.

Site Engineers may record:

- attendance
- worked hours
- activities

They cannot view salaries or internal labor rates.

---

## BR-008 — ConstructIQ does not manage payroll

The platform calculates labor costs for project budgeting only.

Payroll, taxes and salaries are managed outside the application.

---

## BR-009 — Labor costs are calculated automatically

Labor Cost = Worked Hours × Hourly Rate

The calculation updates:

- Stage Cost
- Project Cost
- Budget Consumption

---

## BR-010 — Every Expense belongs to one Stage

Expenses must always be connected to:

- Project
- Stage

Optional:

- Working Day

---

## BR-011 — Every Invoice belongs to one Project

Invoices must always reference:

- Project
- Supplier

They may also reference:

- Stage
- Expense
- Extra Work

---

## BR-012 — Only approved invoices affect the budget

Draft or rejected invoices must never change financial calculations.

---

## BR-013 — Extra Works are independent from Contract Works

Extra Works are managed separately from the original contract.

They increase the total project value only after approval.

---

## BR-014 — Extra Works require financial approval

Site Engineers may create Extra Works.

Only the Owner or authorized financial roles may assign the final selling price.

---

## BR-015 — Every uploaded file belongs to a business entity

Documents, invoices and photos must always belong to:

- Project
- Stage
- Working Day
- Extra Work

Or another valid business entity.

---

## BR-016 — Every Photo must be traceable

Photos store:

- author
- upload date
- project
- stage
- optional working day

Future versions may include GPS coordinates.

---

## BR-017 — Business Health uses approved data only

Business Health must never use:

- Draft expenses
- Draft reports
- Pending invoices

Only approved information contributes to the score.

---

## BR-018 — Project Health reflects the real project status

Project Health considers:

- Progress
- Budget
- Documentation
- Daily Reports
- Safety
- Approvals

---

## BR-019 — Notifications are event-driven

Notifications are generated automatically after important events.

Example:

Expense Approved

↓

Project Manager notified

---

## BR-020 — Reports use official data only

Official reports must contain only approved information.

Reports generated from draft data are marked as Draft.

---

## BR-021 — Security is role-based

Every user only sees the information required for their responsibilities.

Financial data is protected by role permissions.

---

## BR-022 — No permanent deletion

Business information is never permanently deleted.

Instead, ConstructIQ uses:

- Archive
- Versioning
- History

---

## BR-023 — Every project maintains a complete history

Every important business event remains available for future auditing.

---

## BR-024 — AI never changes official data

Artificial Intelligence may:

- summarize
- predict
- recommend

AI cannot modify official records without user approval.

---

## BR-025 — Every construction event should have a digital representation

If an important event happens on the construction site, it should exist inside ConstructIQ.

This principle defines the Digital Twin philosophy.

---

# Design Principles

Every business rule supports one or more core principles:

- Single Source of Truth
- Digital Twin
- Transparency
- Automation
- Security
- Scalability
- Traceability

---

# Related Documents

- APPLICATION_PRINCIPLES.md
- USER_ROLES.md
- WORKFLOWS.md
- APPROVAL_SYSTEM.md
- PROJECT_MODULE.md
- WORKING_DAY.md
- STAGE_MANAGEMENT.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |