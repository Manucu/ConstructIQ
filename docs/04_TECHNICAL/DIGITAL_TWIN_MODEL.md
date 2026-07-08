# Digital Twin Model

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

ConstructIQ creates a Digital Twin of every construction project.

A Digital Twin is a digital representation of the real construction site.

Every important activity performed on-site should have a corresponding digital record inside the application.

The Digital Twin becomes the project's single source of truth.

---

# Vision

The construction site exists twice:

• Physical Construction Site

↓

• Digital Construction Site

Both evolve together.

---

# Core Principle

If something happened on-site...

…it should exist inside ConstructIQ.

Examples:

- Worker attended
- Material delivered
- Concrete poured
- Stage completed
- Invoice received
- Photo taken
- Inspection performed
- Extra Work approved

Every important event becomes digital.

---

# Objectives

The Digital Twin aims to:

- improve project transparency
- eliminate missing information
- reduce manual reporting
- support accurate financial calculations
- provide historical project data
- enable AI analysis

---

# Digital Representation

Every Project contains:

- Stages
- Working Days
- Workers
- Activities
- Materials
- Equipment
- Expenses
- Invoices
- Extra Works
- Documents
- Photos
- Reports

Together these entities create the Digital Twin.

---

# Project Structure

Project

↓

Stages

↓

Working Days

↓

Activities

↓

Resources

↓

Costs

↓

Reports

↓

Historical Record

---

# Physical vs Digital

## Physical World

Workers arrive.

↓

Engineer supervises.

↓

Concrete is poured.

↓

Materials are delivered.

↓

Invoices are received.

↓

Photos are taken.

↓

Project progresses.

---

## Digital World

Attendance recorded.

↓

Working Day created.

↓

Labor Cost calculated.

↓

Material Invoice uploaded.

↓

Budget updated.

↓

Photos uploaded.

↓

Reports generated.

---

# Real-Time Synchronization

ConstructIQ should always reflect the current state of the construction site.

Every approved activity updates:

- Project Progress
- Budget
- Reports
- Project Health
- Business Health

---

# Master Data

The Digital Twin is built on Master Data.

Master Data includes:

- Companies
- Users
- Workers
- Materials
- Equipment
- Suppliers
- Clients

Master Data is created once and reused across projects.

---

## Master Data and Digital Twin

The Digital Twin is built from two categories of data:

### Master Data

Master Data represents reusable company-level information.

Examples:

- Workers
- Activity Templates
- Materials
- Equipment
- Suppliers
- Clients
- Units of Measure
- Expense Categories

Master Data is created once and reused across all projects.

---

### Transactional Data

Transactional Data represents real project activity.

Examples:

- Working Days
- Attendance
- Expenses
- Invoices
- Extra Works
- Photos
- Documents
- Reports

---

## Why Master Data Matters

Master Data ensures that ConstructIQ remains:

- consistent
- reusable
- scalable
- accurate
- AI-ready

Clean Master Data improves reports, cost calculations and future AI recommendations.

# Transactional Data

Transactional Data represents daily project activity.

Includes:

- Working Days
- Attendance
- Expenses
- Invoices
- Extra Works
- Photos
- Documents
- Reports

---

# Event-Driven Model

Every important event creates new information.

Example:

Working Day Approved

↓

Attendance confirmed

↓

Labor Cost calculated

↓

Stage Cost updated

↓

Project Budget updated

↓

Reports updated

↓

Project Health updated

↓

Business Health updated

---

# Versioning

Approved information is never overwritten.

Corrections create new versions.

Historical information is preserved forever.

---

# Traceability

Every important action answers:

Who?

When?

Where?

Why?

Every record contains:

- creator
- timestamp
- approvals
- related project
- related stage

---

# Single Source of Truth

Every piece of information is recorded once.

All reports and calculations reuse the same approved information.

Duplicate data is avoided.

---

# Digital Timeline

Every project automatically creates a timeline.

Example:

01 May

Project Created

↓

03 May

Foundation Started

↓

07 May

Concrete Delivered

↓

08 May

Invoice Approved

↓

09 May

Working Day Approved

↓

10 May

Foundation Completed

The timeline becomes the project's historical record.

---

# Future Digital Twin

Future versions may include:

- BIM integration
- IoT sensors
- GPS equipment tracking
- Drone inspections
- Live weather integration
- AI risk prediction
- Automatic progress estimation
- Computer vision from photos

---

# Design Principles

ConstructIQ follows:

- Digital First
- Record Once
- Event Driven
- Traceability
- Transparency
- Master Data
- Approved Data Only

---

# Related Documents

- ARCHITECTURE.md
- SYSTEM_MODULES.md
- DATABASE_SCHEMA.md
- DATA_DICTIONARY.md
- ../01_PRODUCT/APPLICATION_PRINCIPLES.md
- ../02_BUSINESS/WORKFLOWS.md
- ../03_FINANCE/COST_CALCULATION.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |