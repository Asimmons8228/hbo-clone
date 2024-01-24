import { useStateContext } from "@/components/HBOprovider";
import { useEffect } from "react";

const Account = () => {
  // Accessing global state using the useStateContext hook
  const globalState = useStateContext();

  // useEffect to handle body overflow based on accountOpen state
  useEffect(() => {
    if (globalState.accountOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.accountOpen]);

  // JSX structure for the Account component
  return (
    <div
      className={`account ${globalState.accountOpen ? "account--active" : ""}`}
    >
      {/* Account details section */}
      <div className="account__details">
        <div className="account__title">My List</div>
        {/* Watch list with a sample video */}
        <div className="account__watch-list">
          <div className="account__watch-video">
            <img
              src="https://m.media-amazon.com/images/I/714gs73qS2L.jpg"
              alt="Watch Video"
            />
            {/* Overlay with play and close buttons */}
            <div className="account__watch-overlay">
              <div className="account__watch-buttons">
                <div className="account__watch-circle">
                  <i className="fas fa-play" />
                </div>
                <div className="account__watch-circle">
                  <i className="fas fa-times" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Account menu section */}
      <div className="account__menu">
        {/* Main account navigation */}
        <ul className="account__main">
          <li>
            <a href="/" className="active">
              My List
            </a>
          </li>
        </ul>
        {/* Divider */}
        <div className="side-nav__divider"></div>
        {/* Additional account options */}
        <ul className="account__main">
          <li>
            <a href="/">Account</a>
          </li>
          <li>
            <a href="/">Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Account;
