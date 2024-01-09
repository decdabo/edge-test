'use client'
import { AuthContextAction, AuthContextState, AuthContextTypes } from "@/utils/types"
import React, { createContext, useContext, useReducer } from "react"

const AuthContext = createContext({})

const initialState: AuthContextState = {
  isAuth: true,
  token: '',
  username: '',
  email: ''
}

const authReducer = (state: AuthContextState, action: AuthContextAction) => {
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
  const [ state, dispatch ] = useReducer<any>(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);
