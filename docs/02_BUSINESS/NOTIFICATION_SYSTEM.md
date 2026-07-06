    # Notification System

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

The Notification System informs users about important events occurring within ConstructIQ.

Its goal is to improve communication, reduce delays and ensure that users are aware of actions requiring their attention.

---

# Scope

Notifications are generated automatically after important business events.

They do not replace business processes, but support them.

---

# Objectives

The Notification System aims to:

- keep users informed
- reduce missed actions
- improve collaboration
- increase project transparency

---

# Notification Types

ConstructIQ supports:

- In-App Notifications
- Email Notifications (Future)
- Push Notifications (Future)

Version 1.0 uses only In-App Notifications.

---

# Notification Events

Notifications are generated for events such as:

## Projects

- Project Created
- Project Completed
- Project Archived

---

## Stages

- Stage Started
- Stage Completed

---

## Working Days

- Working Day Submitted
- Working Day Approved
- Working Day Rejected

---

## Expenses

- Expense Submitted
- Expense Approved
- Expense Rejected

---

## Invoices

- Invoice Uploaded
- Invoice Approved
- Invoice Rejected

---

## Extra Works

- Extra Work Created
- Extra Work Approved
- Extra Work Rejected

---

## Reports

- Report Generated
- Report Approved

---

# Notification Information

Each notification contains:

- Title
- Description
- Date
- Time
- Related Project
- Related Module
- Status (Read / Unread)

---

# User Visibility

Users receive only notifications related to:

- their role
- their assigned projects
- their responsibilities

Financial notifications remain visible only to authorized users.

---

# Notification Status

Unread

↓

Read

Notifications are never deleted automatically.

Users may mark them as read.

---

# Examples

Example 1

Working Day Approved

"Working Day for Foundation has been approved."

---

Example 2

Extra Work Pending Approval

"Extra Work 'Additional Reinforcement' requires your approval."

---

Example 3

Invoice Approved

"Invoice INV-2026-015 has been approved."

---

# Business Rules

Notifications:

- are generated automatically
- cannot modify business data
- follow user permissions
- remain linked to their original records

---

# Future Improvements

Future versions may include:

- email notifications
- mobile push notifications
- notification preferences
- reminder notifications
- scheduled notifications

---

# Related Documents

- USER_ROLES.md
- WORKFLOWS.md
- APPROVAL_SYSTEM.md
- PROJECT_HEALTH.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |