import MusicSection from "@/components/pages/music/MusicSection";
import MyMusics from "@/components/pages/mysong/MyMusics";
import BreadCrumb from "@/components/shared/BreadCrum";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music - Streamio Multipurpose Audio Podcast & Music Nextjs Template",
  description: "Streamio Multipurpose Audio Podcast & Music Nextjs Template",
};

const mysong = () => {
  return (
    <>
      <BreadCrumb page="My Songs" />
      <MyMusics />
    </>
  );
};

export default mysong;
