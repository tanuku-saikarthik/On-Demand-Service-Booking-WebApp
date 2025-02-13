import NextAuth from "next-auth";

export const authOptions = {
    providers: [
        {
            id: "descope",
            name: "Descope",
            type: "oauth",
            wellKnown: `https://api.descope.com/${process.env.DESCOPE_API}/.well-known/openid-configuration`,
            authorization: { params: { scope: "openid email profile" } },
            idToken: true,
            clientId: process.env.DESCOPE_CLIENT_ID,
            clientSecret: process.env.DESCOPE_CLIENT_SECRET, // Use env variable instead of hardcoded secret
            checks: ["pkce", "state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                };
            },
        },
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
