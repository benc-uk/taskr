import React, { useState, useEffect } from 'react';

const Authenticator = ({ onLoggedIn, children }) => {

    // Check if the user is logged in
    const [clientPrincipal, setClientPrincipal] = useState(null);
    useEffect(() => {

        const loginAs = (principal) => {
            onLoggedIn(principal.userId);
            setClientPrincipal(principal);
        };

        const makeRequest = async () => {
            const userOverride = process.env.REACT_APP_CLIENT_PRINCIPAL_OVERRIDE;
            if (userOverride) {
                loginAs(JSON.parse(userOverride));
                return;
            }
            try {
                const response = await fetch("/.auth/me");
                const { clientPrincipal } = await response.json();
                loginAs(clientPrincipal);
            } catch (err) {
                console.log('Error loading assignees' + err.toString());
            }
        };
        if (clientPrincipal) return;
        makeRequest();
    }, [clientPrincipal, onLoggedIn]);

    // If we aren't logged in - show some links to login
    if (!clientPrincipal) {
        return (
            <div>
                Login with
                <ul>
                    <li><a href="/.auth/login/aad?post_login_redirect_uri=/api/postLogin">Azure AD</a></li>
                    <li><a href="/.auth/login/facebook?post_login_redirect_uri=/api/postLogin">Facebook</a></li>
                    <li><a href="/.auth/login/github?post_login_redirect_uri=/api/postLogin">GitHub</a></li>
                    <li><a href="/.auth/login/google?post_login_redirect_uri=/api/postLogin">Google</a></li>
                    <li><a href="/.auth/login/twitter?post_login_redirect_uri=/api/postLogin">Twitter</a></li>
                </ul>
            </div>
        );
    }

    // Otherwise carry on rendering
    return children;
};

export default Authenticator;