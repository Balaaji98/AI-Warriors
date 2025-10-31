
# 🧠 Smart Retail Operations Platform – AI-Powered ABC Inventory Classification

## 1. Functional Requirements Document

### Overview
The **Smart Retail Operations Platform** helps warehouse supervisors classify inventory items into A, B, and C categories using AI-enabled rule engines and analytics. This assists in efficient stock prioritization and management.

### User Story
As a warehouse supervisor at a retail company, I want a simple inventory classification tool that categorizes items into A, B, and C groups based on their value contribution, so that I can focus on high-value items without needing advanced analytics.

### Key Functionalities
1. **Rule Engine** – Define and manage classification rules for A/B/C categories.  
2. **Manual Data Entry** – Input item name, quantity, and cost directly.  
3. **Automatic Classification** – AI-based logic categorizes items into A, B, or C.  
4. **Threshold Management** – Set min/max inventory levels for each category.  
5. **Dashboard** – Visualize categorized inventory, totals, and KPIs.  
6. **Export Options** – Download categorized data in CSV or PDF format.

### Business Benefits
- Simplifies inventory prioritization.  
- Reduces overstock of low-value items.  
- Improves warehouse efficiency and focus on high-impact inventory.  


## 2. Application Architecture

### Architecture Overview
A modular three-tier architecture with AI-powered backend intelligence.

```
Frontend (React)
   │
   ├── REST API Layer (FastAPI )
   │
   ├── AI/Rule Engine (Classification Logic and GenAI (Gemini))
   │
   └── Database Layer (SQLite)
```

### Components
- **Frontend:** User dashboard, rule management, and data input UI.  
- **Backend:** FastAPI service exposing endpoints for CRUD, classification, and reporting.  
- **AI Engine:** Implements ABC logic using rule-based or ML techniques.  
- **Database:** Stores items, rules, thresholds, and user configurations.


## 3. Technical Architecture

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React Vite | Interactive UI for item management |
| Backend | FastAPI (Python) | API services for rule engine and CRUD |
| AI Logic | Scikit-learn / Pandas / LLM - Gemini | Classification and computation engine |
| Database | SQLite | Persistent data store |
| Export Engine | ReportLab / Pandas | Generates CSV or PDF reports |

## 4. Database Design / Data Models

### Core Tables
#### `items`
| Field | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| item_name | TEXT | Name of the item |
| quantity | INT | Quantity available |
| unit_cost | FLOAT | Unit cost per item |
| category | TEXT | A/B/C classification |

#### `thresholds`
| Field | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| category | TEXT | Item category (A/B/C) |
| min_level | INT | Minimum reorder point |
| max_level | INT | Maximum stock limit |


## 5. UI/UX Design

### UX Principles
- Simple, intuitive, and minimalistic design.  
- Clean dashboard with category filters and search.  
- Real-time validation during item entry.  
- Clear visualization of A/B/C distribution.

### Key Screens
2. **Item Entry Screen** – Form for inputting item data.  
3. **Dashboard View** – Categorized item summary with charts.  
4. **Threshold Configuration** – Set and update limits for categories.  
5. **Export Page** – Download options for CSV/PDF.


## 6. Software Code & Working Software

### Code Overview
- Developed using **FastAPI** for backend and **React.js** for frontend.  
- Uses **Pandas** for ABC computation.  
- Database configured via **SQLAlchemy ORM**.  
- Export functions implemented with **ReportLab** (PDF) and **CSVWriter**.

### Deployment
- Runs on **Uvicorn server** at port `8000`.  
- Frontend connects to backend via REST API endpoints.  


## 7. Functional Test Scripts

| Test Case ID | Description | Steps | Expected Result |
|---------------|-------------|--------|------------------|
| TC001 | Add new inventory item | Enter details → Submit | Item saved to DB |
| TC002 | Auto classify item | Add item → Trigger classification | Correct A/B/C label assigned |
| TC003 | Threshold validation | Set threshold → Save | Threshold saved successfully |
| TC004 | Dashboard load | Open dashboard | Items display correctly |
| TC005 | Export data | Click Export → Choose CSV | File downloaded successfully |


## 8. User Manual

### Steps to Use the Application
1. **Open** the Smart Retail Operations Platform.  
2. Navigate to **Add Item** and input item details.  
3. System will **auto-classify** items into A/B/C categories.  
4. Configure **threshold limits** for each category under Parameters.  
5. Use the **Dashboard** to filter and monitor inventory status.  
6. Click **Export** to download reports.  

### Support
For setup or troubleshooting, contact the system administrator or AI agent support team.

---

© TCS ChennAI FRIDAY | Powered by AI WARRIORS CLasifAI
