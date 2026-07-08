# Database Schema

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

## Purpose

This document defines the main database structure of ConstructIQ.

The database schema is designed to support:

- companies
- users
- roles and permissions
- projects
- stages
- working days
- workforce
- expenses
- invoices
- extra works
- documents
- photos
- reports
- approvals
- audit logs

---

## Database Technology

ConstructIQ will use:

- PostgreSQL
- Prisma ORM
- UUID primary keys
- relational data model

---

## Core Principles

The database must support:

- Single Source of Truth
- Role-Based Access Control
- Approval Workflow
- Audit Trail
- Versioning
- Confidential Financial Data
- Digital Twin structure

---

## Naming Conventions

Tables use plural snake_case names.

Examples:

```text
users
projects
project_stages
working_days
worker_attendance
extra_works
audit_logs


---

# Operational Data Model

## working_days

Represents a single construction working day.

Fields:

```text
id
project_id
stage_id
engineer_id
work_date
weather
temperature
status
notes
created_at
updated_at
approved_at

## activity_templates

Represents reusable construction activities defined by the company.

Fields:

```text
id
company_id
name
category
description
status
created_at
updated_at
archived_at