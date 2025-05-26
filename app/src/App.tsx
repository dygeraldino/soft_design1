import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAuth } from "./context/AuthContext";
// @ts-ignore
import MainChatBot from "./components/MainChatBot";
import './App.css';

const Dashboard = () => (
  <div className="ChatBot" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h2 style={{ marginBottom: "20px" }}>Bienvenido, estás autenticado</h2>
    <MainChatBot />
  </div>
);

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
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
