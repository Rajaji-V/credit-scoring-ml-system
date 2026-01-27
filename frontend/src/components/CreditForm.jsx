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
            setResult(data);
            setLoading(false);
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
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="form-title">Loan Application Details</h2>

            <form onSubmit={handleSubmit} className="form-grid">
                <div className="form-group">
                    <label>Checking Account Balance</label>
                    <select name="Status" value={formData.Status} onChange={handleChange}>
                        <option value="A11">Negative Balance</option>
                        <option value="A12">0 - 200 DM</option>
                        <option value="A13">Over 200 DM</option>
                        <option value="A14">No Checking Account</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Duration (Months)</label>
                    <input type="number" name="Duration" min="4" max="72" value={formData.Duration} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Credit Amount (DM)</label>
                    <input type="number" name="CreditAmount" min="250" max="20000" value={formData.CreditAmount} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Age (Years)</label>
                    <input type="number" name="Age" min="18" max="100" value={formData.Age} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Savings Account</label>
                    <select name="Savings" value={formData.Savings} onChange={handleChange}>
                        <option value="A61">Less than 100 DM</option>
                        <option value="A62">100 - 500 DM</option>
                        <option value="A63">500 - 1000 DM</option>
                        <option value="A64">Greater than 1000 DM</option>
                        <option value="A65">Unknown / No Savings</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Employment Duration</label>
                    <select name="EmploymentSince" value={formData.EmploymentSince} onChange={handleChange}>
                        <option value="A71">Unemployed</option>
                        <option value="A72">Less than 1 year</option>
                        <option value="A73">1 - 4 years</option>
                        <option value="A74">4 - 7 years</option>
                        <option value="A75">Over 7 years</option>
                    </select>
                </div>

                <button type="submit" className="primary-btn form-submit" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin" size={20} style={{ marginRight: 8 }} /> : null}
                    {loading ? 'Analyzing...' : 'Submit Assessment'}
                </button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: '2rem', color: 'var(--error)', textAlign: 'center', fontWeight: 500 }}
                    >
                        <AlertCircle size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        {error}
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        className="result-viz-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100 }}
                    >
                        {/* Simplified Result Header */}
                        <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Assessment Complete
                            </div>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                color: result.prediction === 'Good Credit' ? 'var(--success)' : 'var(--error)'
                            }}>
                                {result.prediction}
                            </div>
                            <div style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                Probability of Default: <strong>{(result.probability * 100).toFixed(1)}%</strong>
                            </div>
                        </div>

                        <div className="result-details">
                            <div className="status-box">
                                <div className="status-label">Risk Category</div>
                                <div className="status-value" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className="risk-dot" style={{ backgroundColor: getRiskColor(result.risk_level) }}></span>
                                    {result.risk_level} Risk
                                </div>
                            </div>

                            <div className="status-box">
                                <div className="status-label">Recommendation</div>
                                <div className="status-value" style={{ fontWeight: 600 }}>
                                    {(() => {
                                        const score = Math.round((1 - result.probability) * 100);
                                        if (score < 45) return 'Decline Application';
                                        if (score <= 65) return 'Manual Review Required';
                                        return 'Approve Application';
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
