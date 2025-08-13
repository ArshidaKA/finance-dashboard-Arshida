import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import ReportsSettings from "../pages/ReportsSettings";

export default function AppRouter() {
  return (
    <Router>
      <PageLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/reports-settings" element={<ReportsSettings />} />
          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}
