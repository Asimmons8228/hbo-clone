// Importing necessary modules
import { useRouter } from "next/router";

// FeaturedMedia component definition
const FeaturedMedia = (props) => {
    const router = useRouter();

    // Function to handle play button click
    const clickedPlay = () => {
        router.push(props.linkUrl);
    }

    // Function to render media content based on type
    const showMedia = () => {
        if (props.type === 'front') {
            return (
                <iframe
                    className="featured-media__video"
                    width="100%"
                    height="100%"
                    src={props.mediaUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            );
        } else {
            return (
                <img src={props.mediaUrl} className="featured-media__img" alt="Featured Media" />
            );
        }
    }

    // JSX structure for FeaturedMedia component
    return (
        <div className={`featured-media ${props.type === 'single' ? 'featured-media--single' : ''}`}>
            {showMedia()}
            <div className="featured-media__bg">
                <div className="featured-media__container">
                    {/* Title of the featured media */}
                    <div className="featured-media__title" onClick={clickedPlay}>{props.title}</div>
                    {/* Displayed when media is playing */}
                    <div className={`featured-media__playing ${props.type === 'single' ? 'hide-comp' : ''}`}>Now Playing</div>
                    {/* Location information */}
                    <div className={`featured-media__location ${props.type === 'single' ? 'hide-comp' : ''}`}>{props.location}</div>
                    <div className="featured-media__buttons">
                        {/* Play button */}
                        <div className="featured-media__play-btn" onClick={clickedPlay}><i className="fas fa-play"></i></div>
                        {/* Info button (hidden in single mode) */}
                        <div className={`featured-media__info-btn ${props.type === 'single' ? 'hide-comp' : ''}`} onClick={clickedPlay}>MORE INFO</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Exporting the FeaturedMedia component as the default export
export default FeaturedMedia;
