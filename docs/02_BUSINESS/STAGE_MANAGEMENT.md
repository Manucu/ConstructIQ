# Stage Management

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Stage Management module organizes a construction project into manageable execution phases.

Each Stage represents a logical part of the project with its own progress, budget, workforce, documentation and financial information.

Stages are the foundation of project execution inside ConstructIQ.

---

# Scope

Every Project is divided into one or more Stages.

Examples:

- Site Preparation
- Excavation
- Foundation
- Structure
- Masonry
- Roofing
- Installations
- Finishing
- Landscaping

---

# Objectives

The Stage Management module aims to:

- organize project execution
- monitor progress
- control costs
- centralize information
- simplify reporting

---

# Stage Lifecycle

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

Locked stages cannot be modified directly.

Any correction creates a new version.

---

# Stage Information

Each Stage contains:

## General Information

- Name
- Description
- Project
- Status
- Planned Start Date
- Planned End Date
- Actual Start Date
- Actual End Date

---

## Progress

Each Stage stores:

- Planned Progress
- Actual Progress
- Completion Percentage

Progress is updated automatically from approved Working Days.

---

## Budget

Every Stage has its own budget.

The budget includes:

- Labor
- Materials
- Equipment
- Transport
- Extra Works
- Other Costs

The remaining budget is calculated automatically.

---

## Workforce

Each Stage records:

- Assigned workers
- Worked hours
- Attendance history

Worker rates remain confidential.

---

## Materials

The Stage records:

- Materials used
- Quantities
- Suppliers
- Related invoices

---

## Equipment

Each Stage records:

- Equipment used
- Operating hours
- Equipment costs

---

## Expenses

Every expense belongs to a Stage.

Examples:

- Fuel
- Transport
- Rentals
- Miscellaneous

Only approved expenses affect the budget.

---

## Extra Works

Extra Works may be attached to a specific Stage.

They remain separate from Contract Works.

Only approved Extra Works affect the Project Value.

---

## Documents

Each Stage may contain:

- Drawings
- Inspection Reports
- Delivery Notes
- Technical Documents

---

## Photos

Photos document the execution of the Stage.

Each photo is linked to:

- Project
- Stage
- Optional Working Day

---

## Reports

The Stage automatically generates:

- Progress Reports
- Cost Reports
- Daily Summaries
- Completion Report

---

# Stage Completion

A Stage may be completed only when:

- all Working Days are approved
- progress reaches 100%
- required documents are uploaded
- pending approvals are resolved

---

# Automatic Updates

When a Stage is approved or completed, ConstructIQ automatically updates:

- Project Progress
- Project Budget
- Business Health
- Project Health
- Reports
- Timeline
- Dashboard

---

# Permissions

## Site Engineer

Can:

- update progress
- register activities
- upload photos
- upload documents
- create Working Days

Cannot:

- approve Stage completion
- modify budgets
- view confidential financial information

---

## Project Manager

Can:

- review progress
- approve Stage completion
- request corrections

---

## Owner

Can:

- approve
- reopen (with justification)
- archive

---

# Business Rules

BR-002

Every Project contains at least one Stage.

BR-003

Working Days belong to a Stage.

BR-010

Expenses belong to a Stage.

BR-013

Extra Works remain separate from Contract Works.

BR-020

Reports contain approved information only.

---

# Real World Scenario

Project

↓

Foundation Stage

↓

Working Days

↓

Workers

↓

Materials

↓

Invoices

↓

Expenses

↓

Photos

↓

Progress

↓

Approval

↓

Stage Completed

↓

Project Progress Updated

---

# Future Improvements

Future versions may include:

- Stage Templates
- Stage Dependencies
- Critical Path
- Delay Analysis
- AI Progress Forecast
- BIM Integration

---

# Related Documents

- PROJECT_MODULE.md
- WORKING_DAY.md
- EXTRA_WORKS.md
- REPORTS.md
- PROJECT_HEALTH.md
- APPROVAL_SYSTEM.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |