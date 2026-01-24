# Credit Scoring Project

This project assesses the creditworthiness of loan applicants using financial and demographic data from the German Credit dataset.

## Project Structure
- `dataset/` — Contains the raw data (`german.data`)
- `backend/` — Source code for data processing, modeling, and API
- `frontend/` — React application with Vite, Lucide, and Framer Motion
- `outputs/` — Model outputs, reports, and results

## Main Steps
1. Data Loading & Preprocessing (using Scikit-Learn Pipeline)
2. Exploratory Data Analysis (EDA)
3. Feature Engineering
4. Model Training & Evaluation
5. Prediction Script
6. API Deployment (FastAPI)
7. Frontend Interface Genesis

## Usage

### Backend (Python/FastAPI)
1. Install dependencies: `pip install -r requirements.txt`
2. Train the model: `python backend/main.py`
3. Run the API: `uvicorn backend.api:app --reload`
4. Access API Docs: Open `http://127.0.0.1:8000/docs`

### Frontend (React/Vite)
1. Navigate to directory: `cd frontend`
2. Install dependencies: `npm install --legacy-peer-deps`
3. Run development server: `npm run dev`

## Requirements
- Python 3.8+
- Node.js & npm (for frontend)
- See relevant `requirements.txt` and `package.json` files

## Dataset
- Source: `dataset/german.data`

---
