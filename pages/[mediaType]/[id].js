import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from "@/components/layouts/MainLayout";
import FeaturedMedia from "@/components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "@/components/UI/MediaRow/MediaRow";
import CastInfo from "@/components/UI/CastInfo/CastInfo";
import AuthCheck from "@/components/AuthCheck";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Placeholder from "@/components/UI/PlaceHolder/PlaceHolder";

// Font subset configuration
const inter = Inter({ subsets: ["latin"] });

export default function SingleMediaPage(props) {
  const router = useRouter();
  const [mediaData, setMediaData] = useState(false);

  // Console log props for debugging
  console.log(props);

  return AuthCheck(
    <>
      {/* Main Layout component */}
      <MainLayout>
        {/* Featured Media section */}
        <FeaturedMedia
          title={
            props.query.mediaType === "movie"
              ? props.mediaData.title
              : props.mediaData.name
          }
          mediaUrl={`https://image.tmdb.org/t/p/w1280${props.mediaData.backdrop_path}`}
          type="single"
          location="In theaters and on HBO MAX. Streaming through May 23."
          linkUrl={`/${props.query.mediaType}/${props.query.id}`}
        />
        {/* Lazy-loaded Media Row section */}
        <LazyLoad
          offset={-400}
          placeholder={<Placeholder title="Movies" type="large-v" />}
        >
          <MediaRow
            title="More Like This"
            type="small-v"
            mediaType={props.query.mediaType}
            endpoint={`${props.query.mediaType === "movie" ? "movie" : "tv"}/${props.query.id}/similar?`}
            updateData={props.query.id}
          />
        </LazyLoad>
        {/* Cast Information section */}
        <CastInfo mediaId={props.query.id} mediaType={props.query.mediaType} />
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let mediaData;
  try {
    // Fetch media data using API
    mediaData = await axios.get(
      `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
    );
  } catch (error) {
    // Log error if there is an issue fetching data
    console.log(error);
  }
  return {
    props: { mediaData: mediaData.data, query: context.query },
  };
}
