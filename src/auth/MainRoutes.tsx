import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "../pages/Layout"
import Home from "../pages/Home"
import NotFound from "../pages/NotFound"
import AuthRequired from "./AuthRequired"

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Layout />}>
                <Route element={<AuthRequired />}>
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default MainRoutes;