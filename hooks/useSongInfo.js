import { useEffect, useState } from "react"
import { useSpotify } from "./useSpotify"
import { useRecoilState } from "recoil"

export const useSongInfo = () => {
    const spotifyAPI = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {

            }
        }
    }, [currentTrackId, spotifyAPI])

    return songInfo
}