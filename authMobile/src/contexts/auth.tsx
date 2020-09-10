import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as Auth from '../services/auth';
import api from '../services/api';

interface User {
    name: string;
    email: string;
}

interface AuthContextData{
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {    
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadStoragedData(){
            const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
            const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
        
            await new Promise(resolve => setTimeout(resolve,2000));

            if(storagedUser && storagedToken){
                api.headers['Authorization'] = `Bearer ${storagedToken}`;
                setUser(JSON.parse(storagedUser));
                setLoading(false);
            }
        }
        loadStoragedData();
    },[])

    async function signIn(){
       const response = await Auth.signIn();

       console.log(response.data);

       setUser(response.data.user);

       api.headers['Authorization'] = `Bearer ${response.data.token}`;

       await AsyncStorage.setItem('@RNAuth:user',JSON.stringify(response.data.user));
       await AsyncStorage.setItem('@RNAuth:token',response.data.token);
    }

    function signOut(){
        AsyncStorage.clear().then(()=>{
            setUser(null);
        })
    }

    return(
    <AuthContext.Provider value={{ signed: !!user, user, loading ,signIn, signOut }}>
        {children}
    </AuthContext.Provider>
)};

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
};