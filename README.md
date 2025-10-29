# Competition Pro Template

This repository is a plug-and-play template for hackathon/competition use. It includes:
- FastAPI backend with RS256 JWT auth and SQLModel (SQLite by default)
- React + Vite frontend with a small JSON-schema like form renderer
- Docker Compose for local reproducible demo

## Quickstart (local)
1. Backend:
   cd backend
   python -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   python init_db.py
   python seed_users.py
   uvicorn app.main:app --reload --port 8000

2. Frontend:
   cd frontend
   npm install
   npm run dev

Open http://localhost:5173 and http://localhost:8000/docs
