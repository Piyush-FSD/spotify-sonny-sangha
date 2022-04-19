import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify";
import { spotifyAPI, LOGIN_URL } from "../../../lib/spotify";

const refreshAccesToken = async (token) => {
    try {
        spotifyAPI.setAccessToken(token.accessToken)
        spotifyAPI.setRefreshToken(token.refreshToken)

        const { body: refreshedToken } = await spotifyAPI.refreshAccessToken()

        console.log(refreshedToken)

        return {
            ...token,
            accessTokenExpires: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 3000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        };

    } catch (error) {
        console.error(error);

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_ID,
            authorization: LOGIN_URL
        })
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, account, user }) {
            //inital sign in
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000,
                };
            }

            // Returns preious token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log('STILL VALID TOKEN')
                return token;
            }

            // Access token has expired, we need to refresh it
            console.log('EXPIRED! REFRESH NEEDED')
            return await refreshAccesToken(token);
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session;
        }
    }
});


