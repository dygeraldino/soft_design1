import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // Importar el nuevo Dashboard
import { useAuth } from "./context/AuthContext";
import EstadisticasFormularios from "./components/Statistics";

const App: React.FC = () => {
  const { session } = useAuth();

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {!session ? (
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/statistics" element={<EstadisticasFormularios />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;