# Contributing to ConstructIQ

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

Thank you for your interest in contributing to ConstructIQ.

ConstructIQ is a **Digital Twin Platform for Construction Operations**, designed to improve how construction companies manage projects, costs and site activities.

This document explains how to contribute while maintaining the quality, consistency and long-term vision of the project.

---

# Development Philosophy

ConstructIQ follows a **Documentation First** approach.

Business requirements are documented before implementation.

Code implements documentation.

Documentation is considered part of the product.

---

# Before You Start

Please read the following documents before contributing:

- README.md
- SYSTEM_VISION.md
- DEVELOPMENT_GUIDE.md
- CODING_STANDARDS.md
- GIT_WORKFLOW.md
- CODE_OF_CONDUCT.md

Understanding the project philosophy is as important as understanding the code.

---

# Contribution Process

Every contribution should follow this workflow:

```
Idea

↓

Business Discussion

↓

Documentation Update

↓

Implementation

↓

Testing

↓

Documentation Review

↓

Pull Request

↓

Code Review

↓

Merge
```

---

# Branch Naming

Use descriptive branch names.

Examples:

```
feature/project-dashboard

feature/working-days

feature/finance-engine

fix/login

fix/api-validation

docs/business-rules

refactor/project-service
```

---

# Commit Messages

ConstructIQ follows Conventional Commits.

Examples:

```
feat(projects): add project dashboard

fix(auth): resolve login issue

docs(finance): update cost calculation

refactor(ui): simplify dashboard layout

test(api): add invoice endpoint tests

chore(deps): update dependencies
```

---

# Coding Standards

All code should follow the official Coding Standards document.

General expectations:

- readable
- modular
- strongly typed
- documented
- tested
- consistent

Avoid unnecessary complexity.

---

# Documentation

Documentation must be updated whenever:

- business rules change
- database changes
- API changes
- permissions change
- workflows change

Documentation and implementation must remain synchronized.

---

# Pull Requests

Every Pull Request should include:

- clear description
- reason for the change
- affected modules
- screenshots (if UI changed)
- documentation updates
- testing notes

Large Pull Requests should be avoided whenever possible.

---

# Testing

Before submitting a Pull Request, verify:

- application builds successfully
- feature works as expected
- permissions are correct
- validation works
- documentation is updated

---

# Security

Never commit:

- passwords
- API keys
- secrets
- production credentials
- .env files

Follow the Security Guidelines document.

---

# Project Principles

Every contribution should respect the ConstructIQ principles:

- Documentation First
- Single Source of Truth
- Digital Twin
- Record Once
- Approval First
- Security by Design
- Modular Architecture

---

# Reporting Bugs

When reporting a bug, include:

- description
- expected behavior
- actual behavior
- reproduction steps
- screenshots (if applicable)
- environment information

---

# Suggesting Features

Feature requests should explain:

- the business problem
- proposed solution
- expected benefits
- affected modules

Whenever possible, include real construction use cases.

---

# Respect the Architecture

Avoid introducing:

- duplicated business logic
- duplicated calculations
- direct database access from the frontend
- permission checks only in the UI

The backend remains the source of truth.

---

# Definition of Done

A contribution is considered complete when:

- implementation is finished
- documentation is updated
- tests pass
- code review is completed
- architecture remains consistent

---

# Community

ConstructIQ welcomes constructive discussions, ideas and improvements.

Respectful collaboration helps build better software.

Please follow the Code of Conduct at all times.

---

# Thank You

Every contribution helps improve ConstructIQ and brings us closer to our vision of creating the leading Digital Twin Platform for Construction Operations.

Thank you for being part of the journey.

---

# Related Documents

- README.md
- CODE_OF_CONDUCT.md
- DEVELOPMENT_GUIDE.md
- CODING_STANDARDS.md
- GIT_WORKFLOW.md
- SECURITY.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |