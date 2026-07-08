# Data Flow

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines how information flows through ConstructIQ.

It explains how business events create, update and propagate information across the platform.

The objective is to ensure that every module works from a single source of truth.

---

# Core Principle

ConstructIQ follows a simple rule:

Business Events create Data.

Data creates Information.

Information creates Decisions.

Nothing is calculated twice.

---

# Single Source of Truth

Every important business event is recorded once.

The same approved data is reused by:

- Reports
- Dashboards
- Cost Calculations
- Project Health
- Business Health
- PDF Exports
- AI Services

---

# Data Flow Overview

```text
Construction Site

↓

Business Event

↓

Validation

↓

Approval

↓

Database

↓

Business Engine

↓

Financial Engine

↓

Reports

↓

Dashboard

↓

Business Health

↓

AI (Future)
```

---

# Working Day Flow

A Site Engineer creates a Working Day.

```text
Working Day

↓

Attendance

↓

Activities

↓

Photos

↓

Documents

↓

Engineer Notes

↓

Approval

↓

Working Day Locked

↓

Labor Cost

↓

Stage Progress

↓

Project Progress

↓

Reports

↓

Dashboard

↓

Business Health
```

---

# Workforce Flow

```text
Worker

↓

Attendance

↓

Worked Hours

↓

Internal Hourly Rate

↓

Labor Cost

↓

Stage Cost

↓

Project Cost

↓

Budget Consumption

↓

Reports
```

Worker rates remain confidential.

---

# Material Flow

```text
Supplier

↓

Invoice Upload

↓

Approval

↓

Material Cost

↓

Stage Cost

↓

Project Cost

↓

Budget

↓

Financial Reports
```

---

# Equipment Flow

```text
Equipment

↓

Operating Hours

↓

Equipment Cost

↓

Stage Cost

↓

Project Cost

↓

Budget
```

---

# Expense Flow

```text
Expense Created

↓

Approval

↓

Project Expense

↓

Stage Cost

↓

Budget Update

↓

Reports
```

---

# Extra Works Flow

```text
Engineer Creates Extra Work

↓

Internal Cost Calculated

↓

Owner Sets Client Price

↓

Approval

↓

Extra Work Registered

↓

Project Value Updated

↓

Reports

↓

Business Health
```

---

# Invoice Flow

```text
Owner Uploads Invoice

↓

Assign Project

↓

Assign Stage

↓

Approval

↓

Material Cost Updated

↓

Project Cost Updated

↓

Budget Updated

↓

Financial Reports
```

---

# Budget Flow

```text
Estimated Budget

↓

Approved Costs

↓

Actual Cost

↓

Budget Consumption

↓

Remaining Budget

↓

Dashboard
```

---

# Project Flow

```text
Project Created

↓

Stages

↓

Working Days

↓

Progress

↓

Costs

↓

Reports

↓

Project Health

↓

Completion
```

---

# Approval Flow

Every important business record follows:

```text
Draft

↓

Submitted

↓

Under Review

↓

Approved

↓

Locked
```

Only approved records continue through the system.

Rejected records never affect calculations.

---

# Reporting Flow

```text
Approved Data

↓

Business Engine

↓

Financial Engine

↓

Report Generator

↓

PDF

↓

Dashboard

↓

Business Health
```

Reports never use draft information.

---

# Audit Flow

Every important action creates:

```text
Audit Entry

↓

Timestamp

↓

User

↓

Previous Value

↓

New Value

↓

Reason
```

Audit history is permanent.

---

# Notification Flow

```text
Business Event

↓

Notification Service

↓

Target Users

↓

Application Notification

↓

Email (Future)
```

---

# Project Health Flow

```text
Working Days

+

Progress

+

Budget

+

Approvals

↓

Project Health

↓

Dashboard
```

---

# Business Health Flow

```text
Project Health

+

Budget Health

+

Financial Health

+

Operational Health

↓

Business Health

↓

Executive Dashboard
```

---

# Digital Twin Flow

Everything starts from reality.

```text
Physical Activity

↓

Digital Record

↓

Approval

↓

Historical Record

↓

Digital Twin

↓

Reports

↓

AI
```

---

# Future AI Flow

Future AI services will use approved data.

```text
Approved Data

↓

AI Engine

↓

Risk Detection

↓

Budget Prediction

↓

Recommendations

↓

Executive Insights
```

AI never modifies business data.

AI only analyzes approved information.

---

# Flow Principles

ConstructIQ follows:

- Record Once
- Approved Data Only
- Event-Driven Updates
- Automatic Calculations
- Single Source of Truth
- Full Traceability

---

# Related Documents

- ARCHITECTURE.md
- SYSTEM_MODULES.md
- DATABASE_SCHEMA.md
- DIGITAL_TWIN_MODEL.md
- COST_CALCULATION.md
- BUSINESS_RULES.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |