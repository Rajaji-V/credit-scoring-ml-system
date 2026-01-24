import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

DATA_PATH = os.path.join('dataset', 'german.data')

columns = [
    'Status', 'Duration', 'CreditHistory', 'Purpose', 'CreditAmount', 'Savings', 'EmploymentSince',
    'InstallmentRate', 'PersonalStatusSex', 'OtherDebtors', 'PresentResidence', 'Property', 'Age',
    'OtherInstallmentPlans', 'Housing', 'NumberExistingCredits', 'Job', 'PeopleLiable', 'Telephone', 'ForeignWorker', 'Risk'
]

def load_data():
    return pd.read_csv(DATA_PATH, sep=' ', header=None, names=columns)

def main():
    df = load_data()
    df['Risk'] = df['Risk'].map({1: 'Good', 2: 'Bad'})
    # Class balance
    plt.figure(figsize=(6,4))
    sns.countplot(x='Risk', data=df)
    plt.title('Credit Risk Distribution')
    plt.savefig('outputs/risk_distribution.png')
    plt.close()
    # Age distribution by risk
    plt.figure(figsize=(8,5))
    sns.histplot(data=df, x='Age', hue='Risk', kde=True, bins=30)
    plt.title('Age Distribution by Credit Risk')
    plt.savefig('outputs/age_by_risk.png')
    plt.close()
    # Credit amount by risk
    plt.figure(figsize=(8,5))
    sns.boxplot(x='Risk', y='CreditAmount', data=df)
    plt.title('Credit Amount by Credit Risk')
    plt.savefig('outputs/credit_amount_by_risk.png')
    plt.close()
    # Purpose count by risk
    plt.figure(figsize=(10,6))
    sns.countplot(y='Purpose', hue='Risk', data=df, order=df['Purpose'].value_counts().index)
    plt.title('Loan Purpose by Credit Risk')
    plt.savefig('outputs/purpose_by_risk.png')
    plt.close()
    print('Visualizations saved in outputs/')

if __name__ == '__main__':
    main()
