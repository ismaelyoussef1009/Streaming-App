"use client";
import MusicSection from "@/components/pages/music/MusicSection";
import BreadCrumb from "@/components/shared/BreadCrum";
import { addSong } from "@/hooks/db";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";

interface Song {
  image: string;
  title: string;
  subTitle: string;
  song: string;
}

const Addsong = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [songFile, setSongFile] = useState<File | null>(null);
  const router = useRouter();

  // Convert file to data URL
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSongFile(e.target.files[0]);
    }
  };

  // Handle form submission and save song to IndexedDB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && subTitle && imageFile && songFile) {
      const imageReader = new FileReader();
      imageReader.onloadend = async () => {
        const imageDataUrl = imageReader.result as string;
        const songReader = new FileReader();
        songReader.onloadend = async () => {
          const songDataUrl = songReader.result as string;
          const newSong: Song = {
            image: imageDataUrl,
            title,
            subTitle,
            song: songDataUrl, // Store song as data URL in IndexedDB
          };
          console.log(newSong);

          // Save song to IndexedDB
          await addSong(newSong);

          // Redirect back to the main music page
          router.push("/mysong");
        };

        // Read the song file as data URL
        songReader.readAsDataURL(songFile);
      };

      // Read the image file as data URL
      imageReader.readAsDataURL(imageFile);
    }
  };

  return (
    <>
      <BreadCrumb page="Add Song" />
      <div className="container mt-4 row g-4">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="cover__form">
            <div className="mb-3 cover__grp">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter song title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 cover__grp">
              <label htmlFor="subTitle" className="form-label">
                Subtitle
              </label>
              <input
                type="text"
                id="subTitle"
                className="form-control"
                placeholder="Enter song subtitle"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 cover__grp">
              <label htmlFor="imageFile" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                id="imageFile"
                className="form-control"
                accept="image/*"
                onChange={handleImageFileChange}
              />
            </div>
            <div className="mb-3 cover__grp">
              <label htmlFor="songFile" className="form-label">
                Upload Song
              </label>
              <input
                type="file"
                id="songFile"
                className="form-control"
                accept="audio/*"
                onChange={handleSongFileChange}
              />
            </div>
            <button type="submit" className="cmn__simple2 my-4">
              Add Song
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addsong;
