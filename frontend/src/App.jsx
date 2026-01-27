import { useState, useRef } from 'react'
import { ShieldCheck, BarChart3, Zap, Lock, RefreshCw, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import CreditForm from './components/CreditForm'
import ModelInsights from './components/ModelInsights'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showInsights, setShowInsights] = useState(false)
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
      title: 'Risk Assessment',
      description: 'Automated creditworthiness evaluation using statistical modeling.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'Performance Analytics',
      description: 'Track loan portfolio performance and identify risk trends.'
    },
    {
      icon: <Zap size={24} />,
      title: 'Instant Decisions',
      description: 'Accelerate underwriting with automated approval workflows.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Bank-Grade Security',
      description: 'Financial data is protected with enterprise-level encryption.'
    },
    {
      icon: <RefreshCw size={24} />,
      title: 'Adaptive Models',
      description: 'Scoring algorithms update regularly to reflect market conditions.'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Explainable AI',
      description: 'Clear reasoning behind every credit decision for compliance.'
    }
  ]

  return (
    <div className="app-container">
      <header className="hero">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1>Credit Risk Assessment</h1>
          <p>
            Professional loan underwriting and risk evaluation platform.
          </p>
          <div className="cta-group">
            <button className="primary-btn" onClick={scrollToForm}>Start Application</button>
            <button
              className="secondary-btn"
              onClick={() => setShowInsights(true)}
            >
              How it Works
            </button>
          </div>
        </motion.div>
      </header>

      {showForm && (
        <motion.section
          ref={formRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: '6rem' }}
        >
          <CreditForm />
        </motion.section>
      )}

      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Platform Capabilities</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '1rem auto 0' }}>
          Built for accuracy, speed, and compliance.
        </p>
      </section>

      <main className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
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

      <ModelInsights isOpen={showInsights} onClose={() => setShowInsights(false)} />
    </div>
  )
}

export default App
