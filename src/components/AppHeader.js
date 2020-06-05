import React from 'react';

import { AzureAD, AuthenticationState } from 'react-aad-msal';
import { authProvider } from '../providers/authProvider';

function AppHeader(props) {
    return (<AzureAD provider={authProvider} forceLogin={false}>
        {
            ({ login, logout, authenticationState, error, accountInfo }) => {
                switch (authenticationState) {
                    case AuthenticationState.Authenticated:
                        return (
                            <p>
                                <span>{accountInfo.account.name}</span>&nbsp;<button onClick={logout}>Logout</button>
                            </p>
                        );
                    case AuthenticationState.Unauthenticated:
                        return (
                            <div>
                                {error && <p><span>An error occured during authentication, please try again!</span></p>}
                                <p>
                                    <button onClick={login}>Login</button>
                                </p>
                            </div>
                        );
                    case AuthenticationState.InProgress:
                        return (<p>Authenticating...</p>);
                    default:
                        break;
                }
            }
        }
    </AzureAD>);
}

export default AppHeader;

