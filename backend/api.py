from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
import pandas as pd

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Credit Scoring API",
    description="API to assess creditworthiness of loan applicants using machine learning.",
    version="1.0.0"
)

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the pipeline
MODEL_PATH = os.path.join('outputs', 'credit_scoring_pipeline.pkl')

if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"Model pipeline not found at {MODEL_PATH}. Please run training first.")

pipeline = joblib.load(MODEL_PATH)

class ApplicantData(BaseModel):
    Status: str
    Duration: int
    CreditHistory: str
    Purpose: str
    CreditAmount: int
    Savings: str
    EmploymentSince: str
    InstallmentRate: int
    PersonalStatusSex: str
    OtherDebtors: str
    PresentResidence: int
    Property: str
    Age: int
    OtherInstallmentPlans: str
    Housing: str
    NumberExistingCredits: int
    Job: str
    PeopleLiable: int
    Telephone: str
    ForeignWorker: str

    class Config:
        json_schema_extra = {
            "example": {
                "Status": "A11",
                "Duration": 6,
                "CreditHistory": "A34",
                "Purpose": "A43",
                "CreditAmount": 1169,
                "Savings": "A65",
                "EmploymentSince": "A75",
                "InstallmentRate": 4,
                "PersonalStatusSex": "A93",
                "OtherDebtors": "A101",
                "PresentResidence": 4,
                "Property": "A121",
                "Age": 67,
                "OtherInstallmentPlans": "A143",
                "Housing": "A152",
                "NumberExistingCredits": 2,
                "Job": "A173",
                "PeopleLiable": 1,
                "Telephone": "A192",
                "ForeignWorker": "A201"
            }
        }

class PredictionResponse(BaseModel):
    prediction: str
    probability: float
    risk_level: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Credit Scoring API. Go to /docs for Swagger UI."}

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": pipeline is not None}

@app.post("/predict", response_model=PredictionResponse)
def predict_risk(data: ApplicantData):
    try:
        # Convert Pydantic model to DataFrame
        df = pd.DataFrame([data.dict()])
        
        # Make prediction
        pred = int(pipeline.predict(df)[0])
        prob = float(pipeline.predict_proba(df)[0][1])
        
        # Interpret results
        prediction_label = "Bad Credit" if pred == 1 else "Good Credit"
        
        if prob < 0.3:
            risk_level = "Low"
        elif prob < 0.7:
            risk_level = "Medium"
        else:
            risk_level = "High"
            
        return {
            "prediction": prediction_label,
            "probability": prob,
            "risk_level": risk_level
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    # explicitly binding to 127.0.0.1 for local dev
    uvicorn.run(app, host="127.0.0.1", port=8000)
