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
import Placeholder from "@/components/UI/PlaceHolder/PlaceHolder";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  const globalState = useStateContext();
  const router = useRouter();
  useEffect(() => {}, []);

  return AuthCheck(
    <>
      <MainLayout>
        <FeaturedMedia
          mediaUrl="https://www.youtube.com/embed/UGc5Tzz19UY?&autoplay=1&loop=1&start=16"
          title="Aquaman and the Lost Kingdom"
          type="front"
          location="In theaters and on HBO MAX. Streaming through May 23."
          linkUrl="/movie/572802"
        />
          <MediaRow
            title="Movies"
            type="large-v"
            mediaType='movie'
            endpoint="discover/movie?sort_by=popularity.desc&primary_release_year=2023"
          />
          <MediaRow
            title="Series"
            type="small-h"
            mediaType="series"
            endpoint="discover/tv?sort_by=popularity.desc"
          />
          <MediaRow
            title="Action"
            type="small-v"
            mediaType='movie'
            endpoint="discover/movie?with_genres=28&primary_release_year=2023"
          />
          <MediaRow
            title="Horror"
            type="large-h"
            mediaType='movie'
            endpoint="discover/movie?with_genres=27&primary_release_year=2023"
          />
          <MediaRow
            title="SciFi"
            type="small-v"
            mediaType='movie'
            endpoint="discover/movie?with_genres=878&primary_release_year=2023"
          />
          <MediaRow
            title="Animations"
            type="small-v"
            mediaType='movie'
            endpoint="discover/movie?with_genres=16&primary_release_year=2023"
          />
      </MainLayout>
    </>
  );
}
