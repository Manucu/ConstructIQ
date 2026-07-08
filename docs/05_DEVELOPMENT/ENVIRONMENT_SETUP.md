# Environment Setup

> **Build once.**
>
> **Record once.**
>
> **Trust forever.**

---

# Purpose

This document describes how to set up a local development environment for ConstructIQ.

Following these steps ensures that every developer works in a consistent environment.

---

# System Requirements

Before starting, install the following software.

## Required Software

- Git
- Node.js (LTS)
- npm
- PostgreSQL
- Visual Studio Code

Recommended:

- Docker Desktop (future)
- Postman or Bruno
- Prisma Studio

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

## Backend

- Node.js
- Express
- TypeScript

---

## Database

- PostgreSQL
- Prisma ORM

---

# Clone Repository

```bash
git clone <repository-url>

cd ConstructIQ
```

---

# Install Dependencies

Frontend

```bash
npm install
```

Backend (future)

```bash
cd server

npm install
```

---

# Environment Variables

Create:

```text
.env
```

Example:

```env
DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

PORT=

NODE_ENV=
```

Never commit the .env file.

---

# Database

Create a PostgreSQL database.

Example:

```text
constructiq
```

---

# Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

# Start Development

Frontend

```bash
npm run dev
```

Backend (future)

```bash
npm run dev
```

---

# Recommended VS Code Extensions

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- GitLens
- Error Lens
- DotENV
- Markdown All in One

---

# Project Structure

```text
ConstructIQ/

client/
server/

docs/

assets/

README.md
```

---

# Development Branch

Development should happen on feature branches.

Example:

```text
feature/project-dashboard

feature/working-days

feature/finance-engine
```

---

# Code Formatting

Use:

- ESLint
- Prettier

Formatting should be automatic on save.

---

# Git Configuration

Example:

```bash
git config --global user.name "Your Name"

git config --global user.email "your@email.com"
```

---

# Local Development Checklist

Before starting development:

☐ Pull latest changes

☐ Install dependencies

☐ Update database

☐ Generate Prisma Client

☐ Start backend

☐ Start frontend

---

# Troubleshooting

## Node Version

Verify:

```bash
node -v
```

---

## npm Version

Verify:

```bash
npm -v
```

---

## PostgreSQL

Verify connection.

---

## Prisma

If Prisma Client is outdated:

```bash
npx prisma generate
```

---

## Clean Installation

If dependencies are corrupted:

```bash
rm -rf node_modules

npm install
```

---

# Security

Never commit:

- .env
- secrets
- API keys
- production credentials

Always use environment variables.

---

# Future Improvements

Future setup may include:

- Docker
- Docker Compose
- Dev Containers
- GitHub Codespaces
- Automated setup scripts

---

# Related Documents

- README.md
- DEVELOPMENT_GUIDE.md
- CODING_STANDARDS.md
- GIT_WORKFLOW.md
- ARCHITECTURE.md

---

# Version History

| Version | Date | Description |
|----------|------|-------------|
| 1.0 | 2026 | Initial version |