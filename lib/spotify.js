import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
    "user-read-private",
    "user-library-read",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read"
].join(',');

const params = { scopes: scopes };

const queryParamString = new URLSearchParams(params);

export const LOGIN_URL = "htts://accounts.spotify.com/authorize?" + queryParamString.toString();

export const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_ID,
});