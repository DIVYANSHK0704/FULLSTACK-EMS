import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginLanding from "./Pages/LoginLanding";
import Layout from "./Pages/Layout";
import Dashboard from "./Pages/Dashboard";
import Employees from "./Pages/Employees";
import Attendance from "./Pages/Attendance";
import Leave from "./Pages/Leave";
import PaySlips from "./Pages/PaySlips";
import Settings from "./Pages/Settings";
import PrintPaySlip from "./Pages/PrintPaySlip";
import LoginForm from "./Components/LoginForm";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>

        <Route path="/login" element={<LoginLanding />} />

        <Route path="/login/admin" element={<LoginForm role="admin" title="Admin Portal" subtitle="Sign in to manage the organization"/>} />

        <Route path="/login/employee" element={<LoginForm role="employee" title="Employee Portal" subtitle="Sign in to manage the organization"/>} />

        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payslips" element={<PaySlips />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/print/payslips/:id" element={<PrintPaySlip />} />

        <Route path="*" element={<Navigate to="dashboard" replace />} />

      </Routes>
    </>
  );
};

export default App;
