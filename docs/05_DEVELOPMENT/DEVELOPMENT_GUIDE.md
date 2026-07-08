# Development Guide

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document defines the development workflow of ConstructIQ.

It establishes the principles, standards and implementation process used throughout the project.

The objective is to ensure consistency, maintainability and high software quality during the entire development lifecycle.

---

# Development Philosophy

ConstructIQ follows a **Documentation First** approach.

Business requirements are documented before implementation.

Code implements documentation.

Documentation is the product contract.

---

# Development Lifecycle

Every new feature follows the same lifecycle.

```

Idea

↓

Business Analysis

↓

Documentation

↓

Architecture Review

↓

Database Design

↓

Backend Implementation

↓

Frontend Implementation

↓

Testing

↓

Documentation Update

↓

Git Commit

↓

Release

```

No feature should skip these steps.

---

# Golden Rules

## Rule 1

Documentation comes before implementation.

---

## Rule 2

Business rules are never inferred from code.

Business rules are defined in documentation.

---

## Rule 3

Every feature must solve a real business problem.

---

## Rule 4

Every important action must be traceable.

---

## Rule 5

Every approved record becomes part of the Digital Twin.

---

## Rule 6

Avoid duplicate information.

Record once.

Reuse everywhere.

---

# Feature Development Workflow

Every feature should answer the following questions before implementation.

## Why?

Why does this feature exist?

---

## Who?

Which user roles will use it?

---

## What?

What business problem does it solve?

---

## Where?

Which modules are affected?

---

## How?

How does it integrate with the existing architecture?

---

# Development Order

ConstructIQ is developed in the following order.

## 1. Documentation

Business Rules

↓

Requirements

↓

Architecture

---

## 2. Database

Prisma Schema

↓

Database Migration

↓

Relationships

---

## 3. Backend

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Validation

↓

Permissions

---

## 4. Frontend

Pages

↓

Components

↓

Forms

↓

API Integration

↓

Testing

---

## 5. Reports

PDF

↓

Dashboard

↓

Statistics

---

## 6. AI

Summaries

↓

Predictions

↓

Recommendations

---

# Backend Principles

Backend is responsible for:

- business logic
- permissions
- validation
- calculations
- approvals
- audit logging

Frontend must never contain business rules.

---

# Frontend Principles

Frontend is responsible for:

- user interface
- user experience
- navigation
- forms
- data visualization

Frontend displays information.

Backend decides permissions.

---

# Database Principles

The database follows:

- Single Source of Truth
- Master Data
- Relational Design
- UUID identifiers
- Soft Delete
- Audit Trail

---

# Coding Workflow

Before writing code:

✔ Read the related documentation.

✔ Understand the business rule.

✔ Identify affected modules.

✔ Identify affected database entities.

✔ Review permissions.

Only then start implementation.

---

# Feature Checklist

Before a feature is considered complete:

☐ Business rule implemented

☐ Database updated

☐ API completed

☐ Frontend completed

☐ Validation implemented

☐ Permissions verified

☐ Audit logging implemented

☐ Documentation updated

☐ Tests completed

---

# Git Workflow

Every feature follows:

```

Create Branch

↓

Develop

↓

Test

↓

Commit

↓

Push

↓

Merge

```

Commit messages follow Conventional Commits.

Examples:

```

feat(projects): add project dashboard

fix(auth): resolve login issue

docs(finance): update cost calculation

refactor(ui): simplify project layout

```

---

# Documentation Workflow

Documentation evolves together with the application.

Whenever a business rule changes:

Business Documentation

↓

Finance Documentation

↓

Technical Documentation

↓

Implementation

Documentation is never considered optional.

---

# Testing Strategy

Every feature should be tested for:

- functionality
- permissions
- validation
- approval workflow
- financial impact
- reporting impact

---

# Release Workflow

Development

↓

Testing

↓

Documentation Review

↓

Release Notes

↓

Git Tag

↓

Deployment

---

# Definition of Done

A feature is complete only when:

- implementation finished
- documentation updated
- permissions verified
- tests passed
- code reviewed
- business requirements satisfied

---

# ConstructIQ Principles

ConstructIQ always follows:

- Documentation First
- Single Source of Truth
- Event-Driven Design
- Digital Twin
- Approval First
- Security by Design
- Modular Architecture

---

# Development Goals

Every implementation should be:

- simple
- reusable
- scalable
- secure
- documented
- testable

---

# Related Documents

- README.md
- SYSTEM_VISION.md
- ARCHITECTURE.md
- SYSTEM_MODULES.md
- API_GUIDELINES.md
- CODING_STANDARDS.md
- GIT_WORKFLOW.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |