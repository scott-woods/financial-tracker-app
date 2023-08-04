import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';

const Login = () => {

    const { loginWithRedirect, logout, isAuthenticated, isLoading, error } = useAuth0();

    return (
        <div>
            <h1>Login</h1>
            {error && (
                <p>Authentication Error - {error.message}</p>
            )}
            {!error && isLoading && (
                <Loading />
            )}
            {!error && !isLoading && (
                <>
                    {!isAuthenticated && (
                        <button onClick={() => loginWithRedirect()}>
                            Sign In
                        </button>
                    )}
                    {isAuthenticated && (
                        <button onClick={() => logout()}>
                            Sign Out
                        </button>
                    )}
                </>
            )}
        </div>
    )
}

export default Login;