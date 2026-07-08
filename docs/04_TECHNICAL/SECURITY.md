# Security

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

## Purpose

This document defines the security principles of ConstructIQ.

Security protects company data, financial information, project records and user access.

---

## Scope

Security applies to:

- authentication
- authorization
- roles and permissions
- financial data
- worker rates
- invoices
- documents
- photos
- approvals
- audit logs
- API access

---

## Core Security Principles

ConstructIQ follows these principles:

- backend-enforced permissions
- role-based access control
- permission-based actions
- confidential financial data
- no permanent deletion
- full audit trail
- approved records are locked
- sensitive data is never exposed to unauthorized users

---

## Authentication

Users authenticate using:

- email
- password

Version 1.0 uses:

- JWT access tokens
- refresh tokens

Passwords are stored as hashes, never as plain text.

---

## Authorization

ConstructIQ uses permission-based RBAC.

Roles define responsibilities.

Permissions define capabilities.

Example permissions:

```text
invoice.approve
worker_rate.view
project.create
working_day.submit
report.generate