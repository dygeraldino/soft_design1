import React from "react";

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>MiServicioApp</h1>
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
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
};

export default Header;
