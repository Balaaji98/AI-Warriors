# ABC Backend for AI Studio Frontend

This FastAPI backend implements ABC classification logic, storage, export, and a simple AI agent endpoint.

## Quick start

1. Create venv and install deps:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Initialize DB and seed:

```bash
python init_db.py
python seed_data.py
```

3. Run server:

```bash
uvicorn app.main:app --reload --port 8000
```

API base: http://127.0.0.1:8000/api
Docs: http://127.0.0.1:8000/docs
