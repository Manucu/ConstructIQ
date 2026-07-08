# Workforce Costs

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Workforce Costs module calculates the internal labor cost of construction projects.

The objective is to provide accurate project cost tracking while keeping employee compensation confidential.

ConstructIQ does not manage payroll.

---

# Scope

The module applies to:

- Workers
- Site Engineers
- Supervisors
- Subcontractors

---

# Objectives

The Workforce Costs module aims to:

- calculate labor costs automatically
- improve budget accuracy
- support project profitability analysis
- protect confidential compensation data

---

# Core Principle

ConstructIQ calculates:

- labor cost by Working Day
- labor cost by Stage
- labor cost by Project

ConstructIQ does NOT calculate:

- salaries
- taxes
- bonuses
- vacations
- payroll

---

# Workforce Structure

Every worker contains:

- Full Name
- Role
- Company
- Status
- Internal Hourly Rate
- Internal Daily Rate (optional)
- Active / Inactive

Hourly and daily rates are confidential.

---

# Roles Included

Examples:

- Site Engineer
- Foreman
- Mason
- Carpenter
- Steel Fixer
- Electrician
- Plumber
- Painter
- Equipment Operator
- General Laborer
- Subcontractor

Future versions may support custom roles.

---

# Attendance

Site Engineers register:

- Worker
- Date
- Stage
- Worked Hours
- Activity

No financial information is displayed.

---

# Cost Calculation

Labor Cost is calculated automatically using:

Worked Hours

×

Internal Hourly Rate

↓

Labor Cost

The calculation runs after Working Day approval.

---

# Labor Cost Levels

ConstructIQ calculates labor cost at multiple levels.

## Working Day

Daily labor cost.

---

## Stage

Sum of all approved Working Days belonging to the Stage.

---

## Project

Sum of all approved Stage labor costs.

---

## Company

Future version.

Aggregate labor costs across all projects.

---

# Confidential Information

Visible only to:

- Owner
- Accountant

Not visible to:

- Site Engineers
- Clients

Project Managers may see summarized labor costs but not individual worker rates.

---

# Automatic Updates

When a Working Day is approved:

- Labor Cost updates
- Stage Cost updates
- Project Cost updates
- Budget Consumption updates
- Reports update
- Business Health updates

---

# Subcontractors

Subcontractors may be tracked in two ways:

Option 1

As individual workers.

Option 2

As a single subcontractor company with an agreed project cost.

The implementation depends on company preferences.

---

# Financial Reporting

Labor Costs contribute to:

- Stage Budget
- Project Budget
- Cost Reports
- Profitability Reports
- Business Health

Individual rates remain hidden.

---

# Security

Role-Based Access Control (RBAC)

Permission examples:

- workforce.view
- workforce.create
- workforce.edit
- workforce.cost.view
- workforce.rate.view

Only authorized roles may access confidential financial information.

---

# Business Rules

The Workforce Costs module follows:

- BR-007 — Worker rates are confidential
- BR-008 — ConstructIQ does not manage payroll
- BR-009 — Labor costs are calculated automatically
- BR-021 — Security is role-based

---

# Real World Scenario

A Site Engineer registers:

12 workers

↓

Foundation Stage

↓

8 worked hours

↓

Working Day submitted

↓

Project Manager approves

↓

ConstructIQ calculates:

Total Labor Cost

↓

Foundation Cost updated

↓

Project Budget updated

↓

Reports updated

The Site Engineer never sees the hourly rates.

---

# Future Improvements

Future versions may include:

- overtime tracking
- productivity metrics
- labor forecasting
- crew performance analysis
- AI workforce optimization
- biometric attendance integration

---

# Related Documents

- COST_ACCOUNTING.md
- COST_CALCULATION.md
- BUDGET_SYSTEM.md
- WORKING_DAY.md
- USER_ROLES.md
- BUSINESS_RULES.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |