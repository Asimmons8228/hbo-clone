import { useStateContext } from "@/components/HBOprovider";
import Link from "next/link";
import { useEffect } from "react";

const SideNav = (props) =>{
    const globalState = useStateContext();
    useEffect(() => {
        if (globalState.sideNavOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [globalState.sideNavOpen])
    return(
        <div className={`side-nav ${globalState.sideNavOpen ? 'side-nav--active' : ''}`}>
           <div className="side-nav__close-btn" onClick={() => globalState.setSideNavOpen(false) }>
                <i className="fas fa-times"/>
            </div> 
            <ul className="side-nav__main ">
                <li onClick={() => globalState.setSideNavOpen(false) }>
                    <Link href='/'>
                        Home
                    </Link>
                </li>
                <li onClick={() => globalState.setSideNavOpen(false) }>
                    <Link href='/movie'>
                        Movie
                    </Link>
                </li>
                <li onClick={() => globalState.setSideNavOpen(false) }>
                    <Link href='/tv'>
                        Series
                    </Link>
                </li>
            </ul>
            <div className="side-nav__divider"></div>
        </div>
    )
}

export default SideNav;