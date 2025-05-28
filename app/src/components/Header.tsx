import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, Link } from "react-router-dom";

const Header: React.FC = () => {
  const { session, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  // Definimos los estilos dinámicos dentro del componente
  const styles = {
    header: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "1rem",
      textAlign: "center" as const,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      position: "relative" as const,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    title: {
      margin: 0,
      fontSize: "1.8rem",
      marginBottom: session ? "0.5rem" : "0", // Ahora session está disponible
    },
    navContainer: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    nav: {
      display: "flex",
      gap: "1rem",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
      padding: "0.5rem",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
    button: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>MediBot - Plataforma médica segura</h1>
      {session && !isLoginPage && (
        <div style={styles.navContainer}>
          <nav style={styles.nav}>
            <Link to="/dashboard" style={styles.navLink}>
              ChatBot
            </Link>
            <Link to="/estadisticas" style={styles.navLink}>
              Estadísticas
            </Link>
          </nav>
          <button style={styles.button} onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;