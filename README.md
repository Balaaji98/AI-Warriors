# 📦 Warehouse Flow Optimizer (WFO)
### AI-Powered Workflow Simulation and Optimization Platform

---

## 🧾 1. Functional Requirements Document (FRD)
- Overview of warehouse operational processes (Inbound, Storage, Picking, Dispatch).  
- Functional goals: minimize travel distance, improve slotting accuracy, and enhance worker efficiency.  
- Key modules:  
  - **SKU Analyzer** – evaluates SKU movement frequency and current locations.  
  - **Route Optimizer** – simulates worker routes and finds optimal travel paths.  
  - **Simulation Dashboard** – visualizes current vs optimized flow.  
  - **Admin Module** – configuration for warehouse zones, SKU categories, and KPIs.  
- Integration points with WMS, TMS, and ERP systems.  

---

## 🧱 2. Application Architecture
- **Frontend:** React.js + TailwindCSS  
- **Backend:** FastAPI (Python)  
- **AI/ML Engine:** LLM-driven optimization layer using OpenAI API  
- **Database:** PostgreSQL  
- **Storage:** AWS S3 for simulation data and diagrams  
- **Deployment:** Dockerized microservices on AWS ECS  
- **Integrations:** Confluence (auto documentation), JIRA (auto story generation)  

---

## 🧠 3. Technical Architecture
- **Core Components:**  
  - `Flow Simulation Engine` – processes layout & movement logic  
  - `LLM Design Agent` – interprets warehouse rules & proposes designs  
  - `Optimization Engine` – runs slotting/travel-time calculations  
  - `Visualization Module` – generates mermaid/draw.io diagrams  
- **APIs:**  
  - `/simulateFlow`  
  - `/generateDesign`  
  - `/compareResults`  
  - `/pushToConfluence`  
- **Security:** JWT authentication + Role-based access  

---

## 🗃️ 4. Database Design / Data Models
### Key Tables
| Table | Description |
|-------|--------------|
| `warehouses` | Master data for each warehouse |
| `zones` | Logical division of warehouse areas |
| `skus` | Product master including frequency, size, and category |
| `locations` | Bin/slot data with coordinates |
| `movements` | Transactional table capturing SKU movements |
| `users` | Authentication and roles |
| `simulations` | Stores optimization run metadata and results |

### Relationships  
- One `warehouse` → many `zones`  
- One `zone` → many `locations`  
- One `sku` → many `movements`  

---

## 🎨 5. UI/UX Design
- **Design System:** Clean, dark-themed dashboard inspired by modern logistics UIs.  
- **Main Screens:**  
  1. Dashboard – KPIs and visual summary  
  2. Flow Simulation – animated floor map  
  3. Optimization Result – comparison between current vs optimized metrics  
  4. Configuration Panel – manage SKUs, zones, and parameters  
- **Tools Used:** Figma + TailwindCSS  

---

## 💻 6. Software Code & Working Software
- **Code Base:** Python (FastAPI) + React.js  
- **Modules:**  
  - `/backend/app.py` – API logic  
  - `/frontend/src/components` – UI components  
  - `/ml/optimization_engine.py` – slotting & travel logic  
- **Output:**  
  - Runs warehouse simulation  
  - Exports result to Confluence with rich diagrams and summaries  

---

## 🧪 7. Functional Test Scripts
| Test Case ID | Description | Expected Result |
|---------------|--------------|----------------|
| TC01 | Simulate warehouse layout upload | Layout validated successfully |
| TC02 | Run optimization on sample SKU data | Optimized layout generated |
| TC03 | Compare before vs after metrics | Distance and time savings displayed |
| TC04 | Push results to Confluence | Page created with diagrams and metrics |
| TC05 | User login & access control | Only authorized roles can run simulations |

---

## 📘 8. User Manual
### Getting Started
1. Login using assigned credentials.  
2. Upload your warehouse layout and SKU dataset.  
3. Click **“Run Optimization”** to simulate the new flow.  
4. View results in the dashboard or export to Confluence.  

### Features
- Real-time visualization of SKU movements.  
- Auto-generated optimization insights.  
- Integration-ready API endpoints.  

### Support
For assistance, contact the **WFO Support Team** via:  
📧 support@wfo.ai  
