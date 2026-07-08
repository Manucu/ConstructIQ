# System Modules

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the modular architecture of ConstructIQ.

Each module has a clear responsibility, owns its business logic and communicates with other modules through well-defined interfaces.

The goal is to keep the application scalable, maintainable and easy to extend.

---

# Architecture Philosophy

ConstructIQ follows a modular architecture.

Every module:

- has a single responsibility
- owns its own business logic
- owns its own data
- communicates through services
- remains loosely coupled

---

# System Overview

```text
Authentication

↓

Company

↓

Projects

↓

Stages

↓

Working Days

↓

Finance

↓

Reports

↓

Dashboard

↓

AI
```

---

# Core Modules

## Authentication

Responsibilities

- Login
- Logout
- JWT Authentication
- Refresh Tokens
- Password Management

Communicates with

- Users
- Roles
- Permissions

---

## Company

Responsibilities

- Company Profile
- Company Settings
- Business Information

Owns

- Company
- Suppliers
- Workers

---

## Company Management

Responsibilities

- Manage company master data
- Define reusable business entities
- Configure company-level settings
- Maintain clean and consistent data across all projects

Owns

- Workforce
- Activity Templates
- Material Catalog
- Equipment Catalog
- Suppliers
- Clients
- Expense Categories
- Units of Measure
- Company Settings

Communicates with

- Projects
- Working Days
- Finance
- Reports

Company Management is the foundation of Master Data inside ConstructIQ.

## Users

Responsibilities

- User Management
- Roles
- Permissions

Owns

- Users
- Roles
- Permissions

---

## Projects

Responsibilities

- Project Management
- Client Assignment
- Timeline

Owns

- Projects

Communicates with

- Stages
- Reports
- Finance

---

## Stages

Responsibilities

- Stage Progress
- Stage Budget
- Stage Documents

Owns

- Project Stages

Communicates with

- Working Days
- Expenses
- Extra Works

---

## Working Days

Responsibilities

- Daily Activities
- Attendance
- Photos
- Documents
- Daily Notes

Owns

- Working Days
- Attendance
- Activities

Communicates with

- Workforce
- Finance
- Reports

---

## Workforce

Responsibilities

- Workers
- Attendance
- Labor Cost

Owns

- Workers
- Attendance

Communicates with

- Working Days
- Finance

---

## Materials

Responsibilities

- Material Catalog
- Material Usage

Owns

- Materials
- Material Usage

Communicates with

- Invoices
- Budget

---

## Equipment

Responsibilities

- Equipment
- Equipment Usage

Owns

- Equipment
- Equipment Usage

Communicates with

- Finance
- Working Days

---

## Finance

Responsibilities

- Budgets
- Cost Calculation
- Invoices
- Profitability

Owns

- Budgets
- Costs
- Invoices

Communicates with

- Reports
- Dashboard

---

## Extra Works

Responsibilities

- Change Orders
- Internal Cost
- Client Price

Owns

- Extra Works

Communicates with

- Finance
- Reports

---

## Documents

Responsibilities

- File Storage
- Drawings
- Contracts
- Reports

Owns

- Documents

---

## Photos

Responsibilities

- Progress Photos
- Site Documentation

Owns

- Photos

---

## Reports

Responsibilities

- PDF Reports
- Financial Reports
- Client Reports

Communicates with

- Every module

Reports never modify data.

---

## Notifications

Responsibilities

- User Notifications
- Approval Alerts
- System Events

Communicates with

- Every module

---

## Approval

Responsibilities

- Approval Workflow
- Versioning
- Audit

Communicates with

- Every business module

---

## Dashboard

Responsibilities

- KPIs
- Charts
- Statistics

Reads data from:

- Projects
- Finance
- Reports
- Business Health
- Project Health

---

## Audit

Responsibilities

- Activity History
- Change Tracking
- Version History

Communicates with

- Every module

---

## AI (Future)

Responsibilities

- AI Assistant
- OCR
- Cost Prediction
- Risk Analysis
- Report Summaries

Communicates with

- Every module

---

# Module Dependencies

```text
Authentication

↓

Company

↓

Projects

↓

Stages

↓

Working Days

↓

Workforce

↓

Finance

↓

Reports

↓

Dashboard
```

---

# Communication Rules

Modules never access another module's data directly.

Communication must happen through:

- Services
- APIs
- Events

---

# Shared Components

Modules share:

- Authentication
- Authorization
- Notifications
- Approval
- Audit
- File Storage

---

# Design Principles

ConstructIQ follows:

- Modular Design
- Single Responsibility Principle
- Separation of Concerns
- Event-Driven Architecture
- Role-Based Access Control
- Single Source of Truth

---

# Future Modules

Future versions may introduce:

- Mobile Application
- Procurement
- Warehouse
- Asset Management
- Fleet Management
- BIM Integration
- IoT Sensors
- AI Assistant

---

# Related Documents

- ARCHITECTURE.md
- DATABASE_SCHEMA.md
- DATA_DICTIONARY.md
- API_GUIDELINES.md
- SECURITY.md
- DIGITAL_TWIN_MODEL.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |
