// Header.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const { session, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <header style={styles.header}>
      <h1 style={styles.title}>MediBot - Plataforma médica segura</h1>
      {session && !isLoginPage && (
        <button style={styles.button} onClick={logout}>
          Cerrar sesión
        </button>
      )}
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "1rem",
    textAlign: "center" as const,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    position: "relative" as const,
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
  button: {
    position: "absolute" as const,
    right: "1rem",
    top: "1rem",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Header;
