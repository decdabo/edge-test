'use client'
import React, { createContext, useContext, useReducer } from "react"
import { AuthContextAction, AuthContextState, AuthContextTypes } from "@/utils/types"

export type AuthContextStateTypes = {
  state: AuthContextState,
  dispatch: React.Dispatch<AuthContextAction>
}

const initialState: AuthContextState = {
  isAuth: false,
  token: '',
  username: '',
  email: ''
}

const AuthContext = createContext({} as AuthContextStateTypes)


const authReducer = (state: AuthContextState, action: AuthContextAction): AuthContextState => {
  switch (action.type) {
    case AuthContextTypes.LOGIN:
      return {
        ...action.payload,
        isAuth: true
      }
    case AuthContextTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ state, dispatch ] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);
