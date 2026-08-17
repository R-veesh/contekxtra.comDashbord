# ContekXtra — Knowledge Command Center
### Dashboard Design Spec (built from BA Project Scope Report)

---

## 1. Overview

This dashboard implements the three widgets defined in Section 3.1 of the BA Project Scope Report (*The Dashboard – The Product*), styled per the visual guidelines in Section 4.2 (*Dark enterprise AI theme*).

File: `contekxtra-dashboard.html`

---

## 2. Layout Structure

| Zone | Contents |
|---|---|
| **Left rail** | Brand mark, primary nav (Command Center, Knowledge Graph, Sources, Semantic Search), secondary nav (Analytics, API & Docs, Activity Log), plan indicator |
| **Top bar** | Semantic search input (⌘K), sync status pill, user avatar |
| **KPI strip** | 5 metrics: Connected Sources, Queries/24h, Avg. Relevance Score, Knowledge Coverage, Active Contexts |
| **Row 2** | Enterprise Knowledge Graph (signature visual) + Connected Sources list (Widget A) |
| **Row 3** | Context Intelligence Process — 6-stage pipeline (Widget B) |
| **Row 4** | Recent Retrieval Activity + Knowledge Coverage by Source (Widget C) |

---

## 3. Widget Mapping (BA Report → Dashboard)

**Widget A – Input Layer**
→ *Connected Sources* panel: Confluence, Snowflake, SharePoint, Salesforce, Zendesk, Google Drive, each with sync status and record counts.

**Widget B – AI Context Intelligence Process**
→ *Context Intelligence Process* pipeline: Ingestion → Semantic Processing → Context Understanding → Retrieval Intelligence → Relationship Engine → Response Generation.

**Widget C – Enterprise Knowledge Dashboard**
→ KPI strip + *Recent Retrieval Activity* + *Knowledge Coverage by Source* bars.

---

## 4. Signature Element

**Enterprise Knowledge Graph** — an animated hub-and-spoke diagram:
- Hub: "Context Engine" (amber, pulsing glow = active semantic layer)
- 6 spokes: Enterprise Documents, Internal Databases, Business Applications, Internal Portals, Data Warehouses, Research Repositories (from BA §1.3 Widget A list)
- Animated dots travel each connection path, literalizing "context relationships" from the brief

---

## 5. Visual System

| Token | Value |
|---|---|
| Background (ink) | `#0B0E14` |
| Surface | `#12161F` / `#171C27` |
| Border | `#242B38` |
| Text primary | `#E9EBEF` |
| Text muted | `#8C94A6` |
| Accent — Context/Amber | `#E8A33D` |
| Accent — Relationship/Teal | `#3DBFAD` |
| Alert | `#E2574C` |
| Display type | Space Grotesk |
| Body type | IBM Plex Sans |
| Data/mono type | IBM Plex Mono |

---

## 6. Data Shown (placeholder — swap for real integrations)

**Connected sources:** Confluence, Snowflake, SharePoint, Salesforce, Zendesk, Google Drive
**Sample queries:** vendor contract terms, open incidents, data retention ownership, APAC revenue trend, competitor pricing research
**Coverage by source:** Documents 92% · Databases 88% · Portals 95% · Applications 74% · Warehouses 81%

---

## 7. Next Steps

- [ ] Swap sample source names/counts for the client's actual systems
- [ ] Confirm KPI definitions with stakeholders (what counts as an "active context"?)
- [ ] Build the Product Landing Page (Section 3.2 of BA report) as a companion deliverable
- [ ] Wire dashboard to live data once backend/API is available
