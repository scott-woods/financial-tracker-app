import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../pages/Layout"
import Dashboard from "../pages/Dashboard"
import NotFound from "../pages/NotFound"
import AuthRequired from "./AuthRequired"
import IncomeAndExpenses from "../pages/IncomeAndExpenses"

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Layout />}>
                <Route element={<AuthRequired />}>
                    <Route index element={<Navigate replace to="dashboard" />} />
                    <Route path="dashboard" element={<Dashboard /> } />
                    <Route path="income-and-expenses" element={<IncomeAndExpenses />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default MainRoutes;