import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <Login />
        <p>Por favor, inicia sesión para continuar.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      {/* Aquí pondrías tus componentes con formularios, dashboard, etc */}
      <h2>Bienvenido a la plataforma médica</h2>
    </div>
  );
};

export default App;
