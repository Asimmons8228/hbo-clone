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
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Placeholder from "@/components/UI/PlaceHolder/PlaceHolder";
import { getServerSideProps } from "next/dist/build/templates/pages";

const inter = Inter({ subsets: ["latin"] });

export default function SingleMediaPage(props) {
  const router = useRouter();
  const [mediaData, setMediaData] = useState(false);

  console.log(props);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
  //     )
  //     .then(function (response) {
  //       setMediaData(response.data);
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     });
  // }, [mediaData]);

  return AuthCheck(
    <>
      <MainLayout>
        <FeaturedMedia
          title={props.query.mediaType ==='movie' ? props.mediaData.title : props.mediaData.name}
          mediaUrl={`https://image.tmdb.org/t/p/w1280${props.mediaData.backdrop_path}`}
          type="single"
          location="In theaters and on HBO MAX. Streaming through May 23."
          linkUrl={`/${props.query.mediaType}/${props.query.id}`}
        />
          <MediaRow
            title="More Like This"
            type="small-v"
            mediaType={props.query.mediaType}
            endpoint={`${props.query.mediaType === 'movie' ? 'movie' : 'tv'}/${props.query.id}/similar?`}
            updateData={props.query.id}
          />
        <CastInfo mediaId={props.query.id} mediaType={props.query.mediaType} />
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  let mediaData;
  try {
    mediaData = await axios.get(
      `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=6d1dcfd285874d37cf4305319bf0609e&language=en`
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: { mediaData: mediaData.data, query: context.query },
  };
}
