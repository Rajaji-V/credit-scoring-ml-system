import React, { useState } from 'react';
import { creditService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, AlertCircle, TrendingUp, Shield, Activity } from 'lucide-react';
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
            // Delay result slightly for better UX sensation
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 800);
        } catch (err) {
            setError('System Integration Error: Unable to reach prediction engine.');
            setLoading(false);
        }
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'Low': return 'var(--success)';
            case 'Medium': return 'var(--warning)';
            case 'High': return 'var(--error)';
            default: return 'var(--primary)';
        }
    };

    return (
        <motion.div
            className="form-card glass-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="form-title">Intelligence Engine</h2>

            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                    <label><Activity size={14} style={{ marginRight: 8 }} />Checking Balance</label>
                    <select name="Status" value={formData.Status} onChange={handleChange}>
                        <option value="A11">Less than 0 DM</option>
                        <option value="A12">0 to 200 DM</option>
                        <option value="A13">Greater than 200 DM</option>
                        <option value="A14">No Checking Account</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Loan Duration (mos)</label>
                    <input type="number" name="Duration" min="4" max="72" value={formData.Duration} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Credit Requested (DM)</label>
                    <input type="number" name="CreditAmount" min="250" max="20000" value={formData.CreditAmount} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Applicant Age</label>
                    <input type="number" name="Age" min="18" max="100" value={formData.Age} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Savings Profile</label>
                    <select name="Savings" value={formData.Savings} onChange={handleChange}>
                        <option value="A61">&lt; 100 DM</option>
                        <option value="A62">100 - 500 DM</option>
                        <option value="A63">500 - 1000 DM</option>
                        <option value="A64">&gt;= 1000 DM</option>
                        <option value="A65">Unknown / No Savings</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Employment Tenure</label>
                    <select name="EmploymentSince" value={formData.EmploymentSince} onChange={handleChange}>
                        <option value="A71">Unemployed</option>
                        <option value="A72">&lt; 1 year</option>
                        <option value="A73">1 - 4 years</option>
                        <option value="A74">4 - 7 years</option>
                        <option value="A75">&gt;= 7 years</option>
                    </select>
                </div>

                <button type="submit" className="primary-btn form-submit" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" /> : <Shield size={20} />}
                    {loading ? 'PROCESSING INTELLIGENCE...' : 'EXECUTE PREDICTION'}
                </button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: '2rem', color: 'var(--error)', textAlign: 'center' }}
                    >
                        <AlertCircle size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        {error}
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        className="result-viz-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 12 }}
                    >
                        <div className="gauge-section">
                            <div className="gauge-wrapper">
                                <div className="gauge-base"></div>
                                <div
                                    className="gauge-value"
                                    style={{
                                        '--percentage': (1 - result.probability) * 100,
                                        borderColor: getRiskColor(result.risk_level)
                                    }}
                                ></div>
                                <div className="gauge-center">
                                    <div className="gauge-text" style={{ color: getRiskColor(result.risk_level) }}>
                                        {Math.round((1 - result.probability) * 100)}
                                    </div>
                                    <div className="gauge-label">Stability Score</div>
                                </div>
                            </div>
                        </div>

                        <div className="result-details">
                            <div className="status-box">
                                <div className="status-label">Protocol Decision</div>
                                <div className="status-value" style={{ color: result.prediction === 'Good Credit' ? 'var(--success)' : 'var(--error)' }}>
                                    {result.prediction.toUpperCase()}
                                </div>
                            </div>

                            <div className="status-box">
                                <div className="status-label">Risk Threshold</div>
                                <div className="status-value">
                                    <span
                                        className="risk-dot"
                                        style={{ backgroundColor: getRiskColor(result.risk_level), color: getRiskColor(result.risk_level) }}
                                    ></span>
                                    {result.risk_level} Risk
                                </div>
                            </div>

                            <div className="status-box">
                                <div className="status-label">Actionable Recommendation</div>
                                <div className="status-value" style={{
                                    color: Math.round((1 - result.probability) * 100) < 45 ? 'var(--error)' :
                                        Math.round((1 - result.probability) * 100) <= 65 ? 'var(--warning)' : 'var(--success)',
                                    fontWeight: '800',
                                    letterSpacing: '0.05em'
                                }}>
                                    {(() => {
                                        const score = Math.round((1 - result.probability) * 100);
                                        if (score < 45) return 'REJECT';
                                        if (score <= 65) return 'MANUAL REVIEW';
                                        return 'APPROVE';
                                    })()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CreditForm;
