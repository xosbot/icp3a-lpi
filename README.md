# ICP3A-LPI — Property Acquisition Pipeline

Integrated Certified Property Precision Acquisition & Analytics. Automated real estate acquisition system for United Investing Group LLC, targeting properties within 5km of all 28 major Indian airports.

## Repository Structure

```
ICP3A-LPI/
├── uig-llc/              # Full-stack app (FastAPI + Next.js + Docker)
│   ├── backend/          # FastAPI, Celery, PostgreSQL
│   ├── frontend/         # Next.js 14 dashboard
│   ├── nginx/            # Reverse proxy config
│   ├── postgres-init/    # DB init scripts
│   ├── docs/             # Strategy docs, n8n workflows
│   ├── docker-compose.yml
│   └── deploy.sh         # VPS deploy script
├── automation_workflows.md   # n8n + Zapier workflow reference
├── get-api-keys.js           # Playwright script to open service consoles
└── package.json              # Root deps (playwright, dotenv)
```

## Quick Start

### Docker (recommended)

```bash
cd uig-llc
cp .env.example .env   # Fill in credentials
docker compose up --build
```

Dashboard: `http://localhost:3000` | API docs: `http://localhost:8000/api/docs`

### Local Development

```bash
# Backend
cd uig-llc/backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload

# Frontend
cd uig-llc/frontend
npm install
npm run dev
```

## Tech Stack

- **Backend**: FastAPI, PostgreSQL, Redis, Celery, Alembic
- **Frontend**: Next.js 14, React 18, Tailwind CSS, Recharts
- **Automation**: n8n workflows, Zapier Zaps, Twilio WhatsApp, SendGrid email
- **CRM**: HubSpot integration
- **AI**: Claude (Anthropic) for lead scoring and document verification
- **Deployment**: Docker Compose, Nginx, Let's Encrypt SSL

## Environment Variables

Copy `uig-llc/.env.example` to `uig-llc/.env` and fill in:

- `DATABASE_URL` — PostgreSQL connection
- `SECRET_KEY` — App secret (generate with `python -c "import secrets; print(secrets.token_hex(32))"`)
- `TWILIO_*` — WhatsApp API credentials
- `SENDGRID_API_KEY` — Email API
- `HUBSPOT_API_KEY` — CRM
- `ANTHROPIC_API_KEY` — Claude AI
- `UIG_INTERNAL_API_KEY` — Internal API auth

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/docs` | Swagger UI |
| `/api/redoc` | ReDoc documentation |
| `/api/leads` | Lead management |
| `/api/outreach` | WhatsApp/email automation |
| `/api/documents` | Document verification |
| `/api/lpi` | LPI certificate issuance |
| `/api/webhooks/*` | External integrations |

## Deployment

```bash
# On VPS (Ubuntu 22.04+)
bash uig-llc/deploy.sh
```

Requires: Docker, domain pointed to VPS IP, `.env` configured.

## License

Proprietary — United Investing Group LLC.
