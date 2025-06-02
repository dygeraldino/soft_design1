import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Activity, Users, Calendar, TrendingUp, AlertTriangle, Clock, FileText, Target } from 'lucide-react';

const MedicalDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [activeTab, setActiveTab] = useState('overview');

  // Estilos CSS en línea
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '24px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    maxWidth: {
      maxWidth: '1280px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '32px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      marginTop: '8px'
    },
    select: {
      padding: '8px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      cursor: 'pointer'
    },
    tabContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px'
    },
    tabList: {
      display: 'flex',
      borderBottom: '1px solid #e5e7eb',
      margin: 0,
      padding: 0,
      listStyle: 'none'
    },
    tab: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 24px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      transition: 'all 0.2s',
      color: '#6b7280'
    },
    activeTab: {
      color: '#2563eb',
      borderBottom: '2px solid #2563eb',
      backgroundColor: '#eff6ff'
    },
    grid: {
      display: 'grid',
      gap: '24px',
      marginBottom: '32px'
    },
    grid4: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    grid2: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
    },
    statCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      borderLeft: '4px solid #3b82f6',
      transition: 'box-shadow 0.2s'
    },
    statCardHover: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    statFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statTitle: {
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500',
      margin: 0
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '8px 0'
    },
    statChange: {
      fontSize: '14px',
      marginTop: '8px'
    },
    statIcon: {
      padding: '12px',
      borderRadius: '50%',
      color: 'white'
    },
    alertCard: {
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '16px'
    },
    alertHigh: {
      borderLeft: '4px solid #ef4444',
      backgroundColor: '#fef2f2'
    },
    alertMedium: {
      borderLeft: '4px solid #f59e0b',
      backgroundColor: '#fffbeb'
    },
    alertLow: {
      borderLeft: '4px solid #3b82f6',
      backgroundColor: '#eff6ff'
    },
    alertFlex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    badge: {
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    badgeHigh: {
      backgroundColor: '#fee2e2',
      color: '#dc2626'
    },
    badgeMedium: {
      backgroundColor: '#fef3c7',
      color: '#d97706'
    },
    badgeLow: {
      backgroundColor: '#dbeafe',
      color: '#2563eb'
    }
  };

  // Datos simulados basados en la estructura de tu BD
  const overviewStats = [
    { title: 'Pacientes Totales', value: '1,247', change: '+12%', icon: Users, color: '#3b82f6' },
    { title: 'Consultas del Mes', value: '324', change: '+8%', icon: Calendar, color: '#10b981' },
    { title: 'Síntomas Registrados', value: '892', change: '+15%', icon: Activity, color: '#8b5cf6' },
    { title: 'Formularios Completados', value: '156', change: '+5%', icon: FileText, color: '#f59e0b' }
  ];

  const consultationsByMonth = [
    { month: 'Ene', consultas: 45, nuevos: 12 },
    { month: 'Feb', consultas: 52, nuevos: 18 },
    { month: 'Mar', consultas: 48, nuevos: 15 },
    { month: 'Abr', consultas: 61, nuevos: 22 },
    { month: 'May', consultas: 58, nuevos: 19 },
    { month: 'Jun', consultas: 65, nuevos: 25 }
  ];

  const symptomDistribution = [
    { name: 'Dolor de Cabeza', value: 28, color: '#3B82F6' },
    { name: 'Fiebre', value: 22, color: '#EF4444' },
    { name: 'Tos', value: 18, color: '#10B981' },
    { name: 'Fatiga', value: 15, color: '#F59E0B' },
    { name: 'Otros', value: 17, color: '#8B5CF6' }
  ];

  const ageDistribution = [
    { rango: '0-18', cantidad: 156 },
    { rango: '19-35', cantidad: 342 },
    { rango: '36-50', cantidad: 428 },
    { rango: '51-65', cantidad: 245 },
    { rango: '65+', cantidad: 76 }
  ];

  const recentAlerts = [
    { id: 1, patient: 'María González', symptom: 'Fiebre alta', severity: 'high' as const, time: '10:30 AM' },
    { id: 2, patient: 'Carlos Ruiz', symptom: 'Dolor torácico', severity: 'high' as const, time: '09:15 AM' },
    { id: 3, patient: 'Ana López', symptom: 'Mareos frecuentes', severity: 'medium' as const, time: '08:45 AM' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div style={styles.statCard}>
      <div style={styles.statFlex}>
        <div>
          <p style={styles.statTitle}>{title}</p>
          <p style={styles.statValue}>{value}</p>
          <p style={{
            ...styles.statChange,
            color: change.startsWith('+') ? '#059669' : '#dc2626'
          }}>
            {change} vs mes anterior
          </p>
        </div>
        <div style={{
          ...styles.statIcon,
          backgroundColor: color
        }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ patient, symptom, severity, time }: any) => {
    const alertStyle = severity === 'high' ? styles.alertHigh : 
                     severity === 'medium' ? styles.alertMedium : styles.alertLow;
    const badgeStyle = severity === 'high' ? styles.badgeHigh :
                      severity === 'medium' ? styles.badgeMedium : styles.badgeLow;
    
    return (
      <div style={{...styles.alertCard, ...alertStyle}}>
        <div style={styles.alertFlex}>
          <div>
            <p style={{fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0'}}>{patient}</p>
            <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>{symptom}</p>
          </div>
          <div style={{textAlign: 'right'}}>
            <span style={{...styles.badge, ...badgeStyle}}>
              {severity === 'high' ? 'Urgente' : severity === 'medium' ? 'Moderado' : 'Bajo'}
            </span>
            <p style={{fontSize: '12px', color: '#9ca3af', margin: '4px 0 0 0'}}>{time}</p>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: TrendingUp },
    { id: 'patients', label: 'Análisis de Pacientes', icon: Users },
    { id: 'symptoms', label: 'Síntomas y Diagnósticos', icon: Activity },
    { id: 'alerts', label: 'Alertas Clínicas', icon: AlertTriangle }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        {/* Header */}
        <div style={styles.card}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Dashboard Médico</h1>
              <p style={styles.subtitle}>Panel de control estadístico - Sistema de Gestión Clínica</p>
            </div>
            <div>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={styles.select}
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="quarter">Este Trimestre</option>
                <option value="year">Este Año</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={styles.tabContainer}>
          <ul style={styles.tabList}>
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab.id ? styles.activeTab : {})
                  }}
                >
                  <tab.icon size={20} style={{marginRight: '8px'}} />
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div style={{...styles.grid, ...styles.grid4}}>
              {overviewStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts Row */}
            <div style={{...styles.grid, ...styles.grid2}}>
              {/* Consultas por Mes */}
              <div style={styles.card}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                  Consultas Mensuales
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consultationsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consultas" fill="#3B82F6" name="Total Consultas" />
                    <Bar dataKey="nuevos" fill="#10B981" name="Pacientes Nuevos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Distribución de Síntomas */}
              <div style={styles.card}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                  Síntomas Más Frecuentes
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={symptomDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name} (${value}%)`}
                    >
                      {symptomDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div style={{...styles.grid, ...styles.grid2}}>
            {/* Distribución por Edad */}
            <div style={styles.card}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                Distribución por Edad
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={ageDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rango" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Métricas de Pacientes */}
            <div style={styles.card}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '24px'}}>
                Métricas de Pacientes
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '8px'}}>
                  <div>
                    <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Pacientes Activos</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', margin: '4px 0 0 0'}}>1,089</p>
                  </div>
                  <Users size={32} color="#2563eb" />
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px'}}>
                  <div>
                    <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Nuevos este Mes</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669', margin: '4px 0 0 0'}}>89</p>
                  </div>
                  <TrendingUp size={32} color="#059669" />
                </div>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff7ed', borderRadius: '8px'}}>
                  <div>
                    <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Citas Pendientes</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ea580c', margin: '4px 0 0 0'}}>156</p>
                  </div>
                  <Clock size={32} color="#ea580c" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Symptoms Tab */}
        {activeTab === 'symptoms' && (
          <div style={styles.grid}>
            <div style={{display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px'}}>
              <div style={styles.card}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                  Tendencia de Síntomas
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={consultationsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="consultas" stroke="#3B82F6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={styles.card}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                  Top Diagnósticos
                </h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {[
                    { name: 'Hipertensión', count: 156, color: '#ef4444' },
                    { name: 'Diabetes Tipo 2', count: 98, color: '#3b82f6' },
                    { name: 'Ansiedad', count: 87, color: '#f59e0b' },
                    { name: 'Migraña', count: 76, color: '#8b5cf6' },
                    { name: 'Asma', count: 54, color: '#10b981' }
                  ].map((diagnosis, index) => (
                    <div key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: diagnosis.color, marginRight: '12px'}}></div>
                        <span style={{fontWeight: '500'}}>{diagnosis.name}</span>
                      </div>
                      <span style={{color: '#6b7280', fontWeight: '600'}}>{diagnosis.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div style={{...styles.grid, ...styles.grid2}}>
            <div style={styles.card}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                Alertas Recientes
              </h3>
              <div>
                {recentAlerts.map(alert => (
                  <AlertCard key={alert.id} {...alert} />
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '16px'}}>
                Resumen de Alertas
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', borderLeft: '4px solid #ef4444'}}>
                  <div>
                    <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Alertas Críticas</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626', margin: '4px 0 0 0'}}>12</p>
                  </div>
                  <AlertTriangle size={32} color="#dc2626" />
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b'}}>
                  <div>
                    <p style={{fontSize: '14px', color: '#6b7280', margin: 0}}>Alertas Moderadas</p>
                    <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#d97706', margin: '4px 0 0 0'}}>28</p>
                  </div>
                  <Clock size={32} color="#d97706" />
                </div>

                <div style={{padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px'}}>
                  <h4 style={{fontWeight: '600', color: '#1f2937', marginBottom: '8px'}}>Acciones Recomendadas</h4>
                  <ul style={{fontSize: '14px', color: '#6b7280', margin: 0, paddingLeft: '16px'}}>
                    <li>Revisar pacientes con alertas críticas</li>
                    <li>Programar seguimiento para casos moderados</li>
                    <li>Actualizar protocolos de emergencia</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalDashboard;