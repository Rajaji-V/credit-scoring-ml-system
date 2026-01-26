import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart2, Info, Target, ShieldCheck, TrendingUp, PieChart, Activity } from 'lucide-react';

const ModelInsights = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const metrics = [
        { label: 'Model Accuracy', value: '78.5%', icon: <Target className="text-blue-400" size={24} style={{ color: '#60a5fa' }} /> },
        { label: 'Training Set', value: '1,000 Entries', icon: <BarChart2 className="text-indigo-400" size={24} style={{ color: '#818cf8' }} /> },
        { label: 'Risk Precision', value: 'High', icon: <ShieldCheck className="text-emerald-400" size={24} style={{ color: '#34d399' }} /> },
    ];

    // Chart Components
    const FeatureImportance = () => {
        const data = [
            { label: 'Checking Status', value: 85 },
            { label: 'Duration', value: 65 },
            { label: 'Credit History', value: 55 },
            { label: 'Loan Amount', value: 45 },
            { label: 'Savings', value: 30 }
        ];

        return (
            <div style={{ padding: '1rem', width: '100%' }}>
                {data.map((item, i) => (
                    <div key={i} style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                        <span style={{ width: '120px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                        <span style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', width: '30px' }}>{item.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    const RiskDistribution = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '1rem' }}>
                <div style={{ position: 'relative', width: '160px', height: '160px', flexShrink: 0 }}>
                    <motion.div
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 1 }}
                        style={{
                            width: '100%', height: '100%', borderRadius: '50%',
                            background: 'conic-gradient(var(--success) 0% 70%, var(--error) 70% 100%)',
                            position: 'relative',
                            boxShadow: '0 0 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        <div style={{
                            position: 'absolute', inset: '25%', background: '#0f172a', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                        }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>1k</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Total</span>
                        </div>
                    </motion.div>
                </div>
                <div style={{ marginLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--success)', marginRight: '0.8rem' }}></span>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Good Credit</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>70% (700 cases)</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--error)', marginRight: '0.8rem' }}></span>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Bad Credit</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>30% (300 cases)</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const PurposeAnalysis = () => {
        const purposes = [
            { label: 'Car', value: 80 },
            { label: 'Radio/TV', value: 60 },
            { label: 'Furniture', value: 40 },
            { label: 'Business', value: 50 },
            { label: 'Edu', value: 30 }
        ];

        return (
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '180px', padding: '1rem 0.5rem', gap: '1rem' }}>
                {purposes.map((p, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${p.value}%` }}
                                transition={{ duration: 0.8, delay: 0.4 + (i * 0.1) }}
                                style={{
                                    width: '30px',
                                    background: 'var(--primary)',
                                    opacity: 0.8,
                                    borderRadius: '4px 4px 0 0',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
                                    fontSize: '0.7rem', color: 'white'
                                }}>{p.value}</div>
                            </motion.div>
                        </div>
                        <span style={{ marginTop: '0.8rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.label}</span>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <AnimatePresence>
            <div className="modal-overlay" onClick={onClose} style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(10px)',
                zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '2rem'
            }}>
                <motion.div
                    className="glass-card"
                    onClick={e => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 30 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflowY: 'auto',
                        padding: '3rem', position: 'relative',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    <button onClick={onClose} style={{
                        position: 'absolute', top: '1.5rem', right: '1.5rem',
                        background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-secondary)',
                        cursor: 'pointer', padding: '0.5rem', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}>
                        <X size={20} />
                    </button>

                    <header style={{ marginBottom: '3rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <Activity className="text-primary" size={28} style={{ color: 'var(--primary)' }} />
                            <h2 style={{ fontSize: '2rem', fontWeight: 800, background: 'linear-gradient(to right, white, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Model Insights
                            </h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>
                            Transparency into our Random Forest Classifier trained on the German Credit Dataset.
                        </p>
                    </header>

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem', marginBottom: '4rem'
                    }}>
                        {metrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card"
                                style={{
                                    padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.2rem',
                                    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)'
                                }}
                            >
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '1rem',
                                    background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                                }}>
                                    {m.icon}
                                </div>
                                <div>
                                    <div style={{ marginBottom: '0.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{m.label}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{m.value}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        {/* Feature Importance */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card"
                            style={{
                                padding: '2rem', background: 'rgba(255,255,255,0.02)',
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <TrendingUp size={20} className="text-primary" /> Feature Importance
                            </h3>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                <FeatureImportance />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
                                The <strong>Checking Account Status</strong> and <strong>Loan Duration</strong> are the strongest predictors, followed closely by credit history.
                            </p>
                        </motion.div>

                        {/* Risk Distribution */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card"
                            style={{
                                padding: '2rem', background: 'rgba(255,255,255,0.02)',
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <PieChart size={20} className="text-primary" /> Risk Distribution
                            </h3>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <RiskDistribution />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
                                The dataset is imbalanced with <strong>70%</strong> good credit cases, requiring stratified sampling during training.
                            </p>
                        </motion.div>

                        {/* Purpose Analysis - Full Width if odd number, or just next grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="glass-card"
                            style={{
                                padding: '2rem', background: 'rgba(255,255,255,0.02)',
                                gridColumn: '1 / -1', // Span full width
                                display: 'flex', flexDirection: 'column'
                            }}
                        >
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <BarChart2 size={20} className="text-primary" /> Purpose Correlation
                            </h3>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <PurposeAnalysis />
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
                                Loan purpose significantly affects risk. <strong>used car</strong> loans show lower default rates compared to <strong>education</strong> or <strong>business</strong> loans.
                            </p>
                        </motion.div>
                    </section>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ModelInsights;
