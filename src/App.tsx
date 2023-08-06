import './App.css';
import { Routes, Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import AuthRequired from './auth/AuthRequired';
import Login from './pages/Login';
import { useAuth0 } from '@auth0/auth0-react';
import LoggedOut from './pages/LoggedOut';
import AssetsAndDebts from './pages/AssetsAndDebts';
import IncomeAndExpenses from './pages/IncomeAndExpenses';
import Dashboard from './pages/Dashboard';
import ManageSavingsGoals from './pages/ManageSavingsGoals';
import Error from './pages/Error';

function App() {

  const { isLoading, error } = useAuth0();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<Error />}>
        <Route path="/login" element={<Login />} />
        <Route path="/loggedout" element={<LoggedOut />} />
        <Route path="/*" element={<NotFound />} />
        <Route element={<AuthRequired />}>
          <Route path="/" element={<Layout />}>
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard /> } />
              <Route path="income-and-expenses" element={<IncomeAndExpenses />} />
              <Route path="assets-and-debts" element={<AssetsAndDebts />} />
              <Route path="savings-goals" element={<ManageSavingsGoals />} />
          </Route>
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App;
