"use client"
import { topSongData } from "@/../public/data/topSongData";
import SelectBox from "@/components/shared/SelectBox";
import { IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import MoodsCard from "../home/MoodsCard";
import { useEffect, useState } from "react";
import { getSongs } from "@/hooks/db";

interface Song {
  id?: number;
  image: string;
  title: string;
  subTitle: string;
  song: string;
}

const MyMusics = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  const artists = [
    { label: "Tom Cook" },
    { label: "Tanya Fox" },
    { label: "Hellen Schmidt" },
  ];

  const genres = [
    { label: "All Artists" },
    { label: "New Artists" },
    { label: "Expert Artists" },
  ];
  useEffect(() => {
    const fetchSongs = async () => {
      const storedSongs = await getSongs();
      setSongs(storedSongs);
    };
    fetchSongs();
  }, []);
  console.log(songs);
  
  return (
    <section className="trending__section hotsong__section pr-24 pl-24 pb-100">
      <div className="trending__selected mb-30 d-flex align-items-center justify-content-lg-between justify-content-center">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
              aria-label="home-tab"
            >
              Songs List
            </button>
          </li>
         
        </ul>
      </div>
      <div className="container-fluid">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-4">
              {songs && songs.map(({ id, ...props }) => (
                <div
                  key={id}
                  className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-md-4 col-sm-4"
                >
                  <MoodsCard key={id} {...props} link="album-allsong" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="text-center mt-60">
        <Link href="workout-allsong" className="cmn__simple2">
          Load More
        </Link>
      </div> */}
    </section>
  );
};

export default MyMusics;
