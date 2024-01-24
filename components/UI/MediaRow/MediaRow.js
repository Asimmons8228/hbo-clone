// Importing necessary modules and components
import { useState, useEffect } from "react";  // React hooks for state and side effects
import axios from "axios";  // HTTP client for making API requests
import { shuffleArray } from "@/components/utilities";  // Utility function to shuffle an array
import Link from "next/link";  // Next.js component for client-side navigation

// MediaRow component definition
const MediaRow = (props) => {
  // States for loading data and storing movies data
  const [loadingData, setLoadingData] = useState(true);
  const [movies, setMoviesData] = useState([]);

  // Effect to fetch data from the provided endpoint
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.endpoint}&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
      )
      .then(function (response) {
        setMoviesData(shuffleArray(response.data.results));
        setLoadingData(false);
        // handle success (removed console logs)
      })
      .catch(function (error) {
        // handle error (removed console logs)
      });
  }, [props.updateData]);

  // Function to loop through components for skeleton loading
  const loopComp = (comp, digit) => {
    let thumbnails = Array.from({ length: digit }, (_, index) => React.cloneElement(comp, { key: String(index) }));
    return thumbnails;
  };

  // Function to show thumbnails based on loading state
  const showThumbnails = (type) => {
    return loadingData
      ? loopComp(<Skeleton />, 10)
      : movies.map((movie) => {
          return <Thumbnail key={movie.id} movieData={movie} type={type} mediaType={props.mediaType} />;
        });
  };

  // JSX structure for MediaRow component
  return (
    <div className={`media-row ${props.type}`}>
      <h3 className="media-row__title">{props.title}</h3>
      <div className="media-row__thumbnails">{showThumbnails(props.type)}</div>
    </div>
  );
};

// Thumbnail component definition
const Thumbnail = (props) => {
  // Function to determine thumbnail size based on type
  const thumbSize = (type) => {
    if (props.type === "large-v") {
      return "400";
    }
    if (props.type === "small-v") {
      return "185";
    }
    if (props.type === "large-h") {
      return "500";
    }
    if (props.type === "small-h") {
      return "342";
    }
  };

  // JSX structure for Thumbnail component with Link
  return (
    <Link href={`/${props.mediaType === 'movie' ? 'movie' : 'tv'}/${props.movieData.id}`}>
      <div className="media-row__thumbnail">
        <img
          src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}/${
            props.movieData.poster_path
          }`}
        />
        <div className="media-row__top-player">
          <i className="fas fa-play" />
        </div>
      </div>
    </Link>
  );
};

// Skeleton component definition for loading state
const Skeleton = () => {
  return (
    <div className="media-row__thumbnail-skeleton">
      <div className="media-row__thumbnail-skeleton-img"></div>
    </div>
  );
};

// Exporting the MediaRow component as the default export
export default MediaRow;
