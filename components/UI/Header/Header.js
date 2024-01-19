import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "@/components/HBOprovider";
import Link from "next/link";

const Header = (props) =>{
    const globalState = useStateContext();
    return(
        <header className={`top-header ${globalState.accountOpen || globalState.sideNavOpen ? 'top-header--menu-open' : ''}`}>
            <div className="top-header__left-side">
                <div className="top-header__menu-btn" onClick={() => globalState.setSideNavOpen(true)}>
                    <i className="fas fa-bars"/>
                </div>
                <div className="top-header__search-btn" onClick={() => globalState.setSearchOpen(true)}>
                    <i className="fas fa-search" />
                </div>
            </div>
            <Link href="/">
            <div className="top-header__logo"></div>
            </Link>
            <div className="top-header__account" onClick={ () => globalState.setAccountOpen(!globalState.accountOpen)}>
                <img className="top-header__user-img" src="https://mighty.tools/mockmind-api/content/human/46.jpg" width={60}/>
                <div className="top-header__user-name">Rajiv</div>
            </div>
            <Account />
            <SearchModal />
        </header>
    )
}

export default Header;