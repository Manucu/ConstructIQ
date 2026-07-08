# Cost Calculation

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Cost Calculation Engine defines how ConstructIQ automatically calculates and propagates project costs.

Every approved business event updates one or more financial indicators without requiring manual calculations.

The objective is to provide real-time financial visibility throughout the project lifecycle.

---

# Scope

The Cost Calculation Engine manages:

- Labor Costs
- Material Costs
- Equipment Costs
- Transport Costs
- Other Costs
- Extra Works
- Stage Costs
- Project Costs
- Budget Consumption
- Profitability

---

# Core Principles

ConstructIQ follows these financial principles:

- Every cost belongs to one Project.
- Every cost belongs to one Stage.
- Costs are calculated automatically.
- Approved information only.
- Historical calculations are never overwritten.

---

# Cost Sources

ConstructIQ receives costs from multiple business modules.

## Workforce

Worked Hours

↓

Labor Cost

---

## Materials

Approved Invoice

↓

Material Cost

---

## Equipment

Operating Hours

↓

Equipment Cost

---

## Transport

Approved Expense

↓

Transport Cost

---

## Other Costs

Approved Expense

↓

Other Cost

---

## Extra Works

Approved Extra Work

↓

Internal Cost

↓

Client Value

---

# Calculation Flow

Business Event

↓

Cost Entry

↓

Stage Cost

↓

Project Cost

↓

Budget Consumption

↓

Reports

↓

Business Health

↓

Dashboard

---

# Labor Cost

Labor Cost is calculated using:

Worked Hours

×

Internal Hourly Rate

↓

Labor Cost

Rates remain confidential.

---

# Material Cost

Material Cost is calculated from:

Approved Invoice

↓

Material Quantity

↓

Unit Price

↓

Material Cost

---

# Equipment Cost

Equipment Cost is calculated from:

Operating Hours

×

Internal Equipment Rate

↓

Equipment Cost

---

# Transport Cost

Transport costs are imported from approved expenses.

---

# Other Costs

Other approved expenses contribute directly to project costs.

---

# Stage Cost

Stage Cost is the sum of:

Labor

+

Materials

+

Equipment

+

Transport

+

Other Costs

+

Extra Works (Internal Cost)

↓

Total Stage Cost

---

# Project Cost

Project Cost is the sum of all approved Stage Costs.

---

# Budget Consumption

Budget Consumption

=

Project Cost

÷

Project Budget

×

100%

---

# Estimated vs Actual

ConstructIQ maintains two financial values.

## Estimated Cost

Defined during planning.

---

## Actual Cost

Calculated automatically from approved information.

---

# Extra Works

Extra Works maintain two separate values.

Internal Cost

↓

Calculated automatically

Client Value

↓

Defined by Owner

Margin

=

Client Value

-

Internal Cost

---

# Automatic Recalculation

ConstructIQ recalculates financial indicators after:

- Working Day Approval
- Invoice Approval
- Expense Approval
- Equipment Update
- Extra Work Approval
- Budget Revision

---

# Profitability

Estimated Profit

=

Contract Value

+

Approved Extra Works

-

Actual Project Cost

---

# Cost Visibility

Visible:

Owner

Accountant

---

Summary Only:

Project Manager

---

Hidden:

Site Engineer

Client

---

# Security

Financial calculations cannot be modified manually.

Only approved business records affect financial indicators.

Worker rates remain confidential.

---

# Business Rules

The Cost Calculation Engine follows:

- BR-007 — Worker rates are confidential
- BR-008 — ConstructIQ does not manage payroll
- BR-009 — Labor costs are calculated automatically
- BR-012 — Only approved invoices affect budgets
- BR-013 — Extra Works remain independent

---

# Real World Scenario

Foundation Stage

12 Workers

↓

96 Worked Hours

↓

Labor Cost Calculated

↓

Concrete Invoice Approved

↓

Material Cost Updated

↓

Excavator Usage Approved

↓

Equipment Cost Updated

↓

Stage Cost Updated

↓

Project Cost Updated

↓

Budget Consumption Updated

↓

Dashboard Updated

↓

Business Health Updated

---

# Future Improvements

Future versions may include:

- AI cost prediction
- Cost anomaly detection
- Cost optimization recommendations
- Multi-currency support
- Inflation adjustment
- Forecast simulations

---

# Related Documents

- COST_ACCOUNTING.md
- WORKFORCE_COSTS.md
- BUDGET_SYSTEM.md
- INVOICES_AND_REPORTING.md
- BUSINESS_HEALTH.md
- ../02_BUSINESS/WORKING_DAY.md
- ../02_BUSINESS/EXTRA_WORKS.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |