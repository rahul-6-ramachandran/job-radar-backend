#  Job Radar

A personal, automated job discovery system that aggregates **Software Engineering roles** from multiple company career pages and surfaces them in one place with filtering, ranking, and notifications.

Built to help engineers discover relevant jobs faster than LinkedIn saturation cycles.

---

## 🧠 Why this exists

Most job platforms:

- Show irrelevant roles (HR, Sales, Marketing)
- Rank jobs by ads, not relevance
- Hide fresh postings behind algorithmic noise

**Job Radar solves this by:**

- Pulling jobs directly from company sources
- Filtering only engineering roles
- Ranking jobs by relevance
- Running automated hourly syncs
- Preparing data for alerts + dashboards

---

## ⚙️ Tech Stack

- **Backend:** NestJS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Scheduler:** @nestjs/schedule (Cron Jobs)
- **HTTP Client:** Axios
- **Infra:** Docker (PostgreSQL)
- **Frontend:** (Planned - Next.js)

---

## 🏗️ Architecture

```text
Greenhouse / Lever / Ashby APIs
            ↓
      NestJS Cron Job
            ↓
   Role Filtering Engine
            ↓
   Relevance Scoring System
            ↓
      PostgreSQL (Prisma)
            ↓
        REST API
