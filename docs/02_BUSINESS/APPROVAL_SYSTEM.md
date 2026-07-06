# ConstructIQ Approval System

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the approval workflow used throughout ConstructIQ.

The Approval System ensures that important business information becomes official only after review by authorized users.

The same approval mechanism is reused across all modules.

---

# Scope

The Approval System applies to:

- Working Days
- Expenses
- Invoices
- Extra Works
- Stage Completion
- Reports
- Documents
- Budget Changes
- Project Changes

Future versions may include additional approval types.

---

# Objectives

The Approval System guarantees:

- data accuracy
- traceability
- accountability
- financial control
- audit history

No important information becomes official without approval.

---

# Approval Lifecycle

Every approval follows the same lifecycle.

Draft

↓

Submitted

↓

Under Review

↓

Approved

↓

Locked

If rejected:

Rejected

↓

Correction Requested

↓

Updated Version

↓

Submitted Again

---

# Approval States

## Draft

Information is still being edited.

Visible only to the creator and authorized users.

Editable.

---

## Submitted

The creator considers the information complete.

Waiting for review.

Read-only until reviewed.

---

## Under Review

The assigned approver is reviewing the information.

The approver may:

- approve
- reject
- request corrections

---

## Approved

The information becomes official.

Business calculations are updated.

Reports include the approved information.

Timeline is updated.

Notifications are generated.

---

## Locked

Approved information cannot be modified.

Any future change creates a new version.

---

## Rejected

The information was not accepted.

A rejection reason is mandatory.

---

# Versioning

Approved records are never overwritten.

Instead:

Version 1

↓

Correction Requested

↓

Version 2

↓

Version 3

↓

...

The complete history remains available.

---

# Approval Responsibilities

## Site Engineer

Can:

- create
- submit
- edit Drafts

Cannot:

- approve
- lock
- finalize

---

## Project Manager

Can:

- review
- approve operational information
- reject
- request corrections

Examples:

- Working Days
- Daily Reports
- Stage Progress

---

## Accountant

Can approve:

- invoices
- financial documents
- budget updates

Cannot approve operational activities unless authorized.

---

## Owner

Has final approval authority.

Can approve:

- Extra Works
- Budget Changes
- Financial Reports
- Project Completion
- High-value Invoices

Can override approvals when necessary.

---

## Client

May approve:

- Extra Works
- Contract Changes  

Only if client approval is required.

---

# Approval Matrix

| Module | Engineer | Project Manager | Accountant | Owner | Client |
|---------|----------|----------------|-------------|--------|--------|
| Working Day | Submit | Approve | - | Override | - |
| Expense | Submit | Review | Approve | Override | - |
| Invoice | - | Review | Approve | Approve | - |
| Extra Work | Create | Review | Review | Approve | Optional |
| Stage Completion | Submit | Approve | - | Optional | - |
| Reports | Submit | Approve | Financial | Final | View |

---

# Automatic Actions After Approval

When an item is approved, ConstructIQ automatically:

✔ Updates the Timeline

✔ Updates Business Health

✔ Updates Project Health

✔ Recalculates Budgets

✔ Updates Reports

✔ Creates Audit Log

✔ Sends Notifications

---

# Automatic Actions After Rejection

When an item is rejected:

- status becomes Rejected
- rejection reason is stored
- creator is notified
- item becomes editable again
- new version is created after resubmission

---

# Audit Information

Every approval records:

Approved By

Approved At

Approval Notes

Version

Previous Version

Reason

Module

---

# Security Rules

Only authorized users may approve information.

Approval permissions are role-based.

Financial approvals are restricted to financial roles.

Worker rates remain confidential.

Approval history cannot be deleted.

---

# Business Rules

The Approval System follows:

BR-005

Approved information cannot be edited directly.

BR-006

Every important action is traceable.

BR-012

Only approved invoices affect budgets.

BR-014

Extra Works require Owner approval.

BR-020

Reports contain approved information only.

---

# Real World Scenario

A Site Engineer finishes the Working Day.

↓

Registers attendance.

↓

Uploads photos.

↓

Adds expenses.

↓

Submits Working Day.

↓

Project Manager reviews.

↓

Approves.

↓

Dashboard updates.

↓

Business Health recalculates.

↓

Daily Report becomes official.

---

# Future Improvements

Future versions may include:

- Digital signatures

- Multi-level approvals

- Sequential approvals

- Parallel approvals

- Mobile approvals

- QR code approval

- AI approval recommendations

- Electronic document signing

---

# Related Documents

- USER_ROLES.md

- BUSINESS_RULES.md

- WORKFLOWS.md

- WORKING_DAY.md

- EXTRA_WORKS.md

- REPORTS.md

- SECURITY.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |