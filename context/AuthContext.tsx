import { createContext, useEffect, useReducer, useState } from "react";
import { AuthState, authReducer } from "../reducers/AuthReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import kneApi from "../api/kneapi";
import { LoginData, RegisterData, User } from "../interfaces/User";
import { router } from "expo-router";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: User | null;
    // Permite revisar si aun estoy logeando
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
    isLoading: boolean;
}

const initialState: AuthState = {
    errorMessage: '',
    status: 'checking',
    token: null,
    user: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        // await AsyncStorage.removeItem('token')
        const token = await AsyncStorage.getItem('token');
        if( !token ) return dispatch({ type: 'notAuthenticated' });

        // Hay token 
        const resp = await kneApi.get('/users/me');
        if( resp.status != 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }

        dispatch({
            type: 'signUp',
            payload: {
                token: token,
                user: {
                    id: resp.data.data.id,
                    username: resp.data.data.username,
                    email: resp.data.data.email,
                    password: resp.data.data.password,
                    status: resp.data.data.status
                }
            }
        })
    }
    
    const signIn = async({ email, password }: LoginData) => {
        try {
            setIsLoading(true);
            const response = await kneApi.post('/auth/login', {
                email,
                password
            })

            dispatch({
                type: 'signUp',
                payload: {
                    token: response.data.data.token,
                    user: {
                        email: response.data.data.email,
                        id: response.data.data.id,
                        username: response.data.data.username,
                        password: response.data.data.password,
                        status: response.data.data.status
                    }
                }
            });

            await AsyncStorage.setItem('token', response.data.data.token);
            setIsLoading(false);
            router.replace('/');
            
        } catch (error: any) {
            console.log(error.response.data);
            setIsLoading(false);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    
    const signUp = async({ email, username, password }: RegisterData) => {
        try {
            setIsLoading(true);
            const response = await kneApi.post('/auth/register', {
                email,
                username,
                password
            });
            
            dispatch({
                type: 'signUp',
                payload: {
                    token: response.data.data.token,
                    user: {
                        email: response.data.data.email,
                        id: response.data.data.id,
                        username: response.data.data.username,
                        password: response.data.data.password,
                        status: response.data.data.status
                    }
                }
            })

            
            router.replace('/');
            setIsLoading(false);
            
        } catch (error: any) {
            console.log(error.response.data);
            setIsLoading(false);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');

        dispatch({
            type: 'logout'
        })
    };

    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    };

    return(
        <AuthContext.Provider
            value={{
                ...state,
                signUp,
                signIn,
                logOut,
                removeError,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}