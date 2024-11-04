"use client"
import MusicSection from "@/components/pages/music/MusicSection";
import BreadCrumb from "@/components/shared/BreadCrum";
import { addSong } from "@/hooks/db";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

// export const metadata: Metadata = {
//   title: "Music - Streamio Multipurpose Audio Podcast & Music Nextjs Template",
//   description: "Streamio Multipurpose Audio Podcast & Music Nextjs Template",
// };

interface Song {
  image: string;
  title: string;
  subTitle: string;
  song: string;
}

const Addsong = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [image, setImage] = useState('');
  const [songFile, setSongFile] = useState<File | null>(null);
  const router = useRouter();

  // Convert file to data URL
  const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSongFile(e.target.files[0]);
    }
  };

  // Handle form submission and save song to IndexedDB
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title && subTitle && image && songFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const songDataUrl = fileReader.result as string;
        const newSong: Song = {
          image,
          title,
          subTitle,
          song: songDataUrl, // Store song as data URL in IndexedDB
        };
        console.log(newSong);
        
        // Save song to IndexedDB
        await addSong(newSong);

        // Redirect back to the main music page
        router.push('/mysong');
      };

      // Read the song file as data URL
      fileReader.readAsDataURL(songFile);
    }
  };
  return (
    <>
      <BreadCrumb page="Add Song" />
      <div className="container mt-4 row g-4">
      <div className="col-lg-6">
        <form onSubmit={handleSubmit} className="cover__form">
          <div className="mb-3 cover__grp">
            <label htmlFor="title" className="form-label">Title</label>
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
            <label htmlFor="subTitle" className="form-label">Subtitle</label>
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
            <label htmlFor="image" className="form-label">Image URL</label>
            <input
              type="text"
              id="image"
              className="form-control"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="mb-3 cover__grp">
            <label htmlFor="song" className="form-label">Upload song</label>
            <input
            type="file"
            id="songFile"
            className="form-control"
            accept="audio/*"
            onChange={handleSongFileChange}
          />
          </div>
          <button type="submit" className="cmn__simple2 my-4">Add Song</button>
        </form>
      </div>
    </div>
          </>
  );
};

export default Addsong;
