# ConstructIQ Workflows

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the operational workflows of ConstructIQ.

A workflow describes how information moves through the application from the moment an event occurs on the construction site until it becomes part of the official project history.

Every workflow must comply with:

- Business Rules
- User Roles
- Approval System
- Security Policy

---

# Scope

This document applies to:

- Projects
- Stages
- Working Days
- Workforce
- Materials
- Equipment
- Expenses
- Invoices
- Extra Works
- Documents
- Photos
- Reports

---

# Workflow Principles

Every workflow follows four principles:

- Record information once.
- Automate calculations.
- Require approvals where necessary.
- Maintain complete traceability.

---

# WF-001 — Create Project

Owner

↓

Create Project

↓

Choose Project Template

↓

Automatic Stage Creation

↓

Assign Project Manager

↓

Assign Site Engineer

↓

Assign Client

↓

Project Status = Planning

↓

Project Ready

---

# WF-002 — Project Lifecycle

Draft

↓

Planning

↓

Active

↓

On Hold

↓

Completed

↓

Archived

Projects are never permanently deleted.

---

# WF-003 — Stage Lifecycle

Planning

↓

Not Started

↓

In Progress

↓

Waiting Approval

↓

Completed

↓

Locked

Locked stages cannot be edited.

Corrections create a new version.

---

# WF-004 — Start Working Day

Site Engineer

↓

Select Project

↓

Select Stage

↓

Open Working Day

↓

Weather

↓

Attendance

↓

Activities

↓

Working Day Started

---

# WF-005 — Register Workforce

Site Engineer

↓

Select Workers

↓

Worked Hours

↓

Activity

↓

Save

↓

Labor Cost Calculated (Hidden)

↓

Stage Updated

Worker hourly rates remain confidential.

---

# WF-006 — Register Materials

Site Engineer

↓

Add Material

↓

Quantity

↓

Unit

↓

Supplier (Optional)

↓

Save

↓

Material Consumption Updated

Material costs are calculated automatically when invoices are approved.

---

# WF-007 — Register Equipment

Site Engineer

↓

Select Equipment

↓

Operating Hours

↓

Activity

↓

Save

↓

Equipment Cost Calculated

---

# WF-008 — Upload Photos

Site Engineer

↓

Upload Photos

↓

Attach to Stage

↓

Attach to Working Day

↓

Save

↓

Timeline Updated

---

# WF-009 — Upload Documents

Engineer / Project Manager

↓

Upload Document

↓

Assign Category

↓

Attach to Project

↓

Attach to Stage

↓

Save

↓

Document Archive Updated

---

# WF-010 — Register Expense

Site Engineer

↓

Expense Description

↓

Category

↓

Amount (if allowed)

↓

Save

↓

Pending Approval

↓

Budget Updated After Approval

---

# WF-011 — Invoice Workflow

Owner / Accountant

↓

Upload Invoice

↓

Review

↓

Approve

↓

Expense Created Automatically

↓

Stage Budget Updated

↓

Project Budget Updated

↓

Financial Reports Updated

Future Version:

OCR invoice recognition.

---

# WF-012 — Extra Work Workflow

Need Identified

↓

Site Engineer Creates Extra Work

↓

Description

↓

Photos

↓

Workers

↓

Worked Hours

↓

Materials

↓

Equipment

↓

Submit

↓

Owner Review

↓

Owner Defines Final Price

↓

(Optional) Client Approval

↓

Approved

↓

Project Value Updated

↓

Invoice Generated

↓

Reports Updated

---

# WF-013 — Daily Report Workflow

Working Day Completed

↓

Submit

↓

Project Manager Review

↓

Approved

↓

Daily Report Generated

↓

Dashboard Updated

↓

Business Health Updated

---

# WF-014 — Stage Completion

Site Engineer

↓

Complete Stage

↓

Progress = 100%

↓

Manager Review

↓

Owner Approval (Optional)

↓

Stage Locked

↓

Next Stage Activated

---

# WF-015 — Project Completion

Final Stage Completed

↓

Budget Finalized

↓

Final Reports Generated

↓

Completion Documents Uploaded

↓

Project Archived

↓

Read-Only Mode

---

# WF-016 — Approval Workflow

Draft

↓

Submitted

↓

Reviewed

↓

Approved

↓

Locked

If rejected:

↓

Correction Requested

↓

New Version Created

---

# WF-017 — Budget Workflow

Planned Budget

↓

Approved Expenses

↓

Approved Invoices

↓

Labor Cost

↓

Equipment Cost

↓

Extra Works

↓

Current Cost

↓

Forecast

↓

Final Cost

---

# WF-018 — Reporting Workflow

Approved Data

↓

Daily Reports

↓

Weekly Reports

↓

Monthly Reports

↓

Stage Reports

↓

Project Reports

↓

Financial Reports

↓

PDF Export

---

# WF-019 — Notification Workflow

Business Event

↓

Notification Generated

↓

Responsible User

↓

Dashboard

↓

Email (Future)

↓

Mobile Push (Future)

---

# WF-020 — Timeline Workflow

Every approved event is automatically added to the Project Timeline.

Examples:

- Project Created
- Stage Started
- Invoice Uploaded
- Extra Work Approved
- Working Day Approved
- Stage Completed
- Project Completed

Timeline entries are immutable.

---

# Workflow Dependencies

Projects

↓

Stages

↓

Working Days

↓

Activities

↓

Workers

↓

Materials

↓

Equipment

↓

Expenses

↓

Invoices

↓

Extra Works

↓

Reports

---

# General Rules

Every workflow must:

✔ Record information only once.

✔ Be fully traceable.

✔ Respect user permissions.

✔ Generate audit history.

✔ Support future AI analysis.

---

# Future Improvements

Future versions may include:

- OCR document recognition
- AI workflow suggestions
- Automatic schedule optimization
- Offline synchronization
- Mobile approvals
- GPS validation
- Digital signatures
- BIM integration

---

# Related Documents

- DOMAIN_MODEL.md
- USER_ROLES.md
- BUSINESS_RULES.md
- APPROVAL_SYSTEM.md
- STAGE_MANAGEMENT.md
- WORKING_DAY.md
- EXTRA_WORKS.md
- REPORTS.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |