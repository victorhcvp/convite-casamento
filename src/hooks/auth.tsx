import axios from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { User } from '../entities/User'

type AuthData = {
  auth: PhoneData;
  login: (phone: string) => Promise<boolean>;
  logout: () => void;
  user: User;
}

type AuthProviderProps = {
  children: ReactNode;
}

type PhoneData = {
  phone: string;
}

type UserData = {
  data: User;
}

const AuthContext = createContext<AuthData>({} as AuthData)

export function AuthProvider({children}: AuthProviderProps) {
  const [auth, setAuth] = useState<PhoneData>({} as PhoneData);
  const [user, setUser] = useState<User>({} as User);
  const router = useRouter();

  useEffect(() => {
    if(typeof window !== undefined) {
      const phoneStored = localStorage.getItem('@phone');

      if(phoneStored) {
        setAuth({phone: phoneStored})
        if(router.pathname === '/') {
          router.push('/inicio')
        }
      }

      const userStored = localStorage.getItem('@user');

      if(userStored) {
        setUser(JSON.parse(userStored))
      }
    }
  }, [router]);

  async function login(phone:string) {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/login',
        data: {
          phone
        }
      });

      if(res.status !== 200) {
        console.log('não logado');
      }
      else {

        const userData:UserData = res.data;

        localStorage.setItem('@user', JSON.stringify(userData.data));
        localStorage.setItem('@phone', phone);
        setAuth({
            phone
        });
        setUser({...userData.data})
        return true;
      }
    } catch(error) {

    }
    
    return false;
  }

  const logout = useCallback(() => {
    localStorage.removeItem('@phone');
    localStorage.removeItem('@user');
    setAuth({
        phone: ''
    });
    setUser({} as User);
  }, []);

  return (
    <AuthContext.Provider value={{auth, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context;
}