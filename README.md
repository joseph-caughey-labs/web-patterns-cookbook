# web-patterns-cookbook

> 🧠 A living cookbook of real-world web engineering patterns — Authentication, Webhooks, Pagination, and more, built with TypeScript and Express.

---

## 🚀 Overview

The **Web Patterns Cookbook** is a curated collection of production-grade backend and API patterns, demonstrating how to design scalable, maintainable, and testable web services. Each module is a standalone example complete with source code, tests, and documentation.

Whether you're building SaaS products, APIs, or microservices, this repository serves as a **reference library** of best practices for solving common web development challenges.

---

## 🧩 Features

* 🔐 **Authentication & RBAC** – Mock login, role-based access control, and middleware composition.
* 📨 **Webhook Idempotency & Retries** – Handling repeat deliveries safely with deduplication and TTL caching.
* 📖 **Cursor-Based Pagination** – Efficient page fetching for APIs and infinite scroll UIs.
* 🧪 **Full Testing Suite** – Each package includes unit tests using [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest).
* ⚙️ **TypeScript-first** – Strongly typed, modern ECMAScript modules.
* 🧱 **Workspace Monorepo** – Managed with `pnpm` and `turbo` for clean builds and parallel testing.

---

## 🏗️ Project Structure

```
web-patterns-cookbook/
├── package.json             # pnpm workspaces + turbo
├── turbo.json               # pipeline configuration
├── tsconfig.base.json       # shared TypeScript config
├── .github/workflows/ci.yml # GitHub Actions (CI/CD)
├── packages/
│   ├── auth-rbac/                  # Auth & Role-Based Access Control
│   ├── webhooks-idempotency-retries/ # Webhooks + Idempotency
│   └── pagination-cursor/          # Cursor-based Pagination API
└── README.md
```

---

## ⚙️ Quick Start

### 1️⃣ Install dependencies

```bash
pnpm install
```

### 2️⃣ Run tests across all packages

```bash
pnpm test
```

### 3️⃣ Run an individual package in dev mode

```bash
pnpm --filter @wpc/auth-rbac dev
pnpm --filter @wpc/webhooks-idempotency-retries dev
pnpm --filter @wpc/pagination-cursor dev
```

Each package will start its own local Express server with sample routes.

---

## 🧱 Package Summaries

### **1. @wpc/auth-rbac**

Simple authentication and role-based access control demo using Express middleware.

**Endpoints:**

* `POST /login` → Fake login sets session cookie (`username:role`)
* `GET /profile` → Requires authenticated user
* `GET /admin` → Requires `admin` role

**Example:**

```bash
curl -X POST http://localhost:3001/login -d '{"username":"joey","role":"admin"}' -H 'Content-Type: application/json'
```

---

### **2. @wpc/webhooks-idempotency-retries**

Demonstrates how to handle webhook events safely with idempotency keys, retries, and deduplication.

**Features:**

* Validates `Idempotency-Key` header
* Caches processed events in memory (stub for Redis/DB)
* Returns the same response for duplicate deliveries

**Example:**

```bash
curl -X POST http://localhost:3002/webhook -H 'Idempotency-Key: abc-123' -d '{"a":1}' -H 'Content-Type: application/json'
```

---

### **3. @wpc/pagination-cursor**

Implements cursor-based pagination for API results, using base64-encoded cursors.

**Endpoints:**

* `GET /items?limit=10&cursor=<token>` → Paginated list

**Response:**

```json
{
  "items": [{"id":1,"name":"Item 1"}, ...],
  "nextCursor": "MTA="
}
```

---

## 🧪 Testing

Each package has its own test suite powered by **Vitest** + **Supertest**.
Run all tests:

```bash
pnpm test
```

Run tests for one package:

```bash
pnpm --filter @wpc/auth-rbac test
```
