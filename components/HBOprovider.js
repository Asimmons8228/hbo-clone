// Importing necessary modules
import { userAgent } from 'next/server';  // Importing the userAgent from Next.js
import React, { useContext, useState } from 'react';  // React components and hooks

// Creating a context for state management
export const StateContext = React.createContext();

// Custom hook to access the state context
export function useStateContext() {
    return useContext(StateContext);
}

// HBOProvider component definition
export function HBOProvider({ children }) {
    // State for user information
    const [user, setUser] = useState(null);
    const defaultUserImg = 'https://mighty.tools/mockmind-api/content/human/46.jpg';  // Default user image URL

    // Function to handle user creation action
    const createUserAction = (e) => {
        setUser(e.target.value);
        console.log(user);
    }

    // States for various UI-related actions
    const [sideNavOpen, setSideNavOpen] = useState(false);
    const [accountOpen, setAccountOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Array of thumbnail types
    const thumbTypes = ['large-v', 'small-v', 'large-h', 'small-h'];

    // JSX structure for HBOProvider component, providing state values to the context
    return (
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
            }}
        >
            {children}
        </StateContext.Provider>
    );
}
