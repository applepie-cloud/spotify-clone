import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const prevSongRef = useRef<string | null> (null);

    const { currentSong, isPlaying, playNext } = usePlayerStore();

    useEffect(() => {
        if(isPlaying) audioRef.current?.play();
        else audioRef.current?.pause();
    },[isPlaying])

    useEffect(() => {
        const audio =  audioRef.current;
        
        const handleEnded = () => {
            playNext();
        }

        audio?.addEventListener('ended',handleEnded);

         return audio?.removeEventListener("ended",handleEnded);
    },[playNext])

    // handel song changes

    useEffect(() => {
        const audio = audioRef.current;

        const isSongChange = prevSongRef.current !== currentSong?.audioURL;

        if(isSongChange && audio && currentSong?.audioURL) {
            audio.src = currentSong.audioURL;
            audio.currentTime = 0;

            prevSongRef.current = currentSong.audioURL;
            if(isPlaying) audio.play();
        }

    },[currentSong, isPlaying])

  return (
        <audio ref={audioRef} />
  )
}

export default AudioPlayer