# NexusCRM — CRM intelligent piloté par agents IA

> Vos agents CRM travaillent pendant que vous dormez. Leads qualifiés, relances envoyées, pipeline mis à jour.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.1_70B-FF6B35?style=flat)](https://groq.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql)](https://postgresql.org)

---

## Vue d'ensemble

NexusCRM est un CRM de nouvelle génération piloté par des agents IA autonomes. Les agents (Qualification, Relance, Enrichissement, Prévision) travaillent en continu sur les données du pipeline, qualifient les leads entrants selon 47 critères, génèrent des relances personnalisées, et maintiennent le pipeline à jour sans saisie manuelle.

**Domaine :** Sales CRM / AI Agents  
**Port VM :** 3015 | **Sous-domaine :** nexuscrm.wikolabs.com

---

## Stack technique

| Couche | Technologie | Rôle |
|--------|------------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Recharts | Pipeline view, agents status, activités |
| Backend | FastAPI (Python 3.11), Uvicorn | API CRM, orchestration agents |
| LLM Agents | Groq (llama-3.1-70b-versatile) | Qualification, enrichissement, relances |
| Agent Orchestration | LangGraph (stateful) | Workflow agents multi-étapes |
| Task Queue | Celery + Redis | Agents async, retries |
| Base de données | PostgreSQL 16 | Contacts, deals, activités, agent logs |
| Cache | Redis 7 | Agent state, rate limiting Groq |
| Infra | Docker Compose, Nginx | VM mono-repo (port 3015) |

### backend/requirements.txt
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
groq==0.9.0
langgraph==0.1.19
langchain==0.2.1
celery==5.4.0
redis==5.0.4
asyncpg==0.29.0
sqlalchemy[asyncio]==2.0.30
pydantic==2.7.1
httpx==0.27.0
```

---

## Architecture mono-repo

```
nexuscrm/
├── frontend/
│   ├── src/app/
│   │   ├── page.tsx              # Pipeline + agents live status
│   │   ├── deals/[id]/           # Fiche deal + timeline agent
│   │   ├── agents/               # Dashboard agents + logs
│   │   └── contacts/             # Carnet de contacts enrichi
│   └── src/components/
│       ├── PipelineKanban.tsx    # Kanban avec scores IA
│       ├── AgentCard.tsx         # Statut + dernière action agent
│       ├── AgentTimeline.tsx     # Chronologie actions des agents
│       ├── QualificationBadge.tsx # 47 critères → score ICP
│       └── FollowupDraft.tsx     # Brouillon relance généré par IA
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   │   ├── deals.py          # CRUD deals + pipeline
│   │   │   ├── contacts.py       # CRUD contacts + enrichment
│   │   │   └── agents.py         # Status + logs agents
│   │   ├── agents/
│   │   │   ├── qualification.py  # Agent qualification 47 critères
│   │   │   ├── followup.py       # Agent génération relances
│   │   │   ├── enrichment.py     # Agent enrichissement contact
│   │   │   └── forecast.py       # Agent mise à jour pipeline
│   │   └── models/
│   │       ├── deal.py
│   │       └── contact.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
└── .github/workflows/deploy.yml
```

---

## Diagrammes UML

### Architecture système

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f766e', 'primaryTextColor': '#fff', 'primaryBorderColor': '#0d9488', 'lineColor': '#374151', 'secondaryColor': '#f0fdfa'}}}%%
flowchart TB
    subgraph VM["🖥️ VM — Docker Compose (port 3015)"]
        NEXT["Next.js 14\nCRM Dashboard"]
        API["FastAPI"]

        subgraph AGENTS["🤖 AI Agents"]
            QUALIF["Agent Qualification\n47 critères ICP"]
            FOLLOWUP["Agent Relance\nPersonnalisation LLM"]
            ENRICH["Agent Enrichissement\nDonnées entreprise"]
            FORECAST["Agent Forecast\nMise à jour pipeline"]
        end

        PG[("PostgreSQL\nContacts + Deals")]
        REDIS[("Redis\nAgent queue + state")]
    end

    GROQ["Groq LLM\nllama-3.1-70b"] --> AGENTS
    CELERY["Celery Workers"] --> AGENTS
```

### Séquence — Traitement d'un nouveau lead par les agents

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f766e', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
sequenceDiagram
    participant FORM as Lead Form
    participant API as FastAPI
    participant QUALIF as Agent Qualification
    participant ENRICH as Agent Enrichissement
    participant FOLLOWUP as Agent Relance
    participant GROQ as Groq LLM
    participant SDR as SDR

    FORM->>API: POST /contacts {name: "Marie D.", email: "m.dupont@acme.fr", company: "Acme Corp"}

    API->>QUALIF: qualify_async(contact_id)
    QUALIF->>GROQ: evaluate_47_criteria(contact, company_data)
    GROQ-->>QUALIF: {score: 84, fit: HIGH, criteria_met: 39/47}
    QUALIF->>API: update_contact(icp_score=84, stage=QUALIFIED)

    API->>ENRICH: enrich_async(contact_id)
    ENRICH->>ENRICH: fetch_public_data(domain=acme.fr)
    ENRICH-->>API: {employees: 250, sector: "logistics", tech_stack: ["Salesforce"]}

    API->>FOLLOWUP: generate_followup(contact_id)
    FOLLOWUP->>GROQ: generate_personalized_email(contact, company, sector)
    GROQ-->>FOLLOWUP: "Bonjour Marie, j'ai vu que Acme Corp cherche à optimiser sa logistique..."
    FOLLOWUP->>SDR: draft_email_ready_for_review

    API-->>FORM: {contact_id: "c_xyz", score: 84, status: "qualified", agents_running: 2}
```

### Modèle de données (ER)

```mermaid
%%{init: {'theme': 'base', 'themeVariables': {'primaryColor': '#0f766e', 'primaryTextColor': '#fff', 'lineColor': '#374151'}}}%%
erDiagram
    CONTACT {
        uuid id PK
        string first_name
        string last_name
        string email
        string company_id
        float icp_score
        int criteria_met
        string pipeline_stage
        boolean is_enriched
        timestamp created_at
    }
    COMPANY {
        uuid id PK
        string name
        string domain
        int employees
        string sector
        string[] tech_stack
    }
    DEAL {
        uuid id PK
        uuid contact_id FK
        float amount
        string stage
        float probability
        string last_agent_action
        timestamp expected_close
    }
    AGENT_LOG {
        uuid id PK
        uuid contact_id FK
        string agent_type
        string action
        jsonb result
        timestamp executed_at
    }

    CONTACT }o--|| COMPANY : "works_at"
    CONTACT ||--o{ DEAL : "has"
    CONTACT ||--o{ AGENT_LOG : "processed_by"
```

---

## PRD

### Problème
Les CRM sont des outils de saisie, pas d'intelligence. Les commerciaux passent 30% de leur temps à mettre à jour les fiches, qualifier les leads, et rédiger des relances. La donnée CRM est souvent obsolète car personne n'a le temps de la maintenir.

### Solution
NexusCRM inverse le paradigme : les agents IA maintiennent le CRM à jour automatiquement. Le commercial ne saisit rien, il valide les suggestions des agents et intervient là où l'humain est indispensable (appel, négociation).

### Utilisateurs cibles
| Persona | Besoin |
|---------|--------|
| Commercial | CRM toujours à jour, relances rédigées, rien à saisir |
| Sales Manager | Visibilité pipeline en temps réel, agents transparents |
| RevOps | Qualité données CRM, analytics sans nettoyage |

### OKRs
- Temps de saisie CRM commercial : -70%
- Qualité données (complétude contacts) : > 90%
- Leads qualifiés par l'agent en < 5 minutes après réception

---

## User Stories

```
US-01 [Commercial] En tant que commercial,
      je veux que l'agent qualification évalue chaque nouveau lead
      sur 47 critères et me dise s'il vaut la peine que je l'appelle
      afin de ne pas perdre de temps sur des leads hors ICP.

US-02 [Commercial] En tant que commercial,
      je veux trouver dans ma boîte mail un brouillon de relance
      personnalisé pour chaque lead en attente depuis 3 jours
      afin d'envoyer la relance en 1 clic.

US-03 [RevOps] En tant que Revenue Ops,
      je veux que l'agent enrichissement complète automatiquement
      les fiches contacts (taille entreprise, tech stack, secteur)
      sans que les commerciaux n'aient à chercher ces infos.

US-04 [Manager] En tant que Sales Manager,
      je veux voir le log de toutes les actions de chaque agent
      (ce qu'il a analysé, décidé, fait)
      afin de pouvoir auditer et corriger les comportements.

US-05 [Admin] En tant qu'admin,
      je veux configurer les 47 critères de qualification
      en fonction de notre ICP actuel
      afin que l'agent s'adapte à nos critères métier.
```

---

## Règles métier (agents)

| # | Agent | Règle | Simulable UI |
|---|-------|-------|-------------|
| R1 | Qualification | 47 critères ICP (secteur, taille, rôle, budget, urgence...) | ✅ Criteria editor |
| R2 | Qualification | Score ≥ 70 → QUALIFIED, < 40 → DISQUALIFIED | ✅ Score badge |
| R3 | Relance | Pas d'activité en 3j → brouillon relance LLM | ✅ Draft preview |
| R4 | Relance | Cooldown 7j entre 2 relances du même agent | ✅ Cooldown |
| R5 | Enrichissement | Fetch public: LinkedIn, Clearbit-compatible, WHOIS | ✅ Enrich progress |
| R6 | Forecast | Mise à jour probabilité deal si inactivité > 7j (-5%) | ✅ Decay demo |
| R7 | Coordination | Agents ne se déclenchent pas en parallèle sur le même contact | ✅ Lock indicator |
| R8 | Human override | Toute action agent annulable par le commercial | ✅ Override button |
| R9 | Rate limiting | Max 100 appels Groq/heure (protection budget) | ✅ API meter |
| R10 | Audit trail | Chaque action agent loguée avec input/output | ✅ Agent log |

---

## Spécification API

**Base URL :** `http://nexuscrm.wikolabs.com/api/v1`

### POST /contacts
```json
{"first_name": "Marie", "last_name": "Dupont", "email": "m.dupont@acme.fr", "company": "Acme Corp"}
// Response: {"contact_id": "c_xyz", "agents_triggered": ["qualification", "enrichment"]}
```

### GET /contacts/{id}/agent-log
```json
// Response: {"logs": [{"agent": "qualification", "action": "evaluated_47_criteria", "result": {"score": 84, "fit": "HIGH"}, "at": "2024-03-15T09:12:00Z"}]}
```

### GET /agents/status
```json
// Response: {"agents": [{"name": "Qualification", "status": "active", "tasks_today": 47, "last_run": "09:12:00"}, ...]}
```

---

## Simulation UI

| Composant | Description |
|-----------|-------------|
| **Pipeline Kanban** | Colonnes avec score ICP sur chaque deal card |
| **Agent Status Board** | 4 agents avec statut live, dernière action, tâches aujourd'hui |
| **Agent Timeline** | Chronologie détaillée des actions par contact |
| **Followup Draft** | Panneau latéral avec email LLM généré + bouton "Envoyer / Modifier" |
| **Qualification Matrix** | Vue des 47 critères cochés/non-cochés pour chaque lead |

---

## Déploiement

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:16-alpine
    environment: {POSTGRES_DB: nexuscrm, POSTGRES_USER: nc_user, POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"}
  redis:
    image: redis:7-alpine
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://nc_user:${POSTGRES_PASSWORD}@postgres/nexuscrm
      GROQ_API_KEY: "${GROQ_API_KEY}"
      REDIS_URL: redis://redis:6379
    depends_on: [postgres, redis]
    expose: ["8000"]
  worker:
    build: ./backend
    command: celery -A app.celery_app worker --loglevel=info
    depends_on: [redis]
  frontend:
    build: ./frontend
    expose: ["3000"]
  nginx:
    image: nginx:alpine
    ports: ["3015:80"]
volumes:
  pg_data:
```

---

## Roadmap

### Phase 1 — MVP
- [ ] Pipeline CRM + contacts
- [ ] Agent Qualification (règles statiques)
- [ ] Dashboard agents

### Phase 2 — Intelligence
- [ ] Agent Relance (Groq LLM)
- [ ] Agent Enrichissement
- [ ] LangGraph multi-agent coordination

### Phase 3 — Autonomie complète
- [ ] Agent Forecast (pipeline auto-mis à jour)
- [ ] Intégration email (envoyer depuis CRM)
- [ ] Multi-CRM sync (Salesforce, HubSpot)

---

*Un produit [Wikolabs](https://wikolabs.com) — Intelligence artificielle appliquée aux métiers*
