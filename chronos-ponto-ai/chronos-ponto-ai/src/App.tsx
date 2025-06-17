import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import LoginPage from '@/pages/LoginPage';
import Register from '@/components/Register';
import ResetPassword from '@/components/ResetPassword';
import DashboardPage from '@/pages/DashboardPage';
import ReportsPage from '@/pages/ReportsPage';
import CompliancePage from '@/pages/CompliancePage';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-16"> {/* Adicionado espaçamento para evitar sobreposição com o Navbar */}
        <Routes>
          {/* Rota para a página de login */}
          <Route path="/" element={<LoginPage />} />

          {/* Rota para a página de registro */}
          <Route path="/register" element={<Register />} />

          {/* Rota para a página de redefinição de senha */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Rota protegida para o dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Rota protegida para a página de relatórios */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <ReportsPage />
              </ProtectedRoute>
            }
          />

          {/* Rota protegida para a página de conformidade */}
          <Route
            path="/compliance"
            element={
              <ProtectedRoute>
                <CompliancePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
