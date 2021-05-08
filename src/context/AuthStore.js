import React, { useReducer } from 'react'

export const AuthContext = React.createContext()

export const AuthConstants = {
    PHONE_NUMBER: "PHONE_NUMBER",
    COUNTRY: "COUNTRY",
    EDITABLE: "EDITABLE",
    VERIFICATION_CODE: "VERIFICATION_CODE",
    CONFIRM_STATE: "CONFIRM_STATE"
}

const initialState = {
    phoneNumber: "",
    country: {
        "name": "Bangladesh",
        "dial_code": "+880",
        "code": "BD"
    },
    editable: true,
    verificationCode: "",
    confirmState: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case AuthConstants.PHONE_NUMBER:
            return {
                ...state,
                phoneNumber: action.phoneNumber
            }
        case AuthConstants.COUNTRY:
            return {
                ...state,
                country: action.country
            }
        case AuthConstants.EDITABLE:
            return {
                ...state,
                editable: action.editable
            }
        case AuthConstants.VERIFICATION_CODE:
            return {
                ...state,
                verificationCode: action.verificationCode
            }
        case AuthConstants.CONFIRM_STATE:
            return {
                ...state,
                confirmState: action.confirmState
            }
        default:
            return state
    }
}


export const AuthProvider = ({ children }) => {

    const [state, dispatcher] = useReducer(reducer, initialState)
    return (
        <AuthContext.Provider value={{ state, dispatcher }}>
            {children}
        </AuthContext.Provider>
    )
}
