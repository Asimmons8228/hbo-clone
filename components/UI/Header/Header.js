// Importing necessary modules and components
import Account from "../Account/Account";  // Account component
import SearchModal from "../SearchModal/SearchModal";  // SearchModal component
import { useStateContext } from "@/components/HBOprovider";  // Custom hook to access global state
import Link from "next/link";  // Next.js component for client-side navigation

// Header component definition
const Header = (props) => {
    const globalState = useStateContext();  // Accessing global state using custom hook

    // JSX structure for Header component
    return (
        <header className={`top-header ${globalState.accountOpen || globalState.sideNavOpen ? 'top-header--menu-open' : ''}`}>
            <div className="top-header__left-side">
                {/* Button to open side navigation */}
                <div className="top-header__menu-btn" onClick={() => globalState.setSideNavOpen(true)}>
                    <i className="fas fa-bars" />
                </div>
                {/* Button to open search modal */}
                <div className="top-header__search-btn" onClick={() => globalState.setSearchOpen(true)}>
                    <i className="fas fa-search" />
                </div>
            </div>
            {/* Logo linking to the home page */}
            <Link href="/">
                <div className="top-header__logo"></div>
            </Link>
            {/* User account section with profile image and name */}
            <div className="top-header__account" onClick={() => globalState.setAccountOpen(!globalState.accountOpen)}>
                <img className="top-header__user-img" src="https://mighty.tools/mockmind-api/content/human/46.jpg" width={60} />
                <div className="top-header__user-name">Rajiv</div>
            </div>
            {/* Account and SearchModal components */}
            <Account />
            <SearchModal />
        </header>
    );
}

// Exporting the Header component as the default export
export default Header;
