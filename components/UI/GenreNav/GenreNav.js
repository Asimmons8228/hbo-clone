// Importing necessary modules and components
import { useState } from "react";  // React hook for state management
import Link from "next/link";  // Next.js component for client-side navigation
// import { useStateContext } from "@/components/HBOprovider"; // Uncomment if needed

// GenreNav component definition
const GenreNav = (props) => {
  // const globalState = useStateContext(); // Uncomment if needed
  const [activeNav, setActiveNav] = useState(false);

  // Delay activation of genre navigation to enhance user experience
  setTimeout(() => setActiveNav(true), 100);

  // JSX structure for GenreNav component
  return (
    <ul className={`genre-nav ${activeNav ? "genre-nav--active" : ""}`}>
      {/* Rendering GenreList component with genres data and media type */}
      <GenreList genresData={props.genresData} mediaType={props.mediaType} />
    </ul>
  );
};

// GenreList component definition
const GenreList = (props) => {
  // Mapping through genres data to create list items with links
  return props.genresData.map((item) => {
    return (
      <li key={item.id}>
        {/* Linking to the genre page based on media type and genre ID */}
        <Link legacyBehavior={true} href={`/${props.mediaType}/genre/${item.id}`}>
          <a>{item.name}</a>
        </Link>
      </li>
    );
  });
};

// Exporting the GenreNav component as the default export
export default GenreNav;

