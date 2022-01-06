import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState, playListState } from "../atoms/playlistAtom";
import spotifyApi from "../lib/spotify";
import Songs from "./Songs";
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
const Center = () => {
  const { data: session } = useSession();

  const [color, setColor] = useState(null);
  const playListId = useRecoilValue(playListIdState);

  const [playList, setPlayList] = useRecoilState(playListState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playListId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playListId)
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((err) => console.error("Something went wrong!", err));
  }, [spotifyApi, playListId]);
  return (
    <div className="  flex-grow h-screen overflow-y-scroll  scrollbar-hide ">
      <header className="absolute top-5 right-8">
        <div
          onClick={() => signOut()}
          className="flex items-center text-white bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 "
        >
          <img className="rounded-full w-10 h-10" src={session?.user.image} />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        {playList?.images?.[0]?.url && (
          <img
            className="h-44 w-44 shadow-2xl"
            src={playList?.images?.[0]?.url}
          />
        )}

        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playList?.name}
          </h1>
        </div>
      </section>

      <Songs />
    </div>
  );
};

export default Center;
