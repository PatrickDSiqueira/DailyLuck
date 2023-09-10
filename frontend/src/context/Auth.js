import {createContext, useEffect, useState} from "react";
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext(undefined);

export default function AuthContextProvider({children}) {

    const [token, setToken] = useState();


    const fetchData = async () => {

        const storeToken = localStorage.getItem('auth_token');

        if (storeToken) {

            try {

                const decodedToken = await jwtDecode(storeToken);

                const currentTime = Math.floor(new Date().getTime() / 1000)

                if (decodedToken.exp >= currentTime) {

                    return storeToken
                }
            } catch (e) {

                return false;
            }
        }
        return false;
    }

    useEffect(() => {
        fetchData()
            .then(r =>setToken(r))
            .catch(error => {
                console.log(error);
                setToken(false);
            })
// eslint-disable-next-line
    }, []);

    return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>
}