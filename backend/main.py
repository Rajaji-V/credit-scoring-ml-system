import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

# Configuration
DATA_PATH = os.path.join('dataset', 'german.data')
MODEL_PATH = os.path.join('outputs', 'credit_scoring_pipeline.pkl')

# Feature Definitions
NUMERIC_FEATURES = [
    'Duration', 'CreditAmount', 'InstallmentRate', 'PresentResidence', 
    'Age', 'NumberExistingCredits', 'PeopleLiable'
]

CATEGORICAL_FEATURES = [
    'Status', 'CreditHistory', 'Purpose', 'Savings', 'EmploymentSince', 
    'PersonalStatusSex', 'OtherDebtors', 'Property', 'OtherInstallmentPlans', 
    'Housing', 'Job', 'Telephone', 'ForeignWorker'
]

COLUMNS = [
    'Status', 'Duration', 'CreditHistory', 'Purpose', 'CreditAmount', 'Savings', 'EmploymentSince',
    'InstallmentRate', 'PersonalStatusSex', 'OtherDebtors', 'PresentResidence', 'Property', 'Age',
    'OtherInstallmentPlans', 'Housing', 'NumberExistingCredits', 'Job', 'PeopleLiable', 'Telephone',
    'ForeignWorker', 'Risk'
]

def load_data(path=DATA_PATH):
    """Load dataset from path with predefined columns."""
    if not os.path.exists(path):
        raise FileNotFoundError(f"Dataset not found at {path}")
    # Use regex separator for flexible whitespace handling
    return pd.read_csv(path, sep=r'\s+', header=None, names=COLUMNS, engine='python')

def build_pipeline():
    """Build the Machine Learning Pipeline."""
    # Preprocessing for numeric data
    numeric_transformer = StandardScaler()

    # Preprocessing for categorical data
    categorical_transformer = OneHotEncoder(handle_unknown='ignore', sparse_output=False)

    # Bundle preprocessing for numerical and categorical data
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, NUMERIC_FEATURES),
            ('cat', categorical_transformer, CATEGORICAL_FEATURES)
        ])

    # Define model
    model = RandomForestClassifier(n_estimators=100, random_state=42)

    # Create and return pipeline
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', model)
    ])
    
    return pipeline

def train_and_save():
    """Load data, train model, evaluate, and save pipeline."""
    df = load_data()
    
    # Preprocess Target
    # Original: 1=Good, 2=Bad. detailed: 1 (Good), 2 (Bad)
    # Mapping to 0=Good, 1=Bad for binary classification standard
    df['Risk'] = df['Risk'].map({1: 0, 2: 1})
    
    X = df.drop('Risk', axis=1)
    y = df['Risk']

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Build and Train Pipeline
    print("Training Random Forest Pipeline...")
    pipeline = build_pipeline()
    pipeline.fit(X_train, y_train)

    # Evaluate
    print("Evaluating Model...")
    y_pred = pipeline.predict(X_test)
    print(f'Accuracy: {accuracy_score(y_test, y_pred):.4f}')
    print("\nClassification Report:\n")
    print(classification_report(y_test, y_pred))

    # Save
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Pipeline saved to {MODEL_PATH}")

if __name__ == '__main__':
    train_and_save()
