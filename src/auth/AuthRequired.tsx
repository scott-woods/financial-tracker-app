import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';


export const AuthContext = createContext<any | null | undefined>(null)

const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

const AuthRequired = () => {
    
    const [accessToken, setAccessToken] = useState()
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        setAuthHeader()
    }, [isAuthenticated])

    const setAuthHeader = async () => {
        if (isAuthenticated) {
            setIsAuthLoading(true)
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${audience}/`
                }
            })
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

            setIsAuthLoading(false)
        }
    }

    if (isLoading || isAuthLoading) {
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