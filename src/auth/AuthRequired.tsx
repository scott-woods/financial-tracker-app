import React, { createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, Navigate } from 'react-router-dom';


export const AuthContext = createContext<any | null | undefined>(null)

const AuthRequired = () => {
    
    const { isAuthenticated, isLoading, user } = useAuth0();

    if (isLoading) {
        return (
            //TODO add loading spinner
            <p>Loading...</p>
        )
    }
    else {
        if (isAuthenticated) {
            return (
                <AuthContext.Provider value={user}>
                    <Outlet />
                </AuthContext.Provider>
            )
        }
        else {
            return (
                <Navigate to="/login" />
            )
        }
    }
}

export default AuthRequired;