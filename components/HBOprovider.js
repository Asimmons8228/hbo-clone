import { userAgent } from 'next/server';
import React , {useContext, useState} from 'react';

export const StateContext = React.createContext();

export function useStateContext(){
    return useContext(StateContext)
}

export function HBOProvider({children}){
    const [user, setUser] = useState(null)
    const defaultUserImg = 'https://mighty.tools/mockmind-api/content/human/46.jpg'
    const createUserAction= (e) => {
        setUser(e.target.value)
        console.log(user)
    }

    const [sideNavOpen, setSideNavOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const thumbTypes = ['large-v', 'small-v', 'large-h', 'small-h']

    return(
        <StateContext.Provider
        value={{
            user,
            createUserAction,
            defaultUserImg,
            sideNavOpen,
            setSideNavOpen,
            accountOpen,
            setAccountOpen,
            searchOpen,
            setSearchOpen,
            thumbTypes
        }}>
        {children}
        </StateContext.Provider>
    )
}