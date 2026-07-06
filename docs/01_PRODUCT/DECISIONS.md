# ConstructIQ Architectural Decisions

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document records the major architectural and business decisions made during the development of ConstructIQ.

Its purpose is to explain **why** certain decisions were made, not only **how** they were implemented.

Understanding these decisions ensures consistency, maintainability and long-term scalability.

---

# Decision 001

## ConstructIQ is a Digital Twin Platform

### Decision

Every construction project is represented as a Digital Twin.

### Why

Construction projects generate thousands of events during their lifecycle.

Every important event should have a digital representation.

Examples include:

- project creation
- stage progress
- workers
- expenses
- invoices
- materials
- documents
- photos
- inspections
- reports

### Benefits

- complete project history
- traceability
- transparency
- future AI capabilities

---

# Decision 002

## Single Source of Truth

### Decision

Information should only be entered once.

Every other calculation must happen automatically.

### Why

Duplicated information causes:

- inconsistencies
- human error
- incorrect reports

### Example

Expense

↓

Stage Budget

↓

Project Budget

↓

Dashboard

↓

Business Health

↓

Reports

Users never update multiple modules manually.

---

# Decision 003

## No Permanent Deletion

### Decision

Important business information is never permanently deleted.

Instead, ConstructIQ uses:

- Archive
- Versioning
- History
- Corrections

### Why

Construction projects require complete auditability.

Historical information may be needed years after project completion.

---

# Decision 004

## Approval Workflow

### Decision

Important information requires approval before becoming official.

Workflow:

Draft

↓

Submitted

↓

Approved

↓

Locked

### Why

This prevents accidental changes and guarantees reliable reporting.

---

# Decision 005

## Version Instead of Edit

### Decision

Approved information is not overwritten.

Corrections create new versions.

### Example

Expense

Version 1

↓

Correction Request

↓

Approved

↓

Version 2

### Why

Users must always understand:

- what changed
- who changed it
- why it changed

---

# Decision 006

## Complete Audit Trail

### Decision

Every important action records:

- created by
- created at
- modified by
- modified at
- approved by
- approved at

### Why

Every financial and operational decision should be traceable.

---

# Decision 007

## Role-Based Permissions

### Decision

Every user has access only to information required for their responsibilities.

### Example

Owner

Full access

Project Manager

Project management

Site Engineer

Daily operations

Accountant

Financial management

Client

Read-only access

---

# Decision 008

## Confidential Workforce Rates

### Decision

Worker hourly and daily rates are confidential.

### Site Engineer

Can record:

- worker names
- attendance
- worked hours

Cannot view:

- salaries
- hourly rates
- labor costs per worker

### Owner / Accountant

Can view:

- hourly rates
- labor cost calculations
- payroll information

### Why

Labor costs represent confidential company information.

Only authorized financial roles may access this data.

---

# Decision 009

## Automatic Labor Cost Calculation

### Decision

Labor costs are calculated automatically.

Formula:

Worked Hours

×

Hourly Rate

↓

Labor Cost

↓

Stage Labor Cost

↓

Project Labor Cost

### Why

Users should never calculate labor costs manually.

---

# Decision 010

## Invoice-Driven Financial System

### Decision

Invoices are uploaded directly into the project.

Approved invoices automatically create project expenses.

### Why

Invoices are the official financial source.

Budgets should be based on real accounting documents.

---

# Decision 011

## Stage-Centered Architecture

### Decision

Projects are organized around construction stages.

Every stage contains:

- budget
- expenses
- workers
- photos
- documents
- reports
- progress

### Why

Construction activities naturally happen inside stages.

---

# Decision 012

## Working Day Model

### Decision

Daily activity is recorded through Working Days.

Each Working Day contains:

- workers
- weather
- activities
- expenses
- photos
- notes

### Why

Daily reports should be generated automatically from daily work.

---

# Decision 013

## Explainable Business Health

### Decision

Business Health must always explain its score.

Example

+2

Project completed on schedule

-3

Budget exceeded

+1

Reports submitted

### Why

Users should understand every score.

No "black box" calculations.

---

# Decision 014

## AI Assists, Humans Decide

### Decision

Artificial Intelligence never modifies official data.

AI may:

- summarize
- predict
- recommend
- detect anomalies

Only authorized users approve changes.

### Why

Construction management requires human responsibility.

---

# Decision 015

## Professional Reporting

### Decision

Reports are generated from approved data only.

Reports include:

- progress
- budget
- labor
- materials
- invoices
- documents
- photos

### Why

Reports should always represent the official project status.

---

# Decision 016

## Build for Scalability

### Decision

ConstructIQ should work equally well for:

- one project

and

- hundreds of simultaneous projects.

### Why

The architecture should never limit business growth.

---

# Decision 017

## Security by Design

### Decision

Security is part of the architecture from the beginning.

Financial information must always be protected.

Sensitive data includes:

- salaries
- worker rates
- invoices
- payroll
- financial reports

---

# Decision 018

## Build Once

### Decision

Reusable components should always be preferred.

Examples

AppButton

AppCard

AppTabs

AppInput

AppModal

### Why

Reusable components improve consistency and reduce maintenance.

---

# Decision 019

## Record Once

### Decision

Users enter information once.

Everything else is connected automatically.

This is one of the fundamental principles of ConstructIQ.

---

# Decision 020

## Trust Forever

### Decision

Trust is built through:

- transparency
- audit
- approvals
- versioning
- security
- automation

Every important decision should remain verifiable for the lifetime of the project.

---

# Conclusion

Every architectural decision inside ConstructIQ follows one objective:

Creating a trustworthy Digital Twin for every construction project.

The application should always prioritize:

- reliability
- transparency
- scalability
- simplicity
- automation
- security

over unnecessary complexity.

---

# Motto

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**