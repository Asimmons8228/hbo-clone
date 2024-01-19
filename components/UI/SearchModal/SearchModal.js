import { useStateContext } from "@/components/HBOprovider";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const SearchModal = (props) => {
  const globalState = useStateContext();
  const [popData, setPopData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [text, setText] = useState("");

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

  useEffect(() => {
    if (globalState.searchOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [globalState.searchOpen]);

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

  //   const clickedThumbnail = () => {

  //   }

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

export default SearchModal;
