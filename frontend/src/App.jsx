import { useState, useRef } from 'react'
import { ShieldCheck, BarChart3, Zap, Lock, RefreshCw, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import CreditForm from './components/CreditForm'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef(null)

  const scrollToForm = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const features = [
    {
      icon: <ShieldCheck size={24} />,
      title: 'ML-Powered Scoring',
      description: 'Advanced gradient boosting models provide highly accurate creditworthiness assessments in milliseconds.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Real-time Analytics',
      description: 'Monitor loan performance and credit trends with dynamic, interactive data visualizations.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Decisions',
      description: 'Streamline your underwriting process with automated approval workflows and risk thresholds.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Secure & Compliant',
      description: 'Built with data privacy in mind, ensuring all financial data is handled with enterprise-grade security.'
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Continuous Learning',
      description: 'Our models automatically retrain on new data patterns to adapt to changing market conditions.'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Model Explainability',
      description: 'Understand the "why" behind every score with SHAP-based feature importance integration.'
    }
  ]

  return (
    <div className="app-container">
      <header className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Modern Credit Scoring Intelligence</h1>
          <p>
            Deploy robust machine learning models to assess risk and empower financial decisions with our next-generation credit scoring platform.
          </p>
          <div className="cta-group">
            <button className="primary-btn" onClick={scrollToForm}>Get Started</button>
            <button className="secondary-btn">Documentation</button>
          </div>
        </motion.div>
      </header>

      {showForm && (
        <motion.section
          ref={formRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '8rem' }}
        >
          <CreditForm />
        </motion.section>
      )}

      <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Enterprise Features</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Discover the technology stack driving our high-precision financial analysis and risk assessment engine.
        </p>
      </section>

      <main className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </main>

      <footer style={{ marginTop: '6rem', padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
        <p>&copy; 2026 CreditScoring ML System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
