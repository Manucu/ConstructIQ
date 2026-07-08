# Architecture

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

## Purpose

This document defines the technical architecture of ConstructIQ.

It explains how the main parts of the system work together: frontend, backend, database, authentication, authorization, storage, reporting and future AI capabilities.

---

## Architecture Overview

ConstructIQ follows a modular web application architecture.

```text
Frontend
React + TypeScript + Tailwind

↓

Backend API
Node.js + Express

↓

Application Services
Business Logic + Finance Logic + Approval Logic

↓

Database
PostgreSQL + Prisma

↓

Storage
Documents + Photos + Invoices

↓

Reports
PDF Generation

↓

Future AI Assistant
Summaries + Predictions + Recommendations