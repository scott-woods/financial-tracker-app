import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {

    const { loginWithRedirect, logout, isAuthenticated, isLoading, error } = useAuth0();

    return (
        <div>
            <h1>Login</h1>
            {error && (
                <p>Authentication Error - {error.message}</p>
            )}
            {!error && isLoading && (
                <p>Loading...</p>
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