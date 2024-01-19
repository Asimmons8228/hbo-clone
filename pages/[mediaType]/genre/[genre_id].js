import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { Inter } from "next/font/google";
import { useStateContext } from "@/components/HBOprovider";
import Login from "@/components/UI/Login/Login";
import { useRouter } from "next/router";
import MainLayout from "@/components/layouts/MainLayout";
import FeaturedMedia from "@/components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "@/components/AuthCheck";
import MediaRow from "@/components/UI/MediaRow/MediaRow";
import LazyLoad from "react-lazyload";
import Placeholder from "@/components/UI/PlaceHolder/PlaceHolder";
import GenreNav from "@/components/UI/GenreNav/GenreNav";
import { shuffleArray } from "@/components/utilities";
import axios from "axios";
// import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();
  
  const showRandomMedia = () => {
    let thumbType;
    return props.genresData.map((item, index) => {
      thumbType = shuffleArray(globalState.thumbTypes)[0]
      return (
        <div key={item.id}>
         <LazyLoad
          offset={-200}
          placeholder={<Placeholder title={item.name} type={thumbType} />}
        >
          <MediaRow
            title={item.name}
            type={thumbType}
            mediaType={props.query.mediaType}
            endpoint={`discover/${props.query.mediaType}?with_genres=${props.query.genre_id}&sort_by=popularity.desc&primary_release_year=2023&page=${index + 1}`}
            updateData={props.query.genre_id}
          />
        </LazyLoad>
        </div>
      )
    })
  }

  return AuthCheck(
    <>
      <MainLayout>
        <FeaturedMedia
          mediaUrl={`https://image.tmdb.org/t/p/w1280${props.featuredData.backdrop_path}`}
          title={props.query.mediaType ==='movie' ? props.featuredData.title : props.featuredData.name}
          type="single"
          location="In theaters and on HBO MAX. Streaming through May 23."
          linkUrl={`/${props.query.mediaType}/${props.featuredData.id}`}
        />
        <GenreNav mediaType={props.query.mediaType} genresData={props.genresData} />
        {showRandomMedia()}
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let genresData;
  let featuredData;
  try {
    genresData = await axios.get(
      `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
    );
    featuredData = await axios.get(
      `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2023&with_genres=${context.query.genre_id}&api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
    );
    console.log("genresData");
    console.log(genresData.data);
  } catch (error) {
    console.log("error");
    console.log(error);
  }
  console.log(genresData);
  return {
    props: {
      genresData: genresData.data.genres,
      featuredData: shuffleArray(featuredData.data.results)[0],
      query: context.query,
    },
  };
}
