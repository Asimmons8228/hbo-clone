// Importing necessary modules and components
import { useStateContext } from "@/components/HBOprovider";  // Custom hook to access global state
import Link from "next/link";  // Next.js component for client-side navigation
import { useEffect } from "react";  // React hook for side effects

// SideNav component definition
const SideNav = (props) => {
    const globalState = useStateContext();  // Accessing global state using custom hook

    // Effect to handle overflowY property of body based on global state
    useEffect(() => {
        if (globalState.sideNavOpen) {
            document.body.style.overflowY = 'hidden';  // Disable vertical overflow when sideNav is open
        } else {
            document.body.style.overflowY = 'auto';  // Enable vertical overflow when sideNav is closed
        }
    }, [globalState.sideNavOpen]);

    // JSX structure for the SideNav component
    return (
        <div className={`side-nav ${globalState.sideNavOpen ? 'side-nav--active' : ''}`}>
            <div className="side-nav__close-btn" onClick={() => globalState.setSideNavOpen(false)}>
                <i className="fas fa-times" />
            </div>
            <ul className="side-nav__main">
                <li onClick={() => globalState.setSideNavOpen(false)}>
                    <Link href='/'>
                        Home
                    </Link>
                </li>
                <li onClick={() => globalState.setSideNavOpen(false)}>
                    <Link href='/movie'>
                        Movie
                    </Link>
                </li>
                <li onClick={() => globalState.setSideNavOpen(false)}>
                    <Link href='/tv'>
                        Series
                    </Link>
                </li>
            </ul>
            <div className="side-nav__divider"></div>
        </div>
    );
}

// Exporting the SideNav component as the default export
export default SideNav;
