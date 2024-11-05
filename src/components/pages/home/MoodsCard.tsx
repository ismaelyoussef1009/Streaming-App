"use client";
import image6 from "@/../public/img/hotsong/t6.jpg";

import usePlayButtonClick from "@/hooks/usePlayButtonClick";
import { RootState } from "@/redux/store";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import PlayButton from "./PlayButton";

type Props = {
  image: StaticImageData;
  title: string;
  subTitle: string;
  song: string;
  link?: string;
};
const MoodsCard = ({ image, title, subTitle, song, link }: Props) => {
  const { handlePlayButtonClick } = usePlayButtonClick();

  const audioTrack = useSelector((state: RootState) => state.track);

  const audio = audioTrack?.url;
  const isPlaying = audioTrack?.isPlaying;
  return (
    <div className="moods__item play-button-container">
      <div className="thumb mb-16 ralt transition overhid">
        <Image
          width={200}
          height={200}
          src={image || image6}
          className="w-100 round50 transition overhid h-auto"
          alt="img"
        />
        <PlayButton
          audioTrack={audio === song}
          isPlaying={isPlaying}
          onClick={() => handlePlayButtonClick(song)}
        />
      </div>
      <div className="content">
        <h5 className="mb-2">
          <Link href={link} className="white">
            {title}
          </Link>
        </h5>
        <span className="pra fs-14 bodyfont d-block">{subTitle}</span>
      </div>
    </div>
  );
};

export default MoodsCard;
