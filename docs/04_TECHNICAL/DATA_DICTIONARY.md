# Data Dictionary

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the meaning, format and usage of all important data stored in ConstructIQ.

It ensures consistency across the frontend, backend, database and reports.

---

# General Rules

All entities follow these conventions:

- UUID primary keys
- UTC timestamps
- Soft deletion
- Audit tracking
- Versioning for approved records

---

# Common Fields

## id

Type

UUID

Description

Unique identifier of the entity.

---

## created_at

Type

Timestamp

Description

Date and time when the record was created.

---

## updated_at

Type

Timestamp

Description

Date and time of the latest modification.

---

## archived_at

Type

Timestamp (nullable)

Description

Indicates that the record has been archived.

Archived records remain in the database.

---

## created_by

Type

UUID

Description

User that created the record.

---

## approved_by

Type

UUID

Description

User that approved the record.

---

## approved_at

Type

Timestamp

Description

Approval date.

---

# Project

## name

Type

String

Maximum

150 characters

Description

Official project name.

---

## contract_value

Type

Decimal

Description

Contract value agreed with the client.

---

## planned_budget

Type

Decimal

Description

Initial estimated project budget.

---

## status

Allowed values

Planning

Active

On Hold

Completed

Archived

---

# Stage

## progress_percentage

Type

Integer

Range

0–100

Description

Current completion percentage.

Automatically updated from approved Working Days.

---

## planned_budget

Type

Decimal

Description

Budget allocated to the stage.

---

# Working Day

## weather

Allowed values

Sunny

Cloudy

Rain

Snow

Wind

Fog

Other

---

## temperature

Type

Decimal

Unit

°C

---

## notes

Type

Text

Description

Engineer observations.

---

# Worker

## internal_hourly_rate

Type

Decimal

Visibility

Owner

Accountant

Only

---

## internal_daily_rate

Type

Decimal

Optional.

---

## status

Allowed values

Active

Inactive

---

# Attendance

## worked_hours

Type

Decimal

Maximum

24

---

## overtime_hours

Type

Decimal

Optional

---

# Material

## quantity

Type

Decimal

---

## unit

Examples

kg

m²

m³

pcs

L

---

## unit_price

Type

Decimal

---

# Equipment

## operating_hours

Type

Decimal

---

## hourly_rate

Type

Decimal

Visibility

Financial Roles

---

# Expense

## category

Allowed values

Fuel

Transport

Equipment

Rental

Miscellaneous

---

## amount

Type

Decimal

---

## status

Allowed values

Draft

Submitted

Approved

Rejected

Locked

---

# Invoice

## invoice_number

Type

String

Must be unique per supplier.

---

## invoice_date

Type

Date

---

## currency

Examples

EUR

RON

USD

GBP

---

## subtotal

Type

Decimal

---

## vat

Type

Decimal

---

## total

Type

Decimal

---

## payment_status

Allowed values

Pending

Partially Paid

Paid

Cancelled

---

# Extra Work

## internal_cost

Type

Decimal

Automatically calculated.

---

## client_price

Type

Decimal

Defined by Owner.

---

## margin

Formula

Client Price − Internal Cost

---

## client_approval_required

Type

Boolean

---

# Approval

## status

Allowed values

Draft

Submitted

Under Review

Approved

Rejected

Locked

---

# Report

## report_type

Allowed values

Daily

Weekly

Monthly

Stage

Project

Financial

Client

---

# Photo

## storage_url

Type

String

Description

Cloud storage location.

---

# Document

## category

Examples

Invoice

Drawing

Inspection Report

Delivery Note

Contract

Certificate

Photo Report

Other

---

# Validation Rules

ConstructIQ validates:

- required fields
- unique identifiers
- foreign key relationships
- financial consistency
- approval status
- permissions

---

# Naming Standards

Dates

snake_case

English

Singular field names

Plural table names

---

# Related Documents

- DATABASE_SCHEMA.md
- API_GUIDELINES.md
- SECURITY.md
- DOMAIN_MODEL.md

---


---

## 3. `DATA_DICTIONARY.md`

Adaugă:

```md
# Master Data Terms

## Activity Template

A reusable construction activity configured at company level.

Used in Working Days to avoid duplicated or inconsistent activity names.

---

## Client

The beneficiary of a construction project.

Clients are created once and reused across projects.

---

## Expense Category

A predefined category used to classify project expenses.

Examples:

- Fuel
- Transport
- Equipment Rental
- Utilities

---

## Unit of Measure

A standardized unit used for materials, equipment and quantities.

Examples:

- kg
- m²
- m³
- pcs
- hour

---

## Company Settings

Company-level configuration used across the platform.

Examples:

- currency
- timezone
- VAT rate
- default working hours
- approval rules

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |