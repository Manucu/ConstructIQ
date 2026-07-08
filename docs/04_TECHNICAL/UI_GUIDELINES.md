# UI Guidelines

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the User Interface (UI) and User Experience (UX) principles of ConstructIQ.

The objective is to provide a consistent, professional and intuitive interface across the entire application.

---

# Design Philosophy

ConstructIQ is designed for professionals working in the construction industry.

The interface must be:

- clean
- predictable
- fast
- informative
- easy to use on-site
- optimized for desktop and tablet

Users should spend their time managing projects, not learning the interface.

---

# Core Principles

ConstructIQ follows these UI principles:

- Consistency
- Simplicity
- Clarity
- Accessibility
- Responsiveness
- Minimalism

---

# Design System

ConstructIQ uses:

- Tailwind CSS
- shadcn/ui
- Lucide Icons

Custom components should follow the existing design system.

---

# Layout Structure

Every page follows the same layout.

```
Top Navigation

↓

Sidebar

↓

Page Header

↓

Tabs

↓

Content

↓

Action Bar
```

Users should never need to relearn navigation.

---

# Navigation

Main navigation includes:

- Dashboard
- Projects
- Workforce
- Finance
- Reports
- Settings

Navigation should always remain visible.

---

# Page Structure

Every page should contain:

Page Title

↓

Short Description (optional)

↓

Primary Actions

↓

Tabs (if applicable)

↓

Main Content

↓

Secondary Information

---

# Cards

Cards group related information.

Examples:

- Project Summary
- Budget Summary
- Project Health
- Business Health
- Cost Breakdown

Cards should remain visually consistent throughout the application.

---

# Tables

Tables should support:

- sorting
- filtering
- pagination
- searching

Large tables should avoid horizontal scrolling whenever possible.

---

# Forms

Forms should:

- validate immediately
- clearly indicate required fields
- display readable error messages
- save only valid information

Required fields should be clearly marked.

---

# Buttons

Primary Button

Used for the main action.

Examples:

Save

Create Project

Approve

---

Secondary Button

Used for alternative actions.

Examples:

Cancel

Back

Preview

---

Danger Button

Used only for destructive actions.

Examples:

Archive

Delete

Reject

---

# Colors

Primary

Blue

Used for navigation and primary actions.

---

Success

Green

Approved

Completed

Healthy

---

Warning

Orange

Attention Required

Pending

---

Danger

Red

Critical

Rejected

Over Budget

---

Neutral

Gray

Backgrounds

Borders

Secondary Text

---

# Icons

Lucide Icons should be used consistently.

Examples:

Project

Folder

Stage

Hammer

Working Day

Calendar

Budget

Wallet

Invoice

Receipt

Report

File Text

Photo

Image

Notification

Bell

---

# Typography

Page Titles

Large

Bold

---

Section Titles

Medium

Bold

---

Body Text

Regular

Readable

---

Secondary Information

Smaller

Muted

---

# Spacing

Consistent spacing should be applied.

Recommended spacing scale:

- 4 px
- 8 px
- 16 px
- 24 px
- 32 px

Avoid arbitrary spacing values.

---

# Responsive Design

ConstructIQ supports:

Desktop

Tablet

Mobile (future version)

Desktop remains the primary platform.

---

# Dashboard Principles

Dashboards should answer questions immediately.

Examples:

How many active projects?

How much has been spent?

Which projects are delayed?

What needs approval?

Avoid unnecessary decorative elements.

---

# Status Indicators

Use colors consistently.

Green

Healthy

Approved

Completed

---

Yellow

Pending

Needs Review

---

Orange

Attention Required

---

Red

Critical

Rejected

Over Budget

---

# Project Health

Health indicators should always include:

Score

Status

Explanation

Example:

Project Health

94 / 100

Excellent

All calculations should be explainable.

---

# Financial Information

Always separate:

Estimated Budget

Actual Cost

Remaining Budget

Variance

Never combine estimated and actual values without labels.

---

# Accessibility

ConstructIQ should support:

- keyboard navigation
- readable contrast
- clear focus states
- descriptive labels
- scalable typography

Accessibility is considered from the beginning.

---

# Performance

The interface should:

- load quickly
- avoid unnecessary animations
- display loading states
- provide immediate feedback

---

# Error Handling

Errors should explain:

- what happened
- why it happened
- how to fix it

Avoid technical error messages whenever possible.

---

# Empty States

Every empty page should guide the user.

Example:

"No Working Days have been created yet."

↓

Create your first Working Day.

---

# Future Improvements

Future versions may include:

- Dark Mode
- Compact Mode
- High Contrast Mode
- Mobile UI
- Offline Indicators
- AI Assistant Panel

---

# Related Documents

- ARCHITECTURE.md
- SYSTEM_MODULES.md
- API_GUIDELINES.md
- DIGITAL_TWIN_MODEL.md
- ../01_PRODUCT/APPLICATION_PRINCIPLES.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |