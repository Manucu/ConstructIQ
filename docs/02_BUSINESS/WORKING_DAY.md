# Working Day

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Working Day module represents the daily operational activity performed on a construction site.

Every significant event that occurs during a working day should be recorded once and automatically connected to the entire project.

The Working Day is the operational heart of ConstructIQ.

---

# Scope

The Working Day module manages:

- attendance
- workforce
- weather
- activities
- materials
- equipment
- expenses
- extra works
- photos
- documents
- notes
- daily progress

---

# Objectives

The module aims to:

- eliminate paper daily reports
- reduce duplicated information
- create complete project history
- automate reporting
- improve project traceability

---

# Working Day Lifecycle

Open Working Day

↓

Register Workforce

↓

Register Activities

↓

Register Materials

↓

Register Equipment

↓

Register Expenses

↓

Register Extra Works

↓

Upload Photos

↓

Add Notes

↓

Submit

↓

Review

↓

Approve

↓

Daily Report Generated

---

# Working Day Information

Each Working Day contains:

## General Information

- Project
- Stage
- Date
- Site Engineer
- Status
- Weather
- Temperature
- Start Time
- End Time

---

## Workforce

Engineer selects workers from Master Data.

For every worker:

- Name
- Role
- Worked Hours
- Overtime (optional)
- Notes

Hourly rates remain hidden.

Labor costs are calculated automatically.

---

## Activities

Multiple activities may be recorded.

Example:

- Excavation
- Formwork
- Reinforcement
- Concrete Pouring
- Masonry
- Roofing

Each activity stores:

- description
- duration
- responsible team
- completion percentage

---

## Materials

Engineer records:

- material
- quantity
- unit
- supplier (optional)

Material costs are updated automatically after invoice approval.

---

## Equipment

Examples:

- Excavator
- Crane
- Concrete Pump

Engineer records:

- operating hours
- activity
- notes

Equipment cost is calculated automatically.

---

## Expenses

Engineer may register:

- fuel
- transportation
- rentals
- miscellaneous costs

Financial approval is required before affecting budgets.

---

## Extra Works

Engineer creates Extra Work records.

Extra Works include:

- description
- hours
- materials
- equipment
- photos

Owner defines final selling price.

---

## Photos

Photos may be attached to:

- Working Day
- Activity
- Extra Work

Future versions may include:

- GPS location
- timestamp verification
- annotations

---

## Documents

Engineer may upload:

- delivery notes
- inspection reports
- signed documents

Documents remain permanently attached to the Working Day.

---

## Notes

Free-text observations.

Examples:

- weather delay
- supplier delay
- client request
- safety issue

---

# Daily Progress

Engineer updates:

Completed %

Remaining %

Estimated Finish

These values update Stage Progress automatically.

---

# Approval Workflow

Draft

↓

Submitted

↓

Reviewed

↓

Approved

↓

Locked

Approved Working Days become read-only.

Corrections create new versions.

---

# Automatic Calculations

After approval ConstructIQ automatically updates:

- Stage Progress
- Project Progress
- Labor Cost
- Material Consumption
- Equipment Cost
- Expenses
- Business Health
- Project Health
- Timeline
- Reports

---

# Generated Reports

Approved Working Days automatically generate:

- Daily Report
- Weekly Summary
- Monthly Summary
- Stage Report
- Project Report

---

# Security

Site Engineer

Can:

- create
- edit drafts
- submit

Cannot:

- approve
- edit approved records
- view worker rates

---

Project Manager

Can:

- review
- approve
- request corrections

---

Owner

Can:

- review
- approve
- reopen (with justification)
- archive

---

# Business Rules

BR-003

Every Working Day belongs to one Stage.

BR-004

Information is recorded only once.

BR-005

Approved information cannot be edited.

BR-006

Every action is traceable.

BR-009

Labor cost is calculated automatically.

BR-014

Extra Works require approval.

---

# Real World Scenario

07:00

Engineer arrives on site.

↓

Opens Working Day.

↓

Registers 12 workers.

↓

Weather: Sunny.

↓

Concrete delivery received.

↓

Excavator works 6 hours.

↓

Additional reinforcement requested.

↓

Creates Extra Work.

↓

Uploads 15 photos.

↓

Registers fuel expense.

↓

Closes Working Day.

↓

Project Manager approves.

↓

Daily Report generated.

↓

Dashboard updated.

↓

Business Health recalculated.

---

# Future Improvements

Future versions may include:

- voice input
- offline mode
- QR attendance
- GPS verification
- AI daily summary
- automatic weather import
- BIM integration
- drone photo upload

---

# Related Documents

- USER_ROLES.md
- BUSINESS_RULES.md
- WORKFLOWS.md
- APPROVAL_SYSTEM.md
- STAGE_MANAGEMENT.md
- EXTRA_WORKS.md
- REPORTS.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |