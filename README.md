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
        
📦 Features
 Automated Job Sync
Hourly cron job fetches latest job postings
Supports multiple companies (Postman, Stripe, etc.)
Smart Filtering

Keeps only:

Backend Engineer
Full Stack Engineer
Software Engineer (SDE)

Removes:

HR, Sales, Marketing, Recruiter roles
Location Filtering
Remote jobs

India-based office roles
🧠 Relevance Scoring (Optional Upgrade)
Jobs ranked by relevance score
Prioritizes backend / full-stack roles
🗄️ Deduplication

Prevents duplicates using:

source + externalJobId
📡 REST API
Fetch jobs
Search jobs
