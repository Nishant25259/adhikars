# ⚖️ Digital Assistant for Legal Awareness & Know-Your-Rights (KYR) Framework

> An intelligent, accessible digital assistant designed to bridge the legal awareness gap in India. It translates dense Indian legislation into simplified, actionable rights, step-by-step guidelines, free legal aid mapping, and automated complaint drafts for citizens and marginalized communities.

---
## 📌 Problem Statement Overview

Access to legal information in India remains a critical challenge, particularly for illiterate, rural, and marginalized populations. Many citizens are unaware of their fundamental rights, statutory entitlements, or how to seek legal redressal.

This project addresses this challenge by providing a **Know-Your-Rights (KYR) Logic Engine** integrated with an interactive assistant that:
1. **Simplifies Legal Language:** Translates complex statutory acts (BNS, BNSS, Code on Wages, IT Act, Consumer Protection) into plain language.
2. **Evaluates Free Legal Aid:** Automatically checks eligibility under **Section 12 of the Legal Services Authorities Act, 1987 (NALSA)**.
3. **Emergency Intercepts:** Fast-tracks safety-critical queries (abuse, immediate harm) straight to national emergency response services.
4. **Actionable Redressal:** Generates structured, step-by-step guidelines and ready-to-use complaint/notice drafts.

---

## 🏛️ System Architecture & Logic Pipeline
```
[ Frontend Input: Category + Problem Text + User Persona ]
                           │
                           ▼
 ┌─────────────────────────────────────────────────────────┐
 │ STAGE 1: Emergency & Safety Intercept                   │
 │ - Scans for immediate threat keywords                   │
 │ - IF Threat: Fast-tracks 112 / 181 emergency helplines   │
 └──────────────────────────┬──────────────────────────────┘
                            │ (Safe Query)
                            ▼
 ┌─────────────────────────────────────────────────────────┐
 │ STAGE 2: NALSA Sec 12 Free Legal Aid Engine             │
 │ - Evaluates persona (Worker, Women, ST/SC, Senior)      │
 │ - Evaluates annual income against state threshold       │
 └──────────────────────────┬──────────────────────────────┘
                            │
                            ▼
 ┌─────────────────────────────────────────────────────────┐
 │ STAGE 3: KYR Category & Keyword Matcher                 │
 │ - Maps queries to 7 core legal domains                  │
 │ - Retrieves applicable BNS/BNSS sections & entitlements│
 └──────────────────────────┬──────────────────────────────┘
                            │
                            ▼
 ┌─────────────────────────────────────────────────────────┐
 │ STAGE 4: Actionable Output & Document Generator         │
 │ - Produces 3-step actionable guidelines                 │
 │ - Auto-fills custom complaint/notice text               │
 └─────────────────────────────────────────────────────────┘
```
---

## 📜 Covered Legal Domains (7 Core Categories)

1. **Police & Custody:** Arrest rights under BNSS, Zero FIR provisions, bail procedures, female arrest protections, and 24-hour magistrate production rules.
2. **Consumer Laws:** Consumer Protection Act 2019, defective product refunds, misleading ads, and e-Daakhil filing guidelines.
3. **Labour Laws:** Code on Wages, wage delay redressal, minimum wages, and Shram Suvidha portal escalation.
4. **Cyber Laws:** Information Technology Act, 1930 Cyber Fraud Helpline golden-hour lock, non-consensual media removal, and privacy rights.
5. **Fundamental Rights:** Articles 14, 19, 21, and 32 constitutional guarantees, SHRC/NHRC representations, and Writ Petition guidance.
6. **General Rights:** Right to Information (RTI) Act 2005 filing procedures, Gram Sabha rights, public service delivery, and ration entitlements.
7. **Tax Laws:** Taxpayers' Charter rights, DIN verification, delay in tax refund processing, and CPGRAMS grievances.

---

## 📁 Repository Structure

```text
kyr-legal-assistant/
│
├── backend/                       # 🧠 Core Backend Logic API (Python)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                # FastAPI Application & REST Endpoints
│   │   ├── database.py            # KYR Laws, Rules, & Template Repository
│   │   ├── schemas.py             # Pydantic Data Models (Request/Response)
│   │   └── services/              # Pipeline Logic Modules
│   │       ├── emergency.py       # Safety Intercept Handler
│   │       └── legal_aid.py       # NALSA Sec 12 Rule Engine
│   ├── requirements.txt           # Backend Dependencies
│   └── README.md                  # API Docs for Frontend Developers
│
├── frontend/                      # 🎨 User Interface (React / PWA)
│   ├── src/
│   │   ├── components/            # UI Components (Voice, Persona, Cards)
│   │   └── App.jsx
│   └── package.json
│
└── README.md                      # Project Root Documentation













