import pandas as pd
import joblib
import os

MODEL_PATH = os.path.join('outputs', 'credit_scoring_pipeline.pkl')

def predict(input_data):
    """
    Predict credit risk for a given input dictionary or DataFrame.
    
    Args:
        input_data (dict or pd.DataFrame): Input features.
        
    Returns:
        int: 0 for Good Credit, 1 for Bad Credit
        float: Probability of Bad Credit (Risk)
    """
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model pipeline not found at {MODEL_PATH}. Run src/main.py first.")
        
    pipeline = joblib.load(MODEL_PATH)
    
    if isinstance(input_data, dict):
        df = pd.DataFrame([input_data])
    else:
        df = input_data
        
    # The pipeline handles scaling and OneHotEncoding automatically
    prediction = pipeline.predict(df)[0]
    probability = pipeline.predict_proba(df)[0][1] # Probability of class 1 (Bad)
    
    return prediction, probability

if __name__ == '__main__':
    # Example usage with meaningful sample data
    sample_input = {
        'Status': 'A11',
        'Duration': 6,
        'CreditHistory': 'A34',
        'Purpose': 'A43',
        'CreditAmount': 1169,
        'Savings': 'A65',
        'EmploymentSince': 'A75',
        'InstallmentRate': 4,
        'PersonalStatusSex': 'A93',
        'OtherDebtors': 'A101',
        'PresentResidence': 4,
        'Property': 'A121',
        'Age': 67,
        'OtherInstallmentPlans': 'A143',
        'Housing': 'A152',
        'NumberExistingCredits': 2,
        'Job': 'A173',
        'PeopleLiable': 1,
        'Telephone': 'A192',
        'ForeignWorker': 'A201'
    }
    
    pred, prob = predict(sample_input)
    print(f'Prediction: {"Bad Credit" if pred == 1 else "Good Credit"}')
    print(f'Risk Probability: {prob:.4f}')
