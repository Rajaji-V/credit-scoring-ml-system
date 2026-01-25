import React, { useState } from 'react';
import { creditService } from '../services/api';
import { Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import './CreditForm.css';

const CreditForm = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        Status: 'A11',
        Duration: 6,
        CreditHistory: 'A34',
        Purpose: 'A43',
        CreditAmount: 1169,
        Savings: 'A65',
        EmploymentSince: 'A75',
        InstallmentRate: 4,
        PersonalStatusSex: 'A93',
        OtherDebtors: 'A101',
        PresentResidence: 4,
        Property: 'A121',
        Age: 67,
        OtherInstallmentPlans: 'A143',
        Housing: 'A152',
        NumberExistingCredits: 2,
        Job: 'A173',
        PeopleLiable: 1,
        Telephone: 'A192',
        ForeignWorker: 'A201'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: e.target.type === 'number' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await creditService.predict(formData);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to connect to the backend. Is the API running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">
            <h2 className="form-title">Applicant Risk Assessment</h2>

            <form onSubmit={handleSubmit} className="form-grid">
                {/* Basic Info */}
                <div className="form-group">
                    <label>Checking Account Status</label>
                    <select name="Status" value={formData.Status} onChange={handleChange}>
                        <option value="A11">&lt; 0 DM</option>
                        <option value="A12">0 - 200 DM</option>
                        <option value="A13">&gt;= 200 DM</option>
                        <option value="A14">No account</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Duration (months)</label>
                    <input type="number" name="Duration" value={formData.Duration} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Credit Amount (DM)</label>
                    <input type="number" name="CreditAmount" value={formData.CreditAmount} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Age</label>
                    <input type="number" name="Age" value={formData.Age} onChange={handleChange} />
                </div>

                {/* Financial Background */}
                <div className="form-group">
                    <label>Savings</label>
                    <select name="Savings" value={formData.Savings} onChange={handleChange}>
                        <option value="A61">&lt; 100 DM</option>
                        <option value="A62">100 - 500 DM</option>
                        <option value="A63">500 - 1000 DM</option>
                        <option value="A64">&gt;= 1000 DM</option>
                        <option value="A65">Unknown/No savings</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Employment Status</label>
                    <select name="EmploymentSince" value={formData.EmploymentSince} onChange={handleChange}>
                        <option value="A71">Unemployed</option>
                        <option value="A72">&lt; 1 year</option>
                        <option value="A73">1 - 4 years</option>
                        <option value="A74">4 - 7 years</option>
                        <option value="A75">&gt;= 7 years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Job Category</label>
                    <select name="Job" value={formData.Job} onChange={handleChange}>
                        <option value="A171">Unemployed/Unskilled</option>
                        <option value="A172">Unskilled/Resident</option>
                        <option value="A173">Skilled Employee</option>
                        <option value="A174">Management/Self-employed</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Housing</label>
                    <select name="Housing" value={formData.Housing} onChange={handleChange}>
                        <option value="A151">Rent</option>
                        <option value="A152">Own</option>
                        <option value="A153">For Free</option>
                    </select>
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                    {loading ? 'Analyzing...' : 'Predict Credit Score'}
                </button>
            </form>

            {error && (
                <div style={{ marginTop: '1.5rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </div>
            )}

            {result && (
                <div className={`result-container`}>
                    <div className="result-header">
                        <h3>Prediction Results</h3>
                        <span className={`result-badge badge-${result.risk_level.toLowerCase()}`}>
                            {result.risk_level} Risk
                        </span>
                    </div>

                    <div className="result-grid">
                        <div className="result-item">
                            <span className="result-label">Assessment</span>
                            <span className="result-value" style={{ color: result.prediction === 'Good Credit' ? 'var(--success)' : 'var(--error)' }}>
                                {result.prediction}
                            </span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Default Probability</span>
                            <span className="result-value">{(result.probability * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreditForm;
