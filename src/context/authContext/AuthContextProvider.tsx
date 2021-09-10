import React, { Dispatch, createContext, useReducer} from 'react';

const initialAuthContextState: AuthState = {
    userIdentification: null,
    isLoggedIn: false,
}

type UserIdentification = {
    username: string;
}

export enum AuthActionTypes {
    SetUserIdentification = 'AUTH/SETUSERIDENTIFICATION',
    SetLoggedInStatus = 'AUTH/SETLOGGEDINSTATUS',
    SetLoggedOutStatus = 'AUTH/SETLOGGEDOUTSTATUS'
}

export interface AuthState {
    userIdentification: UserIdentification | null;
    isLoggedIn: boolean;
}

export interface SetUserIdentification {
    type: AuthActionTypes.SetUserIdentification;
    userIdentification: UserIdentification | null;
}

export interface SetLoggedInStatus {
    type: AuthActionTypes.SetLoggedInStatus;
}

export interface SetLoggedOutStatus {
    type: AuthActionTypes.SetLoggedOutStatus;
}


export type AuthActions = SetUserIdentification | SetLoggedInStatus | SetLoggedOutStatus

interface ContextProps {
    authState: AuthState;
    dispatch: Dispatch<AuthActions>;
}

export const AuthContext = createContext({} as ContextProps);

function reducer(state: AuthState, action: AuthActions): AuthState {
    switch(action.type){
        case AuthActionTypes.SetUserIdentification: {

            localStorage.setItem('authDetails', JSON.stringify(action.userIdentification));

            return {
                ...state,
                userIdentification: action.userIdentification,
                isLoggedIn: true,
            }
        }
        case AuthActionTypes.SetLoggedInStatus: {
            return {
                ...state,
                isLoggedIn: true
            }
        }
        case AuthActionTypes.SetLoggedOutStatus: {
            localStorage.removeItem('authDetails');
            
            return {
                ...state,
                userIdentification: null,
                isLoggedIn: false
            }
        }
        default:
            return state;
    }
}

type Props = {
    children: React.ReactNode; 
};

export const AuthContextProvider = ({children}: Props): JSX.Element => {
    const [authState, dispatch] = useReducer(reducer, initialAuthContextState);
    const value = { authState, dispatch };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
};