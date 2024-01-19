import axios from "axios";
import { useState, useEffect } from "react";

const CastInfo = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${props.mediaType === 'movie' ? 'movie' : 'tv'}/${props.mediaId}/credits?&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
      )
      .then(function (response) {
        setCredits(response.data);
        setLoadingData(false);
        // handle success
        console.log("Success Response For Cast and Crew");
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log("Error Response For Cast and Crew");
        console.log(error);
      });
  }, [credits]);

  const showCast = () => {
    if (loadingData !== true) {
      return credits.cast.map((item) => {
        return (
          <ul className="cast-info__crew">
            <li>{item.character}</li>
            <li>{item.name}</li>
          </ul>
        );
      });
    } else {
      return <div>Loading Cast</div>;
    }
  };

  const showCrew = () => {
    if (loadingData !== true) {
      return credits.crew.map((item) => {
        return (
          <ul className="cast-info__crew">
            <li>{item.job}</li>
            <li>{item.name}</li>
          </ul>
        );
      });
    } else {
      return <div>Loading Crew</div>;
    }
  };

  return (
    <div className="cast-info">
      <div className="cast-info__group-title">Cast</div>
      <div className="cast-info__list">{showCast()}</div>
      <div className="cast-info__group-title">Crew</div>
      <div className="cast-info__list">{showCrew()}</div>
    </div>
  );
};

export default CastInfo;