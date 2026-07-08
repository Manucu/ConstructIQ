# Cost Accounting

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

## Purpose

This document defines how ConstructIQ handles project cost accounting.

ConstructIQ does not manage payroll or official accounting records.  
It calculates internal project costs for budgeting, project control, profitability analysis and reporting.

---

## Scope

This document applies to:

- labor costs
- material costs
- equipment costs
- transport costs
- other project costs
- extra works
- invoices
- project profitability

---

## Core Principle

ConstructIQ is not a payroll application.

The platform does not calculate:

- salaries
- taxes
- payslips
- vacations
- social contributions

The platform calculates:

- labor cost by day
- labor cost by stage
- labor cost by project
- material cost
- equipment cost
- transport cost
- project cost
- project profitability

---

## Cost Types

ConstructIQ tracks five main cost categories:

### 1. Labor Cost

Includes:

- workers
- site engineer
- subcontractor labor

Labor cost is calculated from worked hours and confidential internal rates.

---

### 2. Material Cost

Includes:

- concrete
- steel
- bricks
- insulation
- finishing materials
- other construction materials

Material costs are usually based on approved invoices.

---

### 3. Equipment Cost

Includes:

- excavators
- cranes
- concrete pumps
- generators
- rented tools

Equipment cost may be calculated by operating hours or invoice value.

---

### 4. Transport Cost

Includes:

- material transport
- fuel
- delivery costs
- logistics

---

### 5. Other Cost

Includes:

- permits
- small tools
- consumables
- site services
- miscellaneous costs

---

## Internal Cost vs Client Value

ConstructIQ separates two financial concepts.

### Internal Cost

The real cost for the construction company.

Example:

- labor
- materials
- equipment
- transport

---

### Client Value

The amount charged to the client.

This is especially important for Extra Works.

Example:

Internal Cost: 2,300 €

Client Value: 3,100 €

Margin: 800 €

---

## Cost Ownership

Every cost must belong to:

- one Project
- one Stage

Optional links:

- Working Day
- Invoice
- Extra Work
- Document

---

## Approved Data Only

Official financial calculations use only approved data.

Draft, rejected or pending records do not affect:

- project cost
- stage cost
- budget remaining
- reports
- Business Health
- Project Health

---

## Automatic Cost Propagation

When a cost is approved, ConstructIQ updates:

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

Dashboard

↓

Business Health

---

## Business Rules

Cost accounting follows:

- BR-004 — Information is recorded only once
- BR-006 — Every important action is traceable
- BR-007 — Worker rates are confidential
- BR-008 — ConstructIQ does not manage payroll
- BR-009 — Labor costs are calculated automatically
- BR-012 — Only approved invoices affect the budget
- BR-013 — Extra Works are independent from Contract Works

---

## Real World Scenario

A Site Engineer records 12 workers and their worked hours for the Foundation stage.

The Engineer sees:

- worker names
- worked hours
- activity description

The Owner sees:

- worker names
- worked hours
- internal rates
- calculated labor cost

After approval, the labor cost updates:

- Foundation cost
- Project cost
- Budget status
- Reports

---

## Future Improvements

Future versions may include:

- cost forecasting
- cost deviation alerts
- margin analysis
- supplier cost comparison
- AI budget predictions
- cost per square meter analysis

---

## Related Documents

- WORKFORCE_COSTS.md
- BUDGET_SYSTEM.md
- COST_CALCULATION.md
- INVOICES_AND_REPORTING.md
- BUSINESS_HEALTH.md
- ../02_BUSINESS/BUSINESS_RULES.md
- ../02_BUSINESS/EXTRA_WORKS.md

---

## Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |