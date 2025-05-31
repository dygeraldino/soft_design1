// src/components/Dashboard.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
// @ts-ignore
import MainChatBot from '../components/MainChatBot';
import { Link } from "react-router-dom";


const Dashboard: React.FC = () => {
  const { session } = useAuth();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleStatsClick = () => {
    // Aquí irá la navegación a estadísticas
    console.log("Navegando a estadísticas...");
  };



  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.welcomeTitle}>
          Bienvenido, Dr. {session?.user?.email?.split('@')[0] || 'Usuario'}
        </h1>
        <p style={styles.welcomeSubtitle}>
          Gestiona la información clínica de tus pacientes de forma segura
        </p>
      </div>

      <div style={styles.actionsGrid}>
              {/* Chatbot Modal */}
      <MainChatBot 
        isOpen={isChatbotOpen} 
        onClose={handleCloseChatbot} 
      />


        <Link 
          to="/statistics" 
          style={{ ...styles.actionButton, textDecoration: 'none' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.2)';
          }}
        >
          <div style={styles.buttonIcon}>📊</div>
          <h3 style={styles.buttonTitle}>Estadísticas</h3>
          <p style={styles.buttonDescription}>
            Visualiza métricas y reportes de tus consultas
          </p>
        </Link>

      </div>

      <div style={styles.quickStats}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>24</div>
          <div style={styles.statLabel}>Pacientes este mes</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>127</div>
          <div style={styles.statLabel}>Consultas totales</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>98%</div>
          <div style={styles.statLabel}>Precisión diagnóstica</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    minHeight: 'calc(100vh - 120px)',
  },
  welcomeSection: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
    padding: '2rem 0',
  },
  welcomeTitle: {
    fontSize: '2.5rem',
    fontWeight: '300',
    color: '#2c3e50',
    margin: '0 0 1rem 0',
    letterSpacing: '-0.5px',
  },
  welcomeSubtitle: {
    fontSize: '1.1rem',
    color: '#7f8c8d',
    margin: 0,
    fontWeight: '400',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem',
    maxWidth: '800px',
    margin: '0 auto 3rem auto',
  },
  actionButton: {
    background: 'white',
    border: 'none',
    borderRadius: '16px',
    padding: '2.5rem 2rem',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.1)',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  buttonIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    display: 'block',
  },
  buttonTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',  
    color: '#2c3e50',
    margin: '0 0 1rem 0',
  },
  buttonDescription: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
    margin: 0,
    lineHeight: '1.5',
  },
  quickStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap' as const,
    marginTop: '2rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center' as const,
    minWidth: '140px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f3f4',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#007bff',
    margin: '0 0 0.5rem 0',
  },
  statLabel: {
    fontSize: '0.85rem',
    color: '#6c757d',
    margin: 0,
    fontWeight: '500',
  },
};

export default Dashboard;