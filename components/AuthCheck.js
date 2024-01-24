// Importing necessary modules and components
import { useEffect, useState } from "react";  // React hooks for side effects and state management
import { useRouter } from "next/router";  // Next.js hook for accessing the router
import ls from 'local-storage';  // Library for local storage operations
import { useMounted } from "./Hooks/useMounted";  // Custom hook for checking if component has mounted

// AuthCheck component definition
const AuthCheck = (component) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);  // State to track user login status
    const router = useRouter();  // Next.js router instance
    const { hasMounted } = useMounted();  // Custom hook to check if the component has mounted
    let activeUID = ls('activeUID');  // Retrieving active user ID from local storage
    let users = ls('users') !== null ? ls('users') : [];  // Retrieving user data from local storage

    // Effect to check user authentication status and redirect accordingly
    useEffect(() => {
        if (activeUID === null && users.length < 1) {
            router.push('/create');  // Redirect to create user page if no active user and no users exist
        }
    }, []);

    // Conditional rendering based on user authentication status
    if (users.length >= 1 && activeUID !== null) {
        return hasMounted ? (component) : (
            <div className="create-user">
                <div className="create-user__top">
                    <div className="create-user__logo"></div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="create-user">
                <div className="create-user__top">
                    <div className="create-user__logo"></div>
                </div>
            </div>
        );
    }

    return component;  // Returning the original component (unreachable code as it follows conditional returns)
}

// Exporting the AuthCheck component as the default export
export default AuthCheck;
