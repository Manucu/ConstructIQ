# Invoices and Reporting

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Invoices and Reporting module manages supplier invoices and automatically connects them to project costs, budgets and financial reports.

Invoices are treated as financial events that update the project's actual costs after approval.

---

# Scope

This module manages:

- Supplier Invoices
- Material Invoices
- Equipment Invoices
- Transport Invoices
- Other Expense Invoices
- Financial Reports
- PDF Export

---

# Objectives

The module aims to:

- centralize supplier invoices
- eliminate manual cost calculations
- improve financial transparency
- simplify reporting
- maintain complete financial traceability

---

# Invoice Lifecycle

Create Invoice

↓

Upload PDF

↓

Assign Supplier

↓

Assign Project

↓

Assign Stage

↓

Select Cost Category

↓

Review

↓

Approve

↓

Project Costs Updated

↓

Reports Updated

---

# Invoice Information

Each invoice contains:

## General Information

- Invoice Number
- Invoice Date
- Supplier
- Currency
- Total Amount
- VAT
- Payment Status

---

## Project Information

- Company
- Project
- Stage
- Working Day (optional)

---

## Cost Category

Every invoice belongs to one category:

- Materials
- Equipment
- Transport
- Other Costs

---

## Documents

Every invoice stores:

- Original PDF
- Attachments (optional)

The uploaded invoice remains permanently attached to the project.

---

# Invoice Approval

Statuses:

Draft

↓

Submitted

↓

Approved

↓

Locked

Rejected invoices do not affect financial calculations.

---

# Automatic Financial Updates

After approval ConstructIQ automatically updates:

- Material Cost
- Equipment Cost
- Transport Cost
- Other Costs
- Stage Cost
- Project Cost
- Budget Consumption
- Reports
- Business Health

---

# Supplier Management

Every invoice belongs to one Supplier.

Supplier information includes:

- Company Name
- VAT Number
- Contact Information
- Payment Terms

Suppliers are managed through Master Data.

---

# Payment Status

Each invoice contains:

- Pending
- Partially Paid
- Paid
- Cancelled

Payment status is informational and does not modify project costs.

---

# Reporting

The module generates:

## Invoice Register

Complete list of project invoices.

---

## Supplier Report

Invoices grouped by supplier.

---

## Cost Category Report

Invoices grouped by:

- Materials
- Equipment
- Transport
- Other Costs

---

## Stage Report

Invoices grouped by construction stage.

---

## Project Financial Report

Includes:

- Total Invoice Value
- Approved Costs
- Budget Consumption
- Remaining Budget
- Extra Works
- Estimated Margin

---

# PDF Reports

Version 1.0 supports PDF export.

Each report contains:

- Company Information
- Project Information
- Reporting Period
- Financial Summary
- Cost Breakdown
- Invoice Summary

---

# Invoice Visibility

## Owner

Full access.

---

## Accountant

Full access.

---

## Project Manager

View only.

---

## Site Engineer

May view invoices related to assigned projects.

Cannot approve invoices.

Cannot view confidential financial details such as labor rates.

---

## Client

No access unless explicitly shared.

---

# Security

Invoices cannot be permanently deleted.

Approved invoices become read-only.

Every modification creates a new version.

The original uploaded PDF is always preserved.

---

# Business Rules

The module follows:

- BR-006 — Every important action is traceable.
- BR-012 — Only approved invoices affect budgets.
- BR-020 — Reports use approved information only.
- BR-022 — Business information is never permanently deleted.

---

# Real World Scenario

Concrete is delivered to the construction site.

↓

The Owner uploads the supplier invoice.

↓

The invoice is assigned to:

Project

↓

Foundation Stage

↓

Category: Materials

↓

The Accountant approves the invoice.

↓

ConstructIQ automatically updates:

- Material Cost
- Foundation Budget
- Project Budget
- Cost Reports
- Dashboard
- Business Health

The invoice PDF remains attached to the project forever.

---

# Future Improvements

Future versions may include:

- OCR invoice recognition
- Automatic supplier detection
- Automatic VAT extraction
- QR invoice validation
- Integration with accounting software
- E-invoicing support
- Duplicate invoice detection

---

# Related Documents

- COST_ACCOUNTING.md
- COST_CALCULATION.md
- BUDGET_SYSTEM.md
- WORKFORCE_COSTS.md
- REPORTS.md
- APPROVAL_SYSTEM.md
- BUSINESS_RULES.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |