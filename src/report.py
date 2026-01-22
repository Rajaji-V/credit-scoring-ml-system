import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import os

# Paths and columns
dataset_path = os.path.join('dataset', 'german.data')
outputs_path = 'outputs'
columns = [
    'Status', 'Duration', 'CreditHistory', 'Purpose', 'CreditAmount', 'Savings', 'EmploymentSince',
    'InstallmentRate', 'PersonalStatusSex', 'OtherDebtors', 'PresentResidence', 'Property', 'Age',
    'OtherInstallmentPlans', 'Housing', 'NumberExistingCredits', 'Job', 'PeopleLiable', 'Telephone', 'ForeignWorker', 'Risk'
]

# Ensure outputs directory exists
os.makedirs(outputs_path, exist_ok=True)

def main():
    # Load and preprocess data
    df = pd.read_csv(dataset_path, sep=' ', header=None, names=columns)
    df['Risk'] = df['Risk'].map({1: 0, 2: 1})  # 0=Good, 1=Bad

    print('Data shape:', df.shape)
    print('Missing values:', df.isnull().sum().sum())
    print('Class balance:\n', df['Risk'].value_counts())

    # EDA Visualizations
    sns.countplot(x='Risk', data=df)
    plt.title('Credit Risk Distribution (0=Good, 1=Bad)')
    plt.savefig(os.path.join(outputs_path, 'risk_distribution.png'))
    plt.close()

    sns.histplot(data=df, x='Age', hue='Risk', kde=True, bins=30)
    plt.title('Age Distribution by Credit Risk')
    plt.savefig(os.path.join(outputs_path, 'age_by_risk.png'))
    plt.close()

    sns.boxplot(x='Risk', y='CreditAmount', data=df)
    plt.title('Credit Amount by Credit Risk')
    plt.savefig(os.path.join(outputs_path, 'credit_amount_by_risk.png'))
    plt.close()

    sns.countplot(y='Purpose', hue='Risk', data=df, order=df['Purpose'].value_counts().index)
    plt.title('Loan Purpose by Credit Risk')
    plt.savefig(os.path.join(outputs_path, 'purpose_by_risk.png'))
    plt.close()

    # Feature engineering
    df_enc = pd.get_dummies(df, drop_first=True)
    X = df_enc.drop('Risk', axis=1)
    y = df_enc['Risk']

    # Split and scale
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Model training
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)

    # Evaluation
    print('\nModel Performance:')
    print('Accuracy:', accuracy_score(y_test, y_pred))
    print(classification_report(y_test, y_pred))

    # Feature importance
    importances = model.feature_importances_
    indices = np.argsort(importances)[::-1]
    features = X.columns
    plt.figure(figsize=(10,6))
    sns.barplot(x=importances[indices][:15], y=features[indices][:15])
    plt.title('Top 15 Feature Importances')
    plt.xlabel('Importance')
    plt.ylabel('Feature')
    plt.tight_layout()
    plt.savefig(os.path.join(outputs_path, 'feature_importance.png'))
    plt.close()
    print('\nAll visualizations saved in outputs/.')
    print('\nProject complete. Ready for presentation!')

if __name__ == '__main__':
    main()
