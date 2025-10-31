#!/bin/bash
# start backend for dev
python -m venv .venv 2>/dev/null || true
source .venv/bin/activate
pip install -r requirements.txt
python init_db.py || true
python seed_data.py || true
uvicorn app.main:app --reload --port 8000
