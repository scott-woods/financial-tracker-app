import React, { createContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import { Box } from '@mui/material';
import Unauthorized from '../pages/Unauthorized';


export const AuthContext = createContext<any | null | undefined>(null)

const audience = process.env.REACT_APP_AUTH0_AUDIENCE as string;

const AuthRequired = () => {
    
    const [accessToken, setAccessToken] = useState()
    const [isAuthLoading, setIsAuthLoading] = useState(true)

    const { isAuthenticated, isLoading, user, getAccessTokenSilently, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
            setAuthHeader()
        }
        else if (!isLoading && !isAuthLoading) {
            loginWithRedirect()
        }
    }, [isAuthenticated, isLoading])

    const setAuthHeader = async () => {
        try {
            setIsAuthLoading(true)
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: `https://${audience}/`
                }
            })
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setIsAuthLoading(false)
        }
    }

    if (isAuthenticated && !isLoading && !isAuthLoading) {
        return (
            <AuthContext.Provider value={user}>
                <Outlet />
            </AuthContext.Provider>
        )
    }
    else {
        return (
            <Box display="flex" height="100vh" justifyContent="center">
                <Loading />
            </Box>
        )
    }
}

export default AuthRequired;