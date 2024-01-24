// Importing necessary modules and components
import { useStateContext } from "@/components/HBOprovider";  // Custom hook to access global state
import { useEffect, useState } from "react";  // React hooks for side effects and state management
import axios from "axios";  // HTTP client for making API requests
import Link from "next/link";  // Next.js component for client-side navigation
import { useRouter } from "next/router";  // Next.js hook for accessing the router

// SearchModal component definition
const SearchModal = (props) => {
  const globalState = useStateContext();  // Accessing global state using custom hook
  const [popData, setPopData] = useState([]);  // State for popular movies data
  const [searchData, setSearchData] = useState([]);  // State for search results data
  const [showResults, setShowResults] = useState(false);  // State to control visibility of search results
  const [text, setText] = useState("");  // State to hold the search input text

  // Fetching popular movies data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        let popData = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?primary_release_year=2023&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
        );
        setPopData(popData.data.results.filter((item, i) => i < 21));

        setShowResults(false);
        console.log("popdata", popData.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Effect to handle overflowY property of body based on global state
  useEffect(() => {
    if (globalState.searchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.searchOpen]);

  // Handling user input for search and fetching search results
  const handleInput = async (e) => {
    try {
      setText(e.target.value);
      let searchData = await axios.get(
        `https://api.themoviedb.org/3/search/multi?query=${e.target.value}&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
      );
      setSearchData(
        searchData.data.results.filter(
          (item, i) => item.media_type === "tv" || item.media_type === "movie"
        )
      );
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  // JSX structure for the SearchModal component
  return (
    <div
      className={`search-modal ${
        globalState.searchOpen ? "search-modal--active" : ""
      }`}
    >
      <div className="search-modal__input-group">
        <input
          className="search-modal__input"
          type="text"
          placeholder="Search for a title"
          onChange={handleInput}
          value={text}
        />
        <div
          className="search-modal__close-btn"
          onClick={() => globalState.setSearchOpen(false)}
        >
          <i className="fas fa-times" />
        </div>
      </div>

      <h3 className="search-modal__title">
        {showResults && searchData.length >= 1
          ? `Search results for ${text}`
          : `Popular Searches`}
      </h3>
      <div className="search-modal__thumbnails">
        {showResults && searchData.length >= 1 ? (
          <SearchResults searchData={searchData} />
        ) : (
          <PopularResults popData={popData} />
        )}
      </div>
    </div>
  );
};

// Component for rendering popular movie thumbnails
const PopularResults = (props) => {
  const globalState = useStateContext();
  return props.popData.map((item, index) => {
    return (
      <Link href={`/movie/${item.id}`} key={index}>
        <div
          className="search-modal__thumbnail"
          onClick={() => globalState.setSearchOpen(false)}
        >
          <img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
          <div className="search-modal__top-player">
            <i className="fas fa-play" />
          </div>
        </div>
      </Link>
    );
  });
};

// Component for rendering search results thumbnails
const SearchResults = (props) => {
  const globalState = useStateContext();
  return props.searchData.map((item, index) => {
    return (
      <Link href={`/${item.media_type}/${item.id}`} key={index}>
        <div
          className="search-modal__thumbnail"
          onClick={() => globalState.setSearchOpen(false)}
        >
          <img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
          <div className="search-modal__top-player">
            <i className="fas fa-play" />
          </div>
        </div>
      </Link>
    );
  });
};

// Exporting the SearchModal component as the default export
export default SearchModal;