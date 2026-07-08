# Coding Standards

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

## Purpose

This document defines the coding standards used in ConstructIQ.

The goal is to keep the codebase clean, consistent, readable and easy to maintain.

---

## General Principles

Code should be:

- readable
- predictable
- modular
- typed
- reusable
- easy to test

Clarity is preferred over cleverness.

---

## Language

ConstructIQ uses TypeScript across the application.

Avoid using `any` unless there is a strong reason.

Prefer explicit types for:

- props
- API responses
- services
- database models
- permissions

---

## Naming Conventions

Use clear and descriptive names.

### Components

Use PascalCase.

```text
ProjectCard
DashboardLayout
AppButton