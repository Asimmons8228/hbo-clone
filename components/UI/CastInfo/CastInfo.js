// Importing necessary modules
import axios from "axios";
import { useState, useEffect } from "react";

// CastInfo component definition
const CastInfo = (props) => {
  // State to manage loading data and credits
  const [loadingData, setLoadingData] = useState(true);
  const [credits, setCredits] = useState([]);

  // Fetching cast and crew information using useEffect
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.mediaType === 'movie' ? 'movie' : 'tv'}/${props.mediaId}/credits?&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
      )
      .then(function (response) {
        setCredits(response.data);
        setLoadingData(false);
      })
      .catch(function (error) {
        console.log(error);  // Logging error response (removed)
      });
  }, [props.mediaType, props.mediaId]);

  // Function to render cast information
  const showCast = () => {
    if (loadingData !== true) {
      return credits.cast.map((item, index) => {
        return (
          <ul className="cast-info__crew" key={index}>
            <li>{item.character}</li>
            <li>{item.name}</li>
          </ul>
        );
      });
    } else {
      return <div>Loading Cast</div>;
    }
  };

  // Function to render crew information
  const showCrew = () => {
    if (loadingData !== true) {
      return credits.crew.map((item, index) => {
        return (
          <ul className="cast-info__crew" key={index}>
            <li>{item.job}</li>
            <li>{item.name}</li>
          </ul>
        );
      });
    } else {
      return <div>Loading Crew</div>;
    }
  };

  // JSX structure for CastInfo component
  return (
    <div className="cast-info">
      <div className="cast-info__group-title">Cast</div>
      <div className="cast-info__list">{showCast()}</div>
      <div className="cast-info__group-title">Crew</div>
      <div className="cast-info__list">{showCrew()}</div>
    </div>
  );
};

// Exporting the CastInfo component as the default export
export default CastInfo;
