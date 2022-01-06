import React from "react";
import { useRecoilValue } from "recoil";
import { playListState } from "../atoms/playlistAtom";
import Song from "./Song";

const Songs = () => {
  const playList = useRecoilValue(playListState);
  return (
    <div className=" px-8 flex flex-col space-y-1 text-white">
      {playList?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
