import { useEffect } from "react"
import { useSession, signIn } from "next-auth/react"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export const useSpotify = () => {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            // if refresh access token attempt fails, redirect user to login
            if (session.error === 'RefreshAccessTokenError') {
                signIn();
            }

            spotifyAPI.setAccessToken(session.user.accessToken)
        }
    }, [session])

    return spotifyAPI;

}